#!/usr/bin/env node
/**
 * Slow Wave - Shopify store setup.
 *
 * Builds the store from ../products/catalog.json and ../content/pages.json:
 * products with pricing and cost, collections, and content pages.
 *
 * Usage:
 *   node setup.mjs --dry-run    preview every call, change nothing
 *   node setup.mjs              apply to the live store
 *   node setup.mjs --draft      create products as DRAFT instead of ACTIVE
 *
 * Safe to re-run: anything that already exists by handle is skipped.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createClient, ShopifyError } from './lib/shopify.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');
const AS_DRAFT = process.argv.includes('--draft');

const catalog = JSON.parse(readFileSync(join(__dirname, '../products/catalog.json'), 'utf8'));
const pages = JSON.parse(readFileSync(join(__dirname, '../content/pages.json'), 'utf8'));

// ---------------------------------------------------------------- logging

const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

const log = {
  step: (s) => console.log(`\n${c.bold(s)}`),
  ok: (s) => console.log(`  ${c.green('✓')} ${s}`),
  skip: (s) => console.log(`  ${c.dim('·')} ${c.dim(s)}`),
  warn: (s) => console.log(`  ${c.yellow('!')} ${s}`),
  fail: (s) => console.log(`  ${c.red('✗')} ${s}`),
  plan: (s) => console.log(`  ${c.yellow('→')} ${s}`),
};

// ---------------------------------------------------------------- queries

const Q_SHOP = `{ shop { name myshopifyDomain currencyCode ianaTimezone } }`;

const Q_PRODUCT_BY_HANDLE = `
  query($q: String!) {
    products(first: 1, query: $q) { nodes { id handle title } }
  }`;

const M_PRODUCT_CREATE = `
  mutation($product: ProductCreateInput!) {
    productCreate(product: $product) {
      product { id handle title variants(first: 1) { nodes { id inventoryItem { id } } } }
      userErrors { field message }
    }
  }`;

const M_VARIANTS_UPDATE = `
  mutation($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkUpdate(productId: $productId, variants: $variants) {
      productVariants { id sku price }
      userErrors { field message }
    }
  }`;

const Q_PUBLICATIONS = `{ publications(first: 20) { nodes { id name } } }`;

const M_PUBLISH = `
  mutation($id: ID!, $input: [PublicationInput!]!) {
    publishablePublish(id: $id, input: $input) {
      publishable { availablePublicationsCount { count } }
      userErrors { field message }
    }
  }`;

const Q_COLLECTION_BY_HANDLE = `
  query($q: String!) {
    collections(first: 1, query: $q) { nodes { id handle title } }
  }`;

const M_COLLECTION_CREATE = `
  mutation($input: CollectionInput!) {
    collectionCreate(input: $input) {
      collection { id handle title }
      userErrors { field message }
    }
  }`;

const Q_PAGES = `
  query($q: String!) { pages(first: 1, query: $q) { nodes { id handle title } } }`;

const M_PAGE_CREATE = `
  mutation($page: PageCreateInput!) {
    pageCreate(page: $page) {
      page { id handle title }
      userErrors { field message }
    }
  }`;

const Q_LOCATION = `{ locations(first: 1) { nodes { id name } } }`;

const M_INVENTORY_SET = `
  mutation($input: InventorySetQuantitiesInput!) {
    inventorySetQuantities(input: $input) {
      userErrors { field message }
    }
  }`;

// ---------------------------------------------------------------- helpers

/** Shopify handles are matched exactly; quote to avoid tokenised partial matches. */
const handleQuery = (handle) => `handle:'${handle}'`;

function variantInput(p, variantId) {
  const inventoryItem = {
    tracked: p.requires_shipping !== false,
    requiresShipping: p.requires_shipping !== false,
  };

  if (p.sku) inventoryItem.sku = p.sku;
  if (p.cost != null) inventoryItem.cost = String(p.cost);
  if (p.weight_grams) {
    inventoryItem.measurement = {
      weight: { value: p.weight_grams, unit: 'GRAMS' },
    };
  }

  const input = { id: variantId, price: String(p.price), inventoryItem };
  if (p.compare_at_price) input.compareAtPrice = String(p.compare_at_price);
  return input;
}

// ---------------------------------------------------------------- steps

async function connect() {
  log.step('Connecting');

  const client = createClient({
    shop: process.env.SHOPIFY_STORE_DOMAIN,
    token: process.env.SHOPIFY_ADMIN_TOKEN,
  });

  const { shop } = await client.gql(Q_SHOP);
  log.ok(`${c.bold(shop.name)} (${shop.myshopifyDomain})`);
  log.ok(`Currency ${shop.currencyCode} · ${shop.ianaTimezone} · API ${client.apiVersion}`);

  if (shop.currencyCode !== catalog._meta.currency) {
    log.warn(
      `Store currency is ${shop.currencyCode} but the catalog is priced in ` +
      `${catalog._meta.currency}. Prices will be created as-is - check them before selling.`
    );
  }

  return client;
}

async function getOnlineStorePublicationId(client) {
  try {
    const { publications } = await client.gql(Q_PUBLICATIONS);
    const online = publications.nodes.find((n) => /online store/i.test(n.name));
    if (!online) log.warn('No "Online Store" sales channel found - products will not be visible.');
    return online?.id ?? null;
  } catch (err) {
    log.warn(`Could not read publications (${err.message}). Publish products manually in admin.`);
    return null;
  }
}

async function createProducts(client, publicationId, locationId) {
  log.step(`Products (${catalog.products.length})`);
  const created = {};

  for (const p of catalog.products) {
    const existing = await client.gql(Q_PRODUCT_BY_HANDLE, { q: handleQuery(p.handle) });
    const hit = existing.products.nodes.find((n) => n.handle === p.handle);

    if (hit) {
      created[p.handle] = hit.id;
      log.skip(`${p.title} - already exists`);
      continue;
    }

    if (DRY_RUN) {
      log.plan(`create "${p.title}" @ ${p.price} (sku ${p.sku})`);
      created[p.handle] = `gid://dry-run/Product/${p.handle}`;
      continue;
    }

    const res = await client.mutate(M_PRODUCT_CREATE, {
      product: {
        title: p.title,
        handle: p.handle,
        descriptionHtml: p.body_html,
        productType: p.product_type,
        vendor: p.vendor,
        tags: p.tags,
        status: AS_DRAFT ? 'DRAFT' : 'ACTIVE',
      },
    }, 'productCreate');

    const product = res.product;
    const variant = product.variants.nodes[0];
    created[p.handle] = product.id;

    // Price, SKU, cost and weight live on the variant, not the product.
    await client.mutate(M_VARIANTS_UPDATE, {
      productId: product.id,
      variants: [variantInput(p, variant.id)],
    }, 'productVariantsBulkUpdate');

    if (publicationId) {
      await client.mutate(M_PUBLISH, {
        id: product.id,
        input: [{ publicationId }],
      }, 'publishablePublish');
    }

    // Stock levels are optional - a missing inventory scope shouldn't abort the run.
    if (locationId && p.inventory_quantity && p.requires_shipping !== false) {
      try {
        await client.mutate(M_INVENTORY_SET, {
          input: {
            name: 'available',
            reason: 'correction',
            ignoreCompareQuantity: true,
            quantities: [{
              inventoryItemId: variant.inventoryItem.id,
              locationId,
              quantity: p.inventory_quantity,
            }],
          },
        }, 'inventorySetQuantities');
      } catch (err) {
        log.warn(`${p.title}: stock not set (${err.message})`);
      }
    }

    const qty = p.inventory_quantity ? ` · ${p.inventory_quantity} in stock` : '';
    log.ok(`${p.title} - ${catalog._meta.currency} ${p.price}${qty}`);
  }

  return created;
}

async function createCollections(client, productIds, publicationId) {
  log.step(`Collections (${catalog.collections.length})`);

  // "Everything" holds the full catalogue; the curated ones are filled by hand.
  const membership = {
    all: catalog.products.map((p) => p.handle),
    'start-here': ['the-ritual', 'slow-wave-protocol'],
    instant: ['slow-wave-protocol'],
  };

  for (const col of catalog.collections) {
    const existing = await client.gql(Q_COLLECTION_BY_HANDLE, { q: handleQuery(col.handle) });
    if (existing.collections.nodes.some((n) => n.handle === col.handle)) {
      log.skip(`${col.title} - already exists`);
      continue;
    }

    const members = (membership[col.handle] ?? [])
      .map((h) => productIds[h])
      .filter(Boolean);

    if (DRY_RUN) {
      log.plan(`create collection "${col.title}" with ${members.length} products`);
      continue;
    }

    const res = await client.mutate(M_COLLECTION_CREATE, {
      input: {
        title: col.title,
        handle: col.handle,
        descriptionHtml: col.body_html,
        products: members,
      },
    }, 'collectionCreate');

    if (publicationId) {
      await client.mutate(M_PUBLISH, {
        id: res.collection.id,
        input: [{ publicationId }],
      }, 'publishablePublish');
    }

    log.ok(`${col.title} - ${members.length} products`);
  }
}

async function createPages(client) {
  log.step(`Pages (${pages.pages.length})`);

  for (const pg of pages.pages) {
    const existing = await client.gql(Q_PAGES, { q: handleQuery(pg.handle) });
    if (existing.pages.nodes.some((n) => n.handle === pg.handle)) {
      log.skip(`${pg.title} - already exists`);
      continue;
    }

    if (DRY_RUN) {
      log.plan(`create page "${pg.title}" (/pages/${pg.handle})`);
      continue;
    }

    await client.mutate(M_PAGE_CREATE, {
      page: {
        title: pg.title,
        handle: pg.handle,
        body: pg.body_html,
        isPublished: true,
      },
    }, 'pageCreate');

    log.ok(`${pg.title} → /pages/${pg.handle}`);
  }
}

// ---------------------------------------------------------------- main

async function main() {
  console.log(c.bold('\nSlow Wave — Shopify setup'));
  if (DRY_RUN) console.log(c.yellow('DRY RUN — nothing will be created.'));
  if (AS_DRAFT) console.log(c.yellow('Products will be created as DRAFT.'));

  const client = await connect();
  const publicationId = await getOnlineStorePublicationId(client);

  let locationId = null;
  try {
    const { locations } = await client.gql(Q_LOCATION);
    locationId = locations.nodes[0]?.id ?? null;
  } catch {
    log.warn('Could not read locations - stock levels will need setting in admin.');
  }

  const productIds = await createProducts(client, publicationId, locationId);
  await createCollections(client, productIds, publicationId);
  await createPages(client);

  log.step('Done');
  if (DRY_RUN) {
    console.log('  Re-run without --dry-run to apply.\n');
  } else {
    console.log(`  Store: https://${client.domain}/admin`);
    console.log(c.dim('  Next: set the navigation menu and theme (see ../README.md).\n'));
  }
}

main().catch((err) => {
  console.error(`\n${c.red('Setup failed:')} ${err.message}`);
  if (err instanceof ShopifyError && err.userErrors?.length) {
    for (const e of err.userErrors) {
      console.error(`  - ${(e.field || []).join('.')}: ${e.message}`);
    }
  }
  console.error(c.dim('\nNothing was rolled back. Re-running skips whatever already exists.\n'));
  process.exit(1);
});

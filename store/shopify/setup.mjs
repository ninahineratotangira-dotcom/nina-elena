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

const M_VARIANTS_CREATE = `
  mutation($productId: ID!, $variants: [ProductVariantsBulkInput!]!, $strategy: ProductVariantsBulkCreateStrategy) {
    productVariantsBulkCreate(productId: $productId, variants: $variants, strategy: $strategy) {
      productVariants { id sku price selectedOptions { name value } }
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

/**
 * Builds the inventoryItem payload shared by both the single- and
 * multi-variant paths. `spec` is either the product itself (single variant)
 * or one entry from its `variants` array.
 */
function inventoryItemInput(product, spec) {
  const physical = product.requires_shipping !== false;

  const item = { tracked: physical, requiresShipping: physical };

  if (spec.sku) item.sku = spec.sku;
  if (spec.cost != null) item.cost = String(spec.cost);
  if (spec.weight_grams) {
    item.measurement = { weight: { value: spec.weight_grams, unit: 'GRAMS' } };
  }

  return item;
}

/**
 * Pre-order and digital products must stay purchasable at zero stock,
 * so they oversell deliberately. Everything else stops at zero.
 */
function inventoryPolicy(product) {
  return product.preorder || product.inventory_policy === 'continue'
    ? 'CONTINUE'
    : 'DENY';
}

/** Update payload for a product's single auto-created variant. */
function singleVariantInput(p, variantId) {
  const input = {
    id: variantId,
    price: String(p.price),
    inventoryItem: inventoryItemInput(p, p),
    inventoryPolicy: inventoryPolicy(p),
  };
  if (p.compare_at_price) input.compareAtPrice = String(p.compare_at_price);
  return input;
}

/** Create payload for one entry of a multi-variant product. */
function bulkVariantInput(p, spec, locationId) {
  const input = {
    optionValues: Object.entries(spec.option_values).map(([optionName, name]) => ({
      optionName,
      name,
    })),
    price: String(spec.price),
    inventoryItem: inventoryItemInput(p, spec),
    inventoryPolicy: inventoryPolicy(p),
  };

  if (spec.compare_at_price) input.compareAtPrice = String(spec.compare_at_price);

  // Quantities can only be set where we know the location. Zero is meaningful
  // here - pre-order variants are deliberately created empty.
  if (locationId && spec.inventory_quantity != null && p.requires_shipping !== false) {
    input.inventoryQuantities = [
      { availableQuantity: spec.inventory_quantity, locationId },
    ];
  }

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

    const multiVariant = Array.isArray(p.variants) && p.variants.length > 0;

    if (DRY_RUN) {
      if (multiVariant) {
        const range = p.variants.map((v) => v.price);
        log.plan(
          `create "${p.title}" with ${p.variants.length} variants ` +
          `(${Math.min(...range)}–${Math.max(...range)})`
        );
        for (const v of p.variants) {
          console.log(`      ${Object.values(v.option_values).join('/')} · ${v.price} · ${v.sku}`);
        }
      } else {
        log.plan(`create "${p.title}" @ ${p.price} (sku ${p.sku})`);
      }
      if (p.preorder) console.log(`      ${c.dim('pre-order: sells at zero stock')}`);
      created[p.handle] = `gid://dry-run/Product/${p.handle}`;
      continue;
    }

    const productInput = {
      title: p.title,
      handle: p.handle,
      descriptionHtml: p.body_html,
      productType: p.product_type,
      vendor: p.vendor,
      tags: p.tags,
      status: AS_DRAFT ? 'DRAFT' : 'ACTIVE',
    };

    // Declaring options up front lets us attach real variants afterwards.
    if (multiVariant) {
      productInput.productOptions = p.options.map((o) => ({
        name: o.name,
        values: o.values.map((v) => ({ name: v })),
      }));
    }

    const res = await client.mutate(M_PRODUCT_CREATE, { product: productInput }, 'productCreate');
    const product = res.product;
    created[p.handle] = product.id;

    if (multiVariant) {
      // REMOVE_STANDALONE_VARIANT drops the placeholder variant Shopify
      // creates automatically, leaving only the real set.
      await client.mutate(M_VARIANTS_CREATE, {
        productId: product.id,
        variants: p.variants.map((v) => bulkVariantInput(p, v, locationId)),
        strategy: 'REMOVE_STANDALONE_VARIANT',
      }, 'productVariantsBulkCreate');
    } else {
      const variant = product.variants.nodes[0];

      await client.mutate(M_VARIANTS_UPDATE, {
        productId: product.id,
        variants: [singleVariantInput(p, variant.id)],
      }, 'productVariantsBulkUpdate');

      // Stock is optional - a missing inventory scope shouldn't abort the run.
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
    }

    if (publicationId) {
      await client.mutate(M_PUBLISH, {
        id: product.id,
        input: [{ publicationId }],
      }, 'publishablePublish');
    }

    const detail = multiVariant
      ? `${p.variants.length} sizes, from ${catalog._meta.currency} ${Math.min(...p.variants.map((v) => Number(v.price)))}`
      : `${catalog._meta.currency} ${p.price}`;
    log.ok(`${p.title} - ${detail}${p.preorder ? c.dim(' · pre-order') : ''}`);
  }

  return created;
}

async function createCollections(client, productIds, publicationId) {
  log.step(`Collections (${catalog.collections.length})`);

  // "Everything" holds the full catalogue; the curated ones are filled by hand.
  const membership = {
    all: catalog.products.map((p) => p.handle),
    'the-bed': ['the-safe-space', 'the-duvet', 'the-pillow'],
    'in-stock': ['silk-sleep-mask', 'slow-wave-protocol'],
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

/**
 * Minimal Shopify Admin GraphQL client.
 *
 * Uses the GraphQL Admin API rather than REST: Shopify deprecated the REST
 * product/variant endpoints, so new integrations must go through GraphQL.
 *
 * Zero dependencies - relies on Node 18+ native fetch.
 */

const API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-01';

export class ShopifyError extends Error {
  constructor(message, { query, variables, userErrors } = {}) {
    super(message);
    this.name = 'ShopifyError';
    this.query = query;
    this.variables = variables;
    this.userErrors = userErrors;
  }
}

export function createClient({ shop, token }) {
  if (!shop) throw new Error('Missing SHOPIFY_STORE_DOMAIN');
  if (!token) throw new Error('Missing SHOPIFY_ADMIN_TOKEN');

  // Accept "my-store", "my-store.myshopify.com", or a full URL.
  const domain = shop
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .replace(/\.myshopify\.com$/, '') + '.myshopify.com';

  const endpoint = `https://${domain}/admin/api/${API_VERSION}/graphql.json`;

  async function gql(query, variables = {}, { retries = 3 } = {}) {
    let lastError;

    for (let attempt = 0; attempt <= retries; attempt++) {
      if (attempt > 0) {
        // Exponential backoff: 1s, 2s, 4s. Shopify throttles aggressively.
        await new Promise((r) => setTimeout(r, 2 ** (attempt - 1) * 1000));
      }

      let res;
      try {
        res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': token,
          },
          body: JSON.stringify({ query, variables }),
        });
      } catch (err) {
        lastError = new ShopifyError(`Network error: ${err.message}`, { query, variables });
        continue;
      }

      if (res.status === 401 || res.status === 403) {
        throw new ShopifyError(
          `Auth failed (HTTP ${res.status}). Check SHOPIFY_ADMIN_TOKEN and that the ` +
          `custom app has the required scopes: write_products, write_publications, write_content.`,
          { query }
        );
      }

      if (res.status === 404) {
        throw new ShopifyError(
          `Store not found at ${domain}. Check SHOPIFY_STORE_DOMAIN.`,
          { query }
        );
      }

      if (res.status === 429 || res.status >= 500) {
        lastError = new ShopifyError(`HTTP ${res.status} from Shopify`, { query, variables });
        continue; // retriable
      }

      const body = await res.json();

      if (body.errors?.length) {
        // GraphQL-level throttling is retriable; schema errors are not.
        const throttled = body.errors.some((e) => e.extensions?.code === 'THROTTLED');
        const err = new ShopifyError(
          body.errors.map((e) => e.message).join('; '),
          { query, variables }
        );
        if (throttled) { lastError = err; continue; }
        throw err;
      }

      return body.data;
    }

    throw lastError ?? new ShopifyError('Request failed after retries', { query });
  }

  /**
   * Runs a mutation and throws if Shopify returns userErrors.
   * `path` is the mutation's field name, e.g. 'productCreate'.
   */
  async function mutate(query, variables, path) {
    const data = await gql(query, variables);
    const result = data?.[path];
    const userErrors = result?.userErrors ?? [];

    if (userErrors.length) {
      throw new ShopifyError(
        `${path} failed: ` +
        userErrors.map((e) => `${(e.field || []).join('.')}: ${e.message}`).join(' | '),
        { query, variables, userErrors }
      );
    }

    return result;
  }

  return { gql, mutate, domain, endpoint, apiVersion: API_VERSION };
}

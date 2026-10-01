// One-shot seeding script. Reads credentials from the environment so they
// never appear in source or in a tracked file.
//
//   ALGOLIA_APP_ID=... ALGOLIA_ADMIN_KEY=... node scripts/seed-algolia.mjs
//
// Run from the repo root. Safe to re-run: it clears the index first, so
// records removed from the source data do not linger.

import { readFileSync } from "node:fs";

const APP_ID = process.env.ALGOLIA_APP_ID;
const ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;
const INDEX_NAME = process.env.ALGOLIA_INDEX || "products";

if (!APP_ID || !ADMIN_KEY) {
  console.error("Set ALGOLIA_APP_ID and ALGOLIA_ADMIN_KEY before running.");
  process.exit(1);
}

const products = JSON.parse(
  readFileSync("src/services/firebase/firebase.json", "utf8"),
).products;

const records = Object.entries(products).map(([key, p]) => ({
  objectID: String(p.id ?? key),
  id: p.id ?? key,
  title: p.title,
  description: p.description,
  category: p.category,
  price: p.price,
  discountPercentage: p.discountPercentage,
  rating: p.rating,
  stock: p.stock,
  brand: p.brand,
  tags: p.tags,
  sku: p.sku,
  images: p.images,
  thumbnail: p.thumbnail,
}));

const headers = {
  "x-algolia-api-key": ADMIN_KEY,
  "x-algolia-application-id": APP_ID,
  "content-type": "application/json",
};

const call = async (path, options = {}) => {
  const res = await fetch(`https://${APP_ID}.algolia.net/1${path}`, {
    ...options,
    headers,
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`${path} -> HTTP ${res.status} ${body}`);
  return body ? JSON.parse(body) : {};
};

console.log(`seeding ${records.length} records into "${INDEX_NAME}"`);

await call(`/indexes/${INDEX_NAME}/clear`, { method: "POST" });
await call(`/indexes/${INDEX_NAME}/settings`, {
  method: "PUT",
  body: JSON.stringify({
    searchableAttributes: ["title", "brand", "category", "tags", "description"],
    attributesForFaceting: ["category", "brand", "tags"],
    customRanking: ["desc(rating)", "asc(price)"],
    attributesToHighlight: ["title", "description"],
  }),
});

const CHUNK = 500;
for (let i = 0; i < records.length; i += CHUNK) {
  const batch = records.slice(i, i + CHUNK);
  await call(`/indexes/${INDEX_NAME}/batch`, {
    method: "POST",
    body: JSON.stringify({ requests: batch.map((r) => ({ action: "updateObject", body: r })) }),
  });
  console.log(`  ${Math.min(i + CHUNK, records.length)}/${records.length}`);
}

// Algolia needs a moment before the index is queryable.
await new Promise((r) => setTimeout(r, 2000));

const check = await fetch(
  `https://${APP_ID}-dsn.algolia.net/1/indexes/${INDEX_NAME}/query`,
  {
    method: "POST",
    headers,
    body: JSON.stringify({ query: "", hitsPerPage: 1 }),
  },
);
const parsed = await check.json();
console.log(`done. searchable records: ${parsed.nbHits ?? "?"}`);
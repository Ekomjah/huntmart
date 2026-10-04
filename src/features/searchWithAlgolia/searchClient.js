import { liteClient as algoliasearch } from "algoliasearch/lite";

export const INDEX_NAME = "products";

const APP_ID = import.meta.env.VITE_ALGOLIA_APP_ID;
const SEARCH_KEY = import.meta.env.VITE_ALGOLIA_SEARCH_KEY;

let searchClient = null;

/**
 * `liteClient` throws when appId or apiKey is not a non-empty string. Building
 * the client at module scope used to turn a missing Vite env var into a throw
 * during `main.jsx`'s import graph, which white-screened every route because
 * the search page was statically imported by the route table. The client is now
 * built lazily and returns `null` instead, so the failure is confined to the
 * search route and rendered as a readable message.
 */
export function getSearchClient() {
  if (typeof APP_ID !== "string" || APP_ID.trim() === "") return null;
  if (typeof SEARCH_KEY !== "string" || SEARCH_KEY.trim() === "") return null;

  if (!searchClient) {
    searchClient = algoliasearch(APP_ID.trim(), SEARCH_KEY.trim());
  }

  return searchClient;
}

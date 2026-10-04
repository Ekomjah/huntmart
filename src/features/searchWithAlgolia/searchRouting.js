import { history } from "instantsearch.js/es/lib/routers";

import { INDEX_NAME } from "./searchClient";

/**
 * Facet attributes that are filterable on the `products` index. They are
 * declared as `attributesForFaceting` in scripts/seed-algolia.mjs and are
 * mirrored in the URL so a result set can be shared or bookmarked.
 */
export const REFINEMENT_ATTRIBUTES = ["category", "brand", "tags"];

export function searchParamsToRouteState(searchParams) {
  const rawPage = Number(searchParams.get("page"));
  const page =
    Number.isFinite(rawPage) && rawPage > 0 ? Math.trunc(rawPage) : 1;

  const refinementList = {};
  for (const attribute of REFINEMENT_ATTRIBUTES) {
    const values = searchParams.getAll(attribute).filter(Boolean);
    if (values.length > 0) {
      refinementList[attribute] = values;
    }
  }

  return {
    [INDEX_NAME]: {
      query: searchParams.get("q") ?? "",
      page,
      refinementList,
    },
  };
}

function routeStateToSearchParams(routeState, searchParams) {
  const indexState = routeState[INDEX_NAME] ?? {};

  const query = indexState.query ?? "";
  if (query) {
    searchParams.set("q", query);
  }

  // Pages are 1-based in the UI state. Only serialising a page past the first
  // keeps a bare `/shop/search` free of a `?page=1` that `createURL` would
  // never produce, so the round trip stays stable and `history()` skips the
  // write entirely when the URL is already correct.
  const page = Number(indexState.page ?? 1);
  if (Number.isFinite(page) && page > 1) {
    searchParams.set("page", String(Math.trunc(page)));
  }

  const refinementList = indexState.refinementList ?? {};
  for (const attribute of REFINEMENT_ATTRIBUTES) {
    for (const value of refinementList[attribute] ?? []) {
      searchParams.append(attribute, value);
    }
  }
}

/**
 * Wires InstantSearch's routing to React Router.
 *
 * The stock browser history router writes the URL with
 * `window.history.pushState`, which replaces the whole history state object and
 * so destroys the entry React Router keeps under `history.state.usr`. Passing
 * `push` through to `navigate` keeps React Router the only owner of history.
 * Reads stay on `window.location`, which React Router updates synchronously, so
 * parsing a link or a back/forward navigation is always current.
 *
 * `parseURL` / `createURL` keep the flat `?q=&page=&category=` shape the app
 * already uses instead of InstantSearch's nested `?products[query]=` encoding.
 */
export function createSearchRouter(push) {
  return history({
    // Keep refinements in the URL when leaving the page instead of writing `?`
    // on dispose.
    cleanUrlOnDispose: false,
    // InstantSearch debounces its own writes; no delay keeps the URL in step
    // with the results, and `replace` means no history entry either way.
    writeDelay: 0,
    push,
    parseURL: ({ location }) =>
      searchParamsToRouteState(new URLSearchParams(location.search)),
    createURL: ({ routeState, location }) => {
      const searchParams = new URLSearchParams(location.search);
      routeStateToSearchParams(routeState, searchParams);

      const search = searchParams.toString();
      const port = location.port ? `:${location.port}` : "";

      return `${location.protocol}//${location.hostname}${port}${location.pathname}${
        search ? `?${search}` : ""
      }${location.hash}`;
    },
  });
}

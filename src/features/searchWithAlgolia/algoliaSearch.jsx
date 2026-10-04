import { useEffect, useMemo } from "react";
import {
  Configure,
  Highlight,
  InstantSearch,
  useHits,
  useInstantSearch,
  usePagination,
  useRefinementList,
  useSearchBox,
} from "react-instantsearch";
import { Link, useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";

import { formatMoney } from "@/utils/price";

import { REFINEMENT_ATTRIBUTES } from "./searchRouting";
import { INDEX_NAME, getSearchClient } from "./searchClient";
import { useSearchRouter } from "./searchRouter";

const HITS_PER_PAGE = 10;
const FACET_LIMIT = 8;

const FACET_LABELS = {
  category: "Category",
  brand: "Brand",
  tags: "Tags",
};

export default function SearchResultsPage() {
  const searchClient = useMemo(() => getSearchClient(), []);
  const routing = useSearchRouter();

  if (!searchClient) {
    return <SearchUnavailable />;
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={INDEX_NAME}
      routing={routing}
      future={{ preserveSharedStateOnUnmount: true }}
      // The results list stays mounted while a request is in flight, so this
      // only controls when the page admits to feeling slow.
      stalledSearchDelay={400}
    >
      <Configure hitsPerPage={HITS_PER_PAGE} />
      <SearchResults />
    </InstantSearch>
  );
}

function SearchResults() {
  // Every InstantSearch widget has to be registered here, unconditionally, on
  // every render. `addWidgets` ends in `scheduleSearch()`, so mounting a widget
  // inside a `status` branch turns each resolved search into a fresh one — the
  // loop that made this page hang. Status may only change what is painted.
  const { status, error } = useInstantSearch();
  const { query, refine } = useSearchBox();
  const { items } = useHits();
  const pagination = usePagination();

  // Hooks cannot be generated in a loop, so each facet is wired by hand.
  // `REFINEMENT_ATTRIBUTES` in searchRouting.js must stay in step with these.
  const categories = useRefinementList({
    attribute: "category",
    limit: FACET_LIMIT,
  });
  const brands = useRefinementList({ attribute: "brand", limit: FACET_LIMIT });
  const tags = useRefinementList({ attribute: "tags", limit: FACET_LIMIT });
  const facets = { category: categories, brand: brands, tags: tags };

  const [params] = useSearchParams();
  const urlQuery = params.get("q") ?? "";

  // The app-bar search box navigates through React Router, which does not emit
  // `popstate`, so routing never sees it. Refining instead of configuring keeps
  // InstantSearch the single owner of the query: a back/forward already
  // arrived via `onUpdate` and makes `urlQuery === query`, so this runs only for
  // a real new query. A repeated refine is a no-op in algoliasearch-helper.
  useEffect(() => {
    if (urlQuery !== query) refine(urlQuery);
  }, [urlQuery, query, refine]);

  const isPending = status === "loading" || status === "stalled";
  const isFirstLoad = isPending && items.length === 0;
  const hasRefinements = pagination.nbHits > 0 && !isPending;

  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-6">
      <header className="mb-4 flex min-h-8 items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-[#777]">
          {query ? (
            <>
              Results for <span className="text-[#777]">“{query}”</span>
            </>
          ) : (
            "All products"
          )}
        </h2>
        <span
          className={`flex items-center gap-2 text-sm text-gray-400 transition-opacity ${
            isPending ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!isPending}
        >
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-(--hunt-primary) border-t-transparent" />
          Searching
        </span>
      </header>

      {status === "error" ? (
        <Panel>
          <p className="text-lg text-gray-700">
            Search is unavailable right now.
          </p>
          <p className="max-w-md text-sm text-gray-500">
            {error?.message ||
              "The search service could not be reached. Please try again shortly."}
          </p>
        </Panel>
      ) : isFirstLoad ? (
        <HitSkeletons />
      ) : items.length === 0 ? (
        <Panel>
          <SearchX className="mb-3 h-10 w-10 text-gray-300" />
          <p className="text-lg text-gray-400">
            {query
              ? `No products found for “${query}”`
              : "Start typing to search"}
          </p>
        </Panel>
      ) : (
        <div
          className={`transition-opacity ${isPending ? "opacity-60" : "opacity-100"}`}
        >
          <p className="mb-3 text-sm text-gray-400">
            {pagination.nbHits.toLocaleString("en-US")} product
            {pagination.nbHits === 1 ? "" : "s"}
          </p>

          <ol className="m-0 list-none p-0">
            {items.map((hit) => (
              <li key={hit.objectID}>
                <SearchHit hit={hit} />
              </li>
            ))}
          </ol>

          <Pagination pagination={pagination} />
        </div>
      )}

      {hasRefinements && (
        <div className="mt-6 grid gap-4 border-t border-gray-200 pt-4 sm:grid-cols-3">
          {REFINEMENT_ATTRIBUTES.map((attribute) => (
            <FacetList
              key={attribute}
              label={FACET_LABELS[attribute]}
              facet={facets[attribute]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Panel({ children }) {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center gap-2 px-6 text-center">
      {children}
    </div>
  );
}

function HitSkeletons() {
  return (
    <ul className="m-0 list-none p-0" aria-hidden="true">
      {Array.from({ length: HITS_PER_PAGE }, (_, index) => (
        <li
          key={index}
          className="mx-auto mb-5 grid h-[168px] max-w-[1000px] grid-cols-[1fr_2fr] items-center justify-around rounded-2xl bg-(--hunt-search-bg) p-4"
        >
          <span className="h-32 w-32 shrink-0 animate-pulse rounded-xl bg-gray-200" />
          <div className="flex flex-col gap-2">
            <span className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
            <span className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <span className="h-5 w-20 animate-pulse rounded bg-gray-200" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function SearchHit({ hit }) {
  return (
    <Link
      to={`/shop/products/${hit.id}`}
      className="mx-auto mb-5 grid max-w-[1000px] grid-cols-[1fr_2fr] items-center justify-around rounded-2xl bg-(--hunt-search-bg) p-4 shadow transition-all duration-300 hover:shadow-md"
    >
      {/* `thumbnail` is a small variant the index already carries, and
          reserving the box plus decoding off the main thread keeps ten results
          from blocking the frame they are painted in. */}
      <img
        src={hit.thumbnail || hit.images?.[0]}
        alt={hit.title}
        width={128}
        height={128}
        loading="lazy"
        decoding="async"
        className="h-32 w-32 shrink-0 rounded-xl border border-gray-100 object-cover"
      />
      <div className="flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-[#777]">
          <Highlight attribute="title" hit={hit} />
        </h3>
        <p className="line-clamp-2 text-base text-[#777]">{hit.description}</p>
        <p className="mt-2 font-bold text-indigo-400">
          ${formatMoney(hit.price)}
        </p>
      </div>
    </Link>
  );
}

function FacetList({ label, facet }) {
  if (!facet.canRefine) return null;

  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold tracking-wide text-gray-500 uppercase">
        {label}
      </h3>
      <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
        {facet.items.map((item) => (
          <li key={item.value}>
            <button
              type="button"
              onClick={() => facet.refine(item.value)}
              aria-pressed={item.isRefined}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                item.isRefined
                  ? "border-(--hunt-primary) bg-(--hunt-primary) text-white"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              {item.label}
              <span className="ml-1.5 text-xs opacity-70">{item.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Pagination({ pagination }) {
  const { pages, currentRefinement, nbPages, isFirstPage, isLastPage, refine } =
    pagination;

  if (nbPages <= 1) return null;

  // `pages` and `refine` are 0-based, unlike the `page` in the UI state and the
  // URL, which the connector writes as `page + 1`.
  return (
    <nav
      className="mt-4 flex items-center justify-center gap-3"
      aria-label="Search results pages"
    >
      <PageButton
        disabled={isFirstPage}
        onClick={() => refine(currentRefinement - 1)}
        label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </PageButton>

      <ol className="m-0 flex list-none items-center gap-1 p-0">
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              onClick={() => refine(page)}
              aria-current={page === currentRefinement ? "page" : undefined}
              className={`h-8 min-w-8 rounded-md border px-2 text-sm transition-colors ${
                page === currentRefinement
                  ? "border-(--hunt-primary) bg-(--hunt-primary) text-white"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              {page + 1}
            </button>
          </li>
        ))}
      </ol>

      <PageButton
        disabled={isLastPage}
        onClick={() => refine(currentRefinement + 1)}
        label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </PageButton>
    </nav>
  );
}

function PageButton({ disabled, onClick, label, children }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 transition-colors enabled:hover:border-gray-400 disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function SearchUnavailable() {
  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-6">
      <Panel>
        <p className="text-lg text-gray-700">Search is not configured.</p>
        <p className="max-w-md text-sm text-gray-500">
          Set <code>VITE_ALGOLIA_APP_ID</code> and{" "}
          <code>VITE_ALGOLIA_SEARCH_KEY</code> in a <code>.env.local</code> file
          and restart the dev server. See <code>.env.example</code>.
        </p>
      </Panel>
    </div>
  );
}

import {
  InstantSearch,
  Hits,
  Highlight,
  Configure,
  useInstantSearch,
  useHits,
} from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { useSearchParams } from "react-router";
import { Link } from "react-router";
import { formatMoney } from "@/utils/price";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_KEY,
);

function Hit({ hit }) {
  return (
    <Link
      to={`/shop/products/${hit.id}`}
      className="mx-auto mb-5 grid max-w-[1000px] grid-cols-[1fr_2fr] items-center justify-around rounded-2xl bg-(--hunt-search-bg) p-4 shadow transition-all duration-300 hover:shadow-md"
    >
      <img
        src={hit.images?.[0]}
        alt={hit.title}
        className="h-32 w-32 shrink-0 rounded-xl border border-gray-100 object-cover"
      />
      <div className="flex flex-col justify-between">
        <h2 className="text-lg font-semibold text-[#777]">
          <Highlight attribute="title" hit={hit} />
        </h2>
        <p className="line-clamp-2 text-base text-[#777]">{hit.description}</p>
        <p className="mt-2 font-bold text-indigo-400">
          ${formatMoney(hit.price)}
        </p>
      </div>
    </Link>
  );
}

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <Configure query={query} hitsPerPage={10} />
      <SearchResults query={query} />
    </InstantSearch>
  );
}

function SearchResults({ query }) {
  const { status, error } = useInstantSearch();
  const { items } = useHits();

  if (status === "loading" || status === "stalled") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-(--hunt-primary) border-t-transparent"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="text-lg text-gray-700">Search is unavailable right now.</p>
        <p className="max-w-md text-sm text-gray-500">
          {error?.message ||
            "The search service could not be reached. Please try again shortly."}
        </p>
      </div>
    );
  }

  if (status === "idle" && items.length === 0) {
    return (
      <div className="flex h-screen w-screen items-center justify-center px-6 text-center">
        <p className="text-lg text-gray-400">
          {query ? `No products found for “${query}”` : "Start typing to search"}
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="p-4 text-xl font-semibold text-[#777]">
        Results for “{query}”
      </h2>
      <Hits hitComponent={Hit} />
    </>
  );
}

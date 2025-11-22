import {
  InstantSearch,
  Hits,
  Highlight,
  Configure,
  useSearchBox,
  useInstantSearch,
  useHits,
  Pagination,
} from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import P

// --- Algolia client ---
const searchClient = algoliasearch(
  "3U179XKIHD",
  "9d3d862c275cf9b6b36481e904011040"
);

// --- Product Hit card ---
function Hit({ hit }) {
  return (
    <article className="mb-5 grid grid-cols-[1fr_2fr] items-center p-4 justify-around bg-gray-800 rounded-2xl shadow hover:shadow-md transition-all duration-300">
      <img
        src={hit.images?.[0]}
        alt={hit.title}
        className="w-32 h-32 object-cover rounded-xl shrink-0 border border-gray-200"
      />
      <div className="flex flex-col justify-between">
        <h2 className="text-lg font-semibold text-gray-400">
          <Highlight attribute="title" hit={hit} />
        </h2>
        <p className="text-base text-gray-400 line-clamp-2">
          {hit.description}
        </p>
        <p className="text-indigo-600 font-bold mt-2">${hit.price}</p>
      </div>
    </article>
  );
}

// --- Sync the URL query with Algolia search ---
function SearchBoxSync() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const { refine } = useSearchBox();

  useEffect(() => {
    refine(query);
  }, [query, refine]);

  return null;
}

// --- Custom loading and empty state handler ---
function SearchStatus() {
  const { status } = useInstantSearch();
  const { hits } = useHits();

  if (status === "loading") {
    return (
      <div className="flex justify-center py-8 text-gray-500">
        <div className="animate-pulse text-lg">Loading results...</div>
      </div>
    );
  }

  if (status === "idle" && hits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-lg">
        No products found 😔
      </div>
    );
  }

  return null;
}

// --- Main Search Results Page ---
export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <PrimarySearchAppBar />
      <Configure hitsPerPage={10} />
      <SearchBoxSync />
      <h2 className="text-xl font-semibold text-gray-700 my-4 px-4">
        Results for “{query}”
      </h2>
      <SearchStatus />
      <Hits hitComponent={Hit} />
      <Pagination
        showFirst
        showLast
        classNames={{
          list: "flex space-x-2 m-4 justify-center",
          item: "px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-200 text-gray-600",
          selectedItem: "bg-indigo-600 text-white",
        }}
      />
    </InstantSearch>
  );
}

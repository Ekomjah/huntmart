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
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import PrimarySearchAppBar from "../../components/AppBar/appBar";
import { Link } from "react-router";

// --- Algolia client ---
const searchClient = algoliasearch(
  "3U179XKIHD",
  "9d3d862c275cf9b6b36481e904011040",
);

// --- Product Hit card ---
function Hit({ hit }) {
  return (
    <Link
      to={`/products/${hit.id}`}
      className="mb-5 grid grid-cols-[1fr_2fr] items-center justify-around rounded-2xl bg-gray-800 p-4 shadow transition-all duration-300 hover:shadow-md"
    >
      <img
        src={hit.images?.[0]}
        alt={hit.title}
        className="h-32 w-32 shrink-0 rounded-xl border border-gray-200 object-cover"
      />
      <div className="flex flex-col justify-between">
        <h2 className="text-lg font-semibold text-gray-400">
          <Highlight attribute="title" hit={hit} />
        </h2>
        <p className="line-clamp-2 text-base text-gray-400">
          {hit.description}
        </p>
        <p className="mt-2 font-bold text-indigo-600">${hit.price}</p>
      </div>
    </Link>
  );
}
// --- Main Search Results Page ---
export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  return (
    <>
      <PrimarySearchAppBar /> {/* stays OUTSIDE InstantSearch */}
      <InstantSearch searchClient={searchClient} indexName="products">
        <SearchManager query={query} />
      </InstantSearch>
    </>
  );
}

// --- Manages refinement + result states ---
function SearchManager({ query }) {
  const { refine } = useSearchBox();
  const { status } = useInstantSearch();
  const { hits } = useHits();

  // refine only when query changes
  useEffect(() => {
    refine(query);
  }, [query]);

  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-(--hunt-primary) border-t-transparent"></div>
      </div>
    );
  }

  if (status === "idle" && hits.length === 0) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-lg text-gray-400">No products found for “{query}”</p>
      </div>
    );
  }

  return (
    <>
      <Configure hitsPerPage={10} />
      <h2 className="mt-20 px-4 text-xl font-semibold text-gray-700">
        Results for “{query}”
      </h2>
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
    </>
  );
}

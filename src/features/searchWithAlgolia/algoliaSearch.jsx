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
import PrimarySearchAppBar from "../../components/AppBar/Appbar";
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
        <p className="mt-2 font-bold text-indigo-400">${hit.price}</p>
      </div>
    </Link>
  );
}

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  return (
    <>
      <PrimarySearchAppBar />
      <InstantSearch searchClient={searchClient} indexName="products">
        <SearchManager query={query} />
      </InstantSearch>
    </>
  );
}

function SearchManager({ query }) {
  const { status } = useInstantSearch();
  const { hits } = useHits();

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
      <Configure query={query} hitsPerPage={10} />
      <h2 className="p-4 text-xl font-semibold text-[#777]">
        Results for “{query}”
      </h2>
      <Hits hitComponent={Hit} />
    </>
  );
}

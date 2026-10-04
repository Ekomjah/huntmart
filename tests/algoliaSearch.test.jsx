import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { searchClient } = vi.hoisted(() => ({
  searchClient: { search: vi.fn() },
}));

// The real factory throws from `liteClient` when the Vite env vars are missing,
// which is what used to white-screen every route, so it is replaced wholesale.
vi.mock("@/features/searchWithAlgolia/searchClient", () => ({
  INDEX_NAME: "products",
  getSearchClient: () => searchClient,
}));

const { default: SearchResultsPage } = await import(
  "@/features/searchWithAlgolia/algoliaSearch"
);

const HITS = [
  {
    objectID: "1",
    id: 1,
    title: "Essence Mascara Lash Princess",
    description: "A popular mascara.",
    price: 9.99,
    thumbnail: "https://example.test/thumb.webp",
    _highlightResult: { title: { value: "Essence Mascara" } },
  },
  {
    objectID: "2",
    id: 2,
    title: "Eyeshadow Palette With Mirror",
    description: "A palette.",
    price: 19.99,
    thumbnail: "https://example.test/thumb-2.webp",
    _highlightResult: { title: { value: "Eyeshadow Palette" } },
  },
];

const FACETS = {
  category: { beauty: 40, smartphones: 31 },
  brand: { essence: 12, anysain: 7 },
  tags: { mascara: 12, fragrance: 9 },
};

/**
 * Mirrors what `algoliasearch-helper` expects: `queries[0]` carries hits, any
 * extra queries exist only to count disjunctive facet values and come back with
 * no hits.
 */
function respond(queries) {
  return {
    results: queries.map(({ indexName, params }) => {
      const isFacetQuery = Number(params.hitsPerPage) === 0;

      return {
        index: indexName,
        hits: isFacetQuery ? [] : HITS,
        nbHits: isFacetQuery ? 0 : HITS.length,
        nbPages: isFacetQuery ? 0 : 3,
        page: Number(params.page ?? 0),
        hitsPerPage: isFacetQuery ? 0 : 10,
        processingTimeMS: 1,
        query: params.query ?? "",
        params: "",
        facets: FACETS,
        exhaustiveNbHits: true,
        exhaustiveFacetsCount: true,
      };
    }),
  };
}

function renderSearchPage(url = "/shop/search?q=laptop") {
  window.history.replaceState({}, "", url);

  const router = createBrowserRouter([
    { path: "/shop/search", element: <SearchResultsPage /> },
  ]);

  return render(<RouterProvider router={router} />);
}

describe("search results page", () => {
  beforeEach(() => {
    searchClient.search.mockReset();
    searchClient.search.mockImplementation(async (queries) => respond(queries));
  });

  // The regression guard. `<Hits>` used to live inside a `status` branch, so
  // every resolved search remounted it, `addWidgets` scheduled another search,
  // and the page hammered Algolia forever — roughly eight requests a second,
  // for as long as the page stayed open.
  //
  // The latency matters: with an instantly-resolving mock the old code happened
  // to settle at two requests, but at realistic latencies it never settled at
  // all. Keep the delay.
  it("issues exactly one request and stays idle after the results arrive", async () => {
    searchClient.search.mockImplementation(async (queries) => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      return respond(queries);
    });

    renderSearchPage();

    await waitFor(() => expect(searchClient.search).toHaveBeenCalledTimes(1));

    // Long enough for the old loop to fire off a whole batch of requests.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(searchClient.search).toHaveBeenCalledTimes(1);
  });

  it("sends the query from the URL in the first request", async () => {
    renderSearchPage("/shop/search?q=laptop");

    await waitFor(() => expect(searchClient.search).toHaveBeenCalledTimes(1));

    const [queries] = searchClient.search.mock.calls[0];
    expect(queries[0].params.query).toBe("laptop");
    expect(queries[0].params.hitsPerPage).toBe(10);
  });

  it("renders every hit exactly once", async () => {
    renderSearchPage();

    expect(await screen.findByText(/Essence Mascara/)).toBeInTheDocument();
    expect(screen.getByText(/Eyeshadow Palette/)).toBeInTheDocument();

    // One link per hit. A second pass would mean `useHits()` and `<Hits>` are
    // both rendering the same results.
    expect(screen.getAllByRole("link")).toHaveLength(HITS.length);
  });

  it("keeps the results mounted while a follow-up search is in flight", async () => {
    renderSearchPage();
    await screen.findByText(/Essence Mascara/);

    // Hang the next request so the page is caught mid-search.
    let release;
    searchClient.search.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          release = () =>
            resolve(
              respond([{ indexName: "products", params: { hitsPerPage: 10 } }]),
            );
        }),
    );

    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    await waitFor(() => expect(searchClient.search).toHaveBeenCalledTimes(2));

    // This is the invariant the old `status` branch broke: a pending search
    // dims the list, it never unmounts the widget that produced it.
    expect(screen.getByText(/Essence Mascara/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next page" }),
    ).toBeInTheDocument();

    await act(async () => {
      release();
    });
  });
});

describe("url routing", () => {
  beforeEach(() => {
    searchClient.search.mockReset();
    searchClient.search.mockImplementation(async (queries) => respond(queries));
  });

  it("applies refinements from a shared link in the very first request", async () => {
    renderSearchPage("/shop/search?q=laptop&category=beauty&page=2");

    await waitFor(() => expect(searchClient.search).toHaveBeenCalledTimes(1));

    const [mainQuery] = searchClient.search.mock.calls[0][0];

    expect(mainQuery.params.query).toBe("laptop");
    expect(JSON.stringify(mainQuery.params.facetFilters)).toContain("beauty");
    // The URL is 1-based; the request is 0-based.
    expect(mainQuery.params.page).toBe(1);
  });

  it("writes a chosen refinement back to the url with one extra request", async () => {
    renderSearchPage("/shop/search?q=laptop");

    await screen.findByRole("button", { name: /^beauty/i });

    fireEvent.click(screen.getByRole("button", { name: /^beauty/i }));

    await waitFor(() =>
      expect(window.location.search).toBe("?q=laptop&category=beauty"),
    );
    expect(searchClient.search).toHaveBeenCalledTimes(2);
  });

  it("writes the page back to the url as 1-based", async () => {
    renderSearchPage("/shop/search?q=laptop");
    await screen.findByText(/Essence Mascara/);

    fireEvent.click(screen.getByRole("button", { name: "Next page" }));

    await waitFor(() =>
      expect(window.location.search).toBe("?q=laptop&page=2"),
    );
  });

  it("does not rewrite an already canonical url", async () => {
    renderSearchPage("/shop/search?q=laptop");
    await screen.findByText(/Essence Mascara/);

    const before = window.location.href;

    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(window.location.href).toBe(before);
  });
});

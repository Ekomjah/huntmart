import { lazy, Suspense } from "react";
import App from "@/app/App.jsx";
import ErrorPage from "@/components/error/Error.jsx";
import Item from "@/features/firebase-fetch/GetItem.jsx";
import Reviews from "@/features/firebase-fetch/reviews/Reviews.jsx";
import Details from "@/features/firebase-fetch/details/Details.jsx";
import { Cart } from "@/features/cart/Cart.jsx";
import { Checkout } from "@/features/checkout-page/Checkout";
import AppLayout from "@/layout/Layout.jsx";
import Welcome from "@/Landing/Welcome";

import SearchFallback from "@/features/searchWithAlgolia/SearchFallback";

// InstantSearch and the search client only matter on the search route, and a
// search route must never be able to take the rest of the app down with it.
const SearchResultsPage = lazy(
  () => import("@/features/searchWithAlgolia/algoliaSearch.jsx"),
);

const routes = [
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/shop",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<SearchFallback />}>
            <SearchResultsPage />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "products/:id",
        element: <Item />,
        children: [
          {
            index: true,
            element: <Details />,
          },
          {
            path: "reviews",
            element: <Reviews />,
          },
        ],
      },
    ],
  },
];

export default routes;

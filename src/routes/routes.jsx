import App from "@/app/App.jsx";
import ErrorPage from "@/components/error/Error.jsx";
import Item from "@/features/firebase-fetch/GetItem.jsx";
import Reviews from "@/features/firebase-fetch/reviews/Reviews.jsx";
import Details from "@/features/firebase-fetch/details/Details.jsx";
import SearchResultsPage from "@/features/searchWithAlgolia/algoliaSearch.jsx";
import { Cart } from "@/features/cart/Cart.jsx";
import AppLayout from "@/layout/Layout.jsx";
import Welcome from "@/Landing/Welcome";

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
        element: <SearchResultsPage />,
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

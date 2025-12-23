import App from "@/app/App.jsx";
import ErrorPage from "@/components/error/error.jsx";
import Item from "@/features/firebase-fetch/GetItem.jsx";
import Reviews from "@/features/firebase-fetch/reviews/Reviews.jsx";
import Details from "@/features/firebase-fetch/details/Details.jsx";
import SearchResultsPage from "@/features/searchWithAlgolia/algoliaSearch.jsx";
import { Cart } from "@/features/cart/Cart.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "search",
    element: <SearchResultsPage />,
  },
  {
    path: "cart",
    element: <Cart />,
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
];

export default routes;

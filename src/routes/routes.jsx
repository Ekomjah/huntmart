import App from "../App.jsx";
import ErrorPage from "../components/error/error.jsx";
import Item from "../components/firebase-fetch/item.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "products/:id",
    element: <Item />,
  },
];

export default routes;

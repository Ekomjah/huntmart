import App from "../app/App.jsx";
import ErrorPage from "../components/error/error.jsx";
import Item from "../features/firebase-fetch/GetItem.jsx";

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

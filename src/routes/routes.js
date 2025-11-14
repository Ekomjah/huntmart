import App from "../App.jsx";
import ErrorPage from "../components/error/error.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    ErrorPage: <ErrorPage />,
  },
];

export default routes;

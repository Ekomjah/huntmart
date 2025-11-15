import App from "../App.jsx";
import ErrorPage from "../components/error/error.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
];

export default routes;

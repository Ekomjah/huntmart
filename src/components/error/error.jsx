import { Link } from "react-router";
import { useRouteError } from "react-router";
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div>
      <div className="relative">
        <img src="/pic.jpg" alt="error img" />
        <div className="absolute">
          <h1>Oops. Hit the wrong Page</h1>
          <p>{error}</p>
          <Link to="/">Go Home</Link>
        </div>
      </div>
    </div>
  );
}

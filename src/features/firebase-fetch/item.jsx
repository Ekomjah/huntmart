import { useParams } from "react-router";
import { useItem } from "../../hooks/useItem";
import { Navigate } from "react-router";
export default function Item() {
  const { id } = useParams();
  const { data: item, isLoading, isError } = useItem(id);
  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    console.log("some error, ", isError);
    return <Navigate to={`/errorPage`} replace />;
  }
  if (item) {
    return (
      <>
        <div>
          {Object.entries(item)
            .filter(([key]) => key === "title")
            .map(([_key, val]) => (
              <div key={_key}>
                <h1>{val}</h1>
              </div>
            ))}
          {Object.entries(item)
            .filter(([key]) => key === "category")
            .map(([_key, val]) => (
              <div key={_key}>
                <p>{val}</p>
              </div>
            ))}
        </div>
      </>
    );
  }
}

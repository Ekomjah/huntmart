import { useParams } from "react-router";
import { useItem } from "../../hooks/useItem";
import { Navigate } from "react-router";
import BarcodeGenerator from "../../components/bar-code/Barcode";
export default function Item() {
  const { id } = useParams();
  const { data: item, isLoading, isError } = useItem(id);
  const filterFunction = (key) => {
    return Object.entries(item)
      .filter(([k]) => k === key)
      .map(([, val]) => val);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    console.log("some error, ", isError);
    return <Navigate to={`/errorPage`} replace />;
  }
  if (item) {
    return (
      <>
        <div>
          {filterFunction("title").map((val, index) => (
            <div key={index}>
              <h1 className="text-2xl font-bold">{val}</h1>
            </div>
          ))}
          {filterFunction("price").map((val, index) => (
            <div key={index}>
              <p className="text-lg font-semibold">Price: {val}</p>
            </div>
          ))}
          {filterFunction("images").map((val, index) => (
            <div key={index}>
              <img
                src={`https://res.cloudinary.com/ekomjah/image/fetch/w_150,h_150,c_fill,g_auto,q_auto,f_auto,e_sharpen,dpr_auto/${val}`}
                alt="item-thumbnail"
                className="h-auto w-full"
              />
            </div>
          ))}
          Barcode
          <BarcodeGenerator meta={filterFunction("meta")[0]} />
          {Object.entries(item)
            .filter(([key]) => key === "brand")
            .map(([_key, val]) => (
              <div key={_key}>
                <p>Brand: {val}</p>
              </div>
            ))}
          {filterFunction("category").map(([val, index]) => (
            <div key={index}>
              <p>{val}</p>
            </div>
          ))}
          {filterFunction("description").map((val, index) => (
            <div key={index}>
              <p>{val}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
}

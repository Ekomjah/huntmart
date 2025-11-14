import { useEffect, useState } from "react";
import { useFetch } from "../../firebase/useFetch";

export default function ProductList() {
  const [products, setProducts] = useState(null);

  const { data, isLoading, isError, refetch } = useFetch();
  setProducts(data);

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <>
        <p>Error fetching data</p>
        <button onClick={() => refetch()}>Retry</button>
      </>
    );

  return (
    <div>
      {Object.entries(products).map(([id, product]) => (
        <div key={id}>
          <h2>{product.title}</h2>
          <img
            src={`https://res.cloudinary.com/dstspza38/image/fetch/w_150,h_150,c_fill,g_auto,q_auto,f_auto,e_sharpen,dpr_auto/${product.thumbnail}`}
          />
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}

import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router";
export default function ProductList() {
  const { data: products, isLoading, isError, refetch } = useFetch();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="flex h-64 animate-pulse flex-col justify-between rounded-lg bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 p-4"
            >
              <div className="mb-4 h-40 rounded-lg bg-gray-300"></div>{" "}
              {/* Image placeholder */}
              <div className="mb-2 h-6 w-3/4 rounded bg-gray-300"></div>{" "}
              {/* Title placeholder */}
              <div className="h-6 w-1/2 rounded bg-gray-300"></div>{" "}
              {/* Price placeholder */}
            </div>
          ))}
      </div>
    );
  }
  if (isError) {
    return (
      <>
        <p>Error fetching data</p>
        <button onClick={refetch}>Retry</button>
      </>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1300px] grid-cols-4 items-center justify-center gap-3">
      {Object.entries(products).map(([id, product]) => (
        <Link
          key={id}
          to={`/products/${id}`}
          className="flex h-full flex-col items-center justify-center rounded bg-(--hunt-surface) p-4 transition-transform duration-150 ease-in hover:scale-[1.01]"
        >
          <h2>{product.title}</h2>
          <img
            src={`https://res.cloudinary.com/ekomjah/image/fetch/w_150,h_150,c_fill,g_auto,q_auto,f_auto,e_sharpen,dpr_auto/${product.thumbnail}`}
            className="h-full w-full"
          />
          <p>{product.price}</p>
        </Link>
      ))}
    </div>
  );
}

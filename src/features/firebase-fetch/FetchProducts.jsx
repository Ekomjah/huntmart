import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router";
import BrandGrid from "../hunt-categories/Brand";
export default function ProductList() {
  const { data: products, isLoading, isError, refetch } = useFetch();
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 px-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

  function getRandomBrands(data, count = 8) {
    const brands = [
      ...new Set(Object.values(data).map((product) => product.brand)),
    ];

    for (let i = brands.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [brands[i], brands[j]] = [brands[j], brands[i]];
    }

    return brands.slice(0, count);
  }

  const brands = getRandomBrands(products);

  return (
    <>
      <BrandGrid brands={brands} />
      <div className="mx-auto grid max-w-[1300px] grid-cols-3 items-center justify-center gap-3 p-4">
        {Object.entries(products).map(([id, product]) => (
          <Link
            key={id}
            to={`/shop/products/${id}`}
            className="group flex flex-col items-center justify-center rounded bg-(--hunt-surface) p-4"
          >
            <h2>{product.title}</h2>
            <div className="h-48 w-48 overflow-hidden rounded">
              <img
                src={`https://res.cloudinary.com/ekomjah/image/fetch/w_200,h_200,c_fill,g_auto,q_auto,f_auto,e_sharpen,dpr_auto/${product.thumbnail}`}
                className="h-full w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            <p>{product.price}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

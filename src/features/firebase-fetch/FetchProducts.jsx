import { useFetch } from "../../hooks/useFetch";
import ProductsGrid from "../hunt-categories/ProductGrid";
import BrandGrid from "../hunt-categories/Brand";
export default function ProductList() {
  const { data: products, isLoading, isError, refetch } = useFetch();
  if (isLoading) {
    return (
      <div className="W-[90vw] mx-auto grid max-w-7xl grid-cols-1 gap-6 px-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

  const getRandomProducts = (data, count = 8) => {
    const products = Object.entries(data);
    let lengthCounter = products.length - 1;
    while (lengthCounter > 0) {
      const newIndex = Math.floor(Math.random() * (lengthCounter + 1));
      lengthCounter--;
      [products[lengthCounter], products[newIndex]] = [
        products[newIndex],
        products[lengthCounter],
      ];
    }

    return products.slice(0, count);
  };

  function getRandomValues(data, count = 8, randomValue = "brand") {
    const brands = [
      ...new Set(Object.values(data).map((product) => product[randomValue])),
    ];

    for (let i = brands.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [brands[i], brands[j]] = [brands[j], brands[i]];
    }

    return brands.slice(0, count);
  }

  const brands = getRandomValues(products);
  console.log(getRandomProducts(products));

  return (
    <>
      <h2 className="font-base mx-auto my-8 w-[90vw] max-w-7xl text-left font-sans text-xl font-semibold text-(--hunt-text) md:text-3xl">
        Choose by Brand
      </h2>
      <BrandGrid brands={brands} />
      <h2 className="font-base mx-auto my-8 w-[90vw] max-w-7xl text-left font-sans text-xl font-semibold text-(--hunt-text) md:text-3xl!">
        Today's best deals for you!
      </h2>
      <ProductsGrid products={getRandomProducts(products)} />
    </>
  );
}

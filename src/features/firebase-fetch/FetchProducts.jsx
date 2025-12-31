import { useFetch } from "../../hooks/useFetch";
import ProductsGrid from "../hunt-cards/ProductGrid";
import { useMemo } from "react";
import BrandGrid from "../hunt-cards/Brand";
import Savings from "../hunt-cards/Savings";
export default function ProductList() {
  const { data: products = {}, isLoading, isError, refetch } = useFetch();
  const getSavings = (amountToSave) => {
    const arrayOfProducts = Object.values(products);
    const discountedToAmountArray = arrayOfProducts.filter(
      (product) =>
        (product.discountPercentage / 100) * product.price >= amountToSave,
    );
    if (discountedToAmountArray.length > 0) {
      console.log(discountedToAmountArray);
      return discountedToAmountArray;
    }
    return null;
  };
  const getRandomProducts = (data, count = 6) => {
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
      ...new Set(
        Object.values(data ?? {}).map((product) => product[randomValue]),
      ),
    ];

    for (let i = brands.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [brands[i], brands[j]] = [brands[j], brands[i]];
    }

    return brands.slice(0, count);
  }
  const randomBrands = useMemo(
    () => getRandomValues(products),
    [JSON.stringify(products)],
  );
  const randomProducts = useMemo(
    () => getRandomProducts(products),
    [JSON.stringify(products)],
  );

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
              <div className="mb-4 h-40 rounded-lg bg-gray-300"></div>
              <div className="mb-2 h-6 w-3/4 rounded bg-gray-300"></div>
              <div className="h-6 w-1/2 rounded bg-gray-300"></div>
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
    <>
      <h2 className="font-base mx-auto mt-8 mb-2 w-[90vw] max-w-7xl text-left font-sans text-2xl font-bold text-(--hunt-text) md:text-3xl">
        Choose by Brand
      </h2>
      <BrandGrid brands={randomBrands} />
      <h2 className="font-base mx-auto mt-8 mb-2 w-[90vw] max-w-7xl text-left font-sans text-2xl font-bold text-(--hunt-text) md:text-3xl!">
        Today's best deals for you!
      </h2>
      <ProductsGrid products={randomProducts} />
      <h2 className="font-base mx-auto mt-8 mb-2 w-[90vw] max-w-7xl text-left font-sans text-2xl font-bold text-(--hunt-text) md:text-3xl!">
        Save huge amounts in discount
      </h2>
      <div>
        <div>
          <h2 className="font-pop text-xl text-gray-600">Save </h2>
          <div className="text-3xl font-semibold text-(--hunt-primary)">
            $200
          </div>
        </div>
      </div>
      <h2 className="font-base mx-auto mt-8 mb-2 w-[90vw] max-w-7xl text-left font-sans text-2xl font-bold text-(--hunt-text) md:text-3xl!">
        Weekly popular products
      </h2>
      <ProductsGrid products={randomProducts} />
    </>
  );
}

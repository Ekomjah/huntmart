import { useFetch } from "../../hooks/useFetch";
import ProductsGrid from "../hunt-cards/ProductGrid";
import { useMemo, useEffect, useState } from "react";
import BrandGrid from "../hunt-cards/Brand";
import { isToday, isThisWeek } from "date-fns";
import { getRandomProducts } from "@/services/getRandomProduct";
import { getRandomValues } from "@/services/getRandomBrand";
export default function ProductList() {
  const { data: products = {}, isLoading, isError, refetch } = useFetch();
  const [dailyDeals, setDailyDeals] = useState([]);
  const [count, setCount] = useState(8);
  const [weeklyDeals, setWeeklyDeals] = useState([]);

  const randomBrands = useMemo(
    () => getRandomValues(products),
    [JSON.stringify(products)],
  );

  const randomProducts = getRandomProducts(products);
  console.log("result of randomProducts: ", randomProducts);

  useEffect(() => {
    if (!isLoading && Object.keys(products).length > 0) {
      const lastUpdatedWeeklyDeals = localStorage.getItem("weeklyDealsTimer");
      const today = new Date().toDateString();
      if (!isThisWeek(new Date(lastUpdatedWeeklyDeals))) {
        const deals = getRandomProducts(products, 12);
        if (deals.length === 0) {
          console.log("no products available yet");
          return;
        }
        setWeeklyDeals(deals);
        localStorage.setItem("weeklyDeals", JSON.stringify(deals));
        localStorage.setItem("weeklyDealsTimer", today);
      } else {
        setWeeklyDeals(JSON.parse(localStorage.getItem("weeklyDeals")));
      }
    }
  }, [isLoading, products, getRandomProducts]);

  useEffect(() => {
    if (!isLoading && Object.keys(products).length > 0) {
      const lastUpdatedDailyDeals = localStorage.getItem("dailyDealsTimer");
      const today = new Date().toDateString();
      if (!isToday(new Date(lastUpdatedDailyDeals))) {
        const deals = getRandomProducts(products, 12);
        if (deals.length === 0) {
          throw new Error("no products available yet");
        }
        setDailyDeals(deals);
        localStorage.setItem("dailyDeals", JSON.stringify(deals));
        localStorage.setItem("dailyDealsTimer", today);
      } else {
        setDailyDeals(JSON.parse(localStorage.getItem("dailyDeals")));
      }
    }
  }, [isLoading, products, getRandomProducts]);

  useEffect(() => {}, [products, getRandomProducts]);

  if (isLoading) {
    return (
      <div className="mx-auto grid w-[90vw] max-w-7xl grid-cols-1 gap-6 px-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      <h2 className="font-base mx-auto mt-8 mb-4 w-[90vw] max-w-7xl text-left font-sans text-2xl font-bold text-(--hunt-text) md:text-3xl">
        Choose by Brands
      </h2>
      <BrandGrid brands={randomBrands} />
      <h2 className="font-base mx-auto mt-8 mb-4 w-[90vw] max-w-7xl text-left font-sans text-2xl font-bold text-(--hunt-text) md:text-3xl!">
        Today's best deals for you!
      </h2>
      <ProductsGrid products={dailyDeals} />
      <h2 className="font-base mx-auto mt-8 mb-4 w-[90vw] max-w-7xl grid-cols-2 text-left font-sans text-2xl font-bold text-(--hunt-text) md:grid-cols-4 md:text-3xl!">
        Save huge amounts in discount of {count} products
        <button onClick={() => setCount(count + 1)}>Increase Count</button>
      </h2>
      <div className="mx-auto mb-8 grid w-[90vw] max-w-7xl grid-cols-1 items-center justify-between space-y-4 md:grid-cols-4 md:space-y-0 md:space-x-4">
        <div className="group rounded-lg border border-gray-300 bg-white shadow-md">
          <div className="flex flex-col p-4">
            <h2 className="font-pop text-xl text-gray-600">Save</h2>
            <div className="text-3xl font-semibold text-(--hunt-primary)">
              $500
            </div>
            <p className="mt-4">
              Checkout latest automobile models at crazy discounts
            </p>
          </div>
          <div className="h-48 overflow-hidden rounded-b-lg">
            <img
              src="https://res.cloudinary.com/ekomjah/image/upload/v1767230742/car-car-park_1_cyi07o.jpg"
              alt="furniture"
              className="mt-2 h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </div>
        <div className="group rounded-lg border border-gray-300 bg-white shadow-md">
          <div className="flex flex-col p-4">
            <h2 className="font-pop text-xl text-gray-600">Save</h2>
            <div className="text-3xl font-semibold text-(--hunt-primary)">
              $250
            </div>
            <p className="mt-4">
              Explore a wide range of discounted furniture and home decor items
            </p>
          </div>
          <div className="h-48 overflow-hidden rounded-b-lg">
            <img
              src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e6cd367817e964f756_sofa-min.png"
              alt="furniture"
              className="mt-2 h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </div>
        <div className="group rounded-lg border border-gray-300 bg-white shadow-md">
          <div className="flex flex-col p-4">
            <h2 className="font-pop text-xl text-gray-600">Save</h2>
            <div className="text-3xl font-semibold text-(--hunt-primary)">
              $200
            </div>
            <p className="mt-4">
              Explore a wide range of discounted furniture and home decor items
            </p>
          </div>
          <div className="h-48 overflow-hidden rounded-b-lg">
            <img
              src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e6cd367817e964f756_sofa-min.png"
              alt="furniture"
              className="mt-2 h-full w-full rounded-b-lg object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </div>
        <div className="group rounded-lg border border-gray-300 bg-white shadow-md">
          <div className="flex flex-col p-4">
            <h2 className="font-pop text-xl text-gray-600">Save</h2>
            <div className="text-3xl font-semibold text-(--hunt-primary)">
              $200
            </div>
            <p className="mt-4">
              Explore a wide range of discounted furniture and home decor items
            </p>
          </div>
          <div className="h-48 overflow-hidden rounded-b-lg">
            <img
              src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e6cd367817e964f756_sofa-min.png"
              alt="furniture"
              className="mt-2 h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </div>
      </div>
      <h2 className="font-base mx-auto mt-8 mb-2 w-[90vw] max-w-7xl text-left font-sans text-2xl font-bold text-(--hunt-text) md:text-3xl!">
        Weekly popular products
      </h2>
      <ProductsGrid products={weeklyDeals} />
    </>
  );
}

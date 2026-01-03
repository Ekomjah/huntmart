import { useFetch } from "../../hooks/useFetch";
import { ProductsGrid } from "../hunt-cards/ProductGrid";
import { useMemo, useEffect, useState } from "react";
import { BrandGrid } from "../hunt-cards/Brand";
import { isToday, isThisWeek } from "date-fns";
import { getRandomProducts } from "@/services/getRandomProduct";
import { getRandomValues } from "@/services/getRandomBrand";
import { Savings } from "../hunt-cards/Savings";
export default function ProductList() {
  const { data: products = {}, isLoading, isError, refetch } = useFetch();
  const [dailyDeals, setDailyDeals] = useState([]);
  const [weeklyDeals, setWeeklyDeals] = useState([]);
  const stringifiedReferenceObject = JSON.stringify(products);
  const randomBrands = useMemo(
    () => getRandomValues(products),
    [stringifiedReferenceObject],
  );

  const randomProducts = useMemo(
    () => getRandomProducts(products),
    [stringifiedReferenceObject],
  );
  useEffect(() => {
    function updateStates(
      stateSetter,
      localDataKey,
      localTimerKey,
      isWeek = false,
    ) {
      if (!isLoading && Object.keys(products).length > 0) {
        const lastUpdatedWeeklyDeals = localStorage.getItem(localTimerKey);
        const today = new Date().toDateString();
        const resetCondition = isWeek
          ? !isThisWeek(new Date(lastUpdatedWeeklyDeals))
          : !isToday(new Date(lastUpdatedWeeklyDeals));
        if (resetCondition) {
          const deals = getRandomProducts(products, 12);
          if (deals.length === 0) {
            return;
          }
          stateSetter(deals);
          localStorage.setItem(localDataKey, JSON.stringify(deals));
          localStorage.setItem(localTimerKey, today);
        } else {
          stateSetter(JSON.parse(localStorage.getItem(localDataKey)));
        }
      }
    }
    updateStates(setWeeklyDeals, "weeklyDeals", "weeklyDealsTimer", true);
    updateStates(setDailyDeals, "dailyDeals", "dailyDealsTimer");
  }, [isLoading, products]);

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
      <h2 className="font-base mx-auto mt-24 mb-4 w-[90vw] max-w-7xl text-left font-sans text-2xl font-bold text-(--hunt-text) md:text-3xl">
        Choose by Brands
      </h2>
      <BrandGrid brands={randomBrands} />
      <h2 className="font-base mx-auto mt-24 mb-4 w-[90vw] max-w-7xl text-left font-sans text-2xl font-bold text-(--hunt-text) md:text-3xl!">
        Today's best deals for you!
      </h2>
      <ProductsGrid products={dailyDeals} />
      <h2 className="font-base mx-auto mt-24 mb-4 w-[90vw] max-w-7xl grid-cols-2 text-left font-sans text-2xl font-bold text-(--hunt-text) md:grid-cols-4 md:text-3xl!">
        Save huge amounts from discounts
      </h2>
      <Savings />
      <h2 className="font-base mx-auto mt-24 mb-2 w-[90vw] max-w-7xl text-left font-sans text-2xl font-bold text-(--hunt-text) md:text-3xl!">
        Weekly popular products
      </h2>
      <ProductsGrid products={weeklyDeals} />
    </>
  );
}

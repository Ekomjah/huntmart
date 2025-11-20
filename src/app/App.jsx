import "./App.css";
import { useEffect } from "react";
import CarouselApp from "../components/carousel/carousel";
import PrimaryAppBar from "../components/AppBar/appBar";
import ProductList from "../features/firebase-fetch/FetchProducts";
import HuntCategories from "../features/hunt-categories/categories";
import { update } from "../hooks/updateFavicon";
import Footer from "../components/footer/footer";
import CategoryCarousel from "../features/category-carousel/Carousel";

export default function App() {
  useEffect(() => {
    update();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", update);
  }, []);
  return (
    <>
      <PrimaryAppBar />
      <div className="relative mt-[65px]">
        <CarouselApp />
        <div className="absolute top-1/2 z-60 -translate-y-1/2 rounded-r-full bg-(--hunt-bg-alpha) p-4 pr-6 text-(--hunt-primary) transition duration-1000 ease-in">
          <h2 className="font-sans font-semibold">Welcome to</h2>
          <h1 className="font-pop text-4xl! font-bold lg:text-8xl!">
            {" "}
            Hunt Mart
          </h1>
          <h2 className="m-0 p-0 font-sans text-base font-normal">
            A Shopping and Department Store
          </h2>
          <p className="font-sans text-base font-semibold lg:text-lg">
            Every shopper is a hunter.
          </p>
          <p className="font-sans text-base font-semibold lg:text-lg">
            Every 'check-out' is a trophy.
          </p>
        </div>
      </div>
      <div style={{ padding: "1rem" }}>
        <h1 className="font-pop text-(--hunt-primary-deep)">
          Hunt Without Limits!
        </h1>
      </div>
      <div>
        <h2 className="mt-10 mb-5 text-center text-4xl font-semibold text-(--hunt-text)">
          Shop by a various categories
        </h2>
      </div>
      <CategoryCarousel />
      <ProductList />
      <Footer />
    </>
  );
}

// export default App;

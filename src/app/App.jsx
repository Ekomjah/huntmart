import "./App.css";
import { useEffect } from "react";
import CarouselApp from "../components/carousel/carousel";
import PrimaryAppBar from "../components/AppBar/appBar";
import ProductList from "../features/firebase-fetch/FetchProducts";
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
          <div className="absolute inset-0 rounded-r-full bg-black/50"></div>
          <div className="relative z-10">
            <h2 className="font-sans text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">
              Welcome to
            </h2>
            <h1 className="font-pop text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Hunt Mart
            </h1>
            <h2 className="m-0 p-0 font-sans text-sm font-normal sm:text-base md:text-lg lg:text-xl">
              A Shopping and Department Store
            </h2>
            <p className="font-sans text-sm font-semibold sm:text-base md:text-lg lg:text-xl">
              Every shopper is a hunter.
            </p>
            <p className="font-sans text-sm font-semibold sm:text-base md:text-lg lg:text-xl">
              Every 'check-out' is a trophy.
            </p>
          </div>
        </div>
      </div>
      <div style={{ padding: "1rem" }}>
        <h1 className="font-pop text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl lg:text-4xl">
          Hunt Without Limits!
        </h1>
      </div>
      <div>
        <h2 className="mt-10 mb-5 text-center text-2xl font-semibold text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl">
          Shop by various categories
        </h2>
      </div>
      <CategoryCarousel />
      <ProductList />
      <Footer />
    </>
  );
}

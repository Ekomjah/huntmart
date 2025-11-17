import "./App.css";
import { useEffect } from "react";
import CarouselApp from "./components/carousel/carousel";
import PrimaryAppBar from "./components/AppBar/appBar";
import ProductList from "./components/firebase-fetch/fetched";

function App() {
  useEffect(() => {
    const update = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document
        .querySelector("link[rel='icon']")
        ?.setAttribute("href", isDark ? "/favicon-dark.svg" : "/favicon.svg");
    };
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
        <div className="absolute top-1/2 z-60 -translate-y-1/2 rounded-r-full bg-(--hunt-bg) p-4 pr-6 text-red-400">
          <h2 className="font-sans font-semibold">Welcome to</h2>
          <h1 className="font-pop text-4xl! font-bold lg:text-8xl!">
            {" "}
            Hunt Mart
          </h1>
          <h2 className="m-0 p-0 font-sans text-base font-normal">
            A Shopping and Department Store
          </h2>
          <p className="font-sans text-base font-semibold lg:text-lg">
            Every shopper is a hunter. Every basket is a trophy.
          </p>
        </div>
      </div>

      <div>
        Shop our various categories
      </div>
      <div style={{ padding: "1rem" }}>
        <h1>Hello Theme!</h1>
        <p>The theme is now applied to your document.</p>
      </div>
      <ProductList />
    </>
  );
}

export default App;

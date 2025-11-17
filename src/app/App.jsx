import "./App.css";
import { useEffect } from "react";
import CarouselApp from "../components/carousel/carousel";
import PrimaryAppBar from "../components/AppBar/appBar";
import ProductList from "../features/firebase-fetch/fetched";
import HuntCategories from "../features/categories/components/hunt-categories/categories";
import { update } from "../hooks/updateFavicon";
function App() {
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
        <h2>Shop by a various categories</h2>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <HuntCategories
            text="books"
            img="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e460afc22b7ea53520_books-min.png"
          />
          <HuntCategories
            text="tech"
            img="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e754ac2e32897cb53b_tech-min.png"
          />
          <HuntCategories
            text="books"
            img="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e460afc22b7ea53520_books-min.png"
          />
          <HuntCategories
            text="books"
            img="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e460afc22b7ea53520_books-min.png"
          />
          <HuntCategories
            text="books"
            img="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e460afc22b7ea53520_books-min.png"
          />
        </div>
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

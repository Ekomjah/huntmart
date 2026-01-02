import "./App.css";
import CarouselApp from "../components/carousel/Carousel";
import ProductList from "../features/firebase-fetch/FetchProducts";
import {Footer} from "../components/footer/Footer";
import { ProductBody } from "./ProductBody";
// TODO: ADD A RELATED PRODUCTS TAB TO DISPLAY PRODUCTS IN THE SAME CATEGORY IN THE ITEMS PAGE :D

export default function App() {
  return (
    <>
      <div className="relative">
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
      <ProductBody />
      <ProductList />
      <Footer />
    </>
  );
}

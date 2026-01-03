import "./App.css";
import CarouselApp from "../components/carousel/Carousel";
import ProductList from "../features/firebase-fetch/FetchProducts";
import { Footer } from "../components/footer/Footer";
import { ProductBody } from "./ProductBody";
// TODO: ADD A RELATED PRODUCTS TAB TO DISPLAY PRODUCTS IN THE SAME CATEGORY IN THE ITEMS PAGE :D

export default function App() {
  return (
    <>
      <div className="relative">
        <CarouselApp />
      </div>
      <ProductBody />
      <ProductList />
      <Footer />
    </>
  );
}

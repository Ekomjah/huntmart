import "./App.css";
import CarouselApp from "../components/carousel/Carousel";
import ProductList from "../features/firebase-fetch/FetchProducts";
import Footer from "../components/footer/Footer";
import HuntCategories from "@/features/hunt-categories/Categories";

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
      <div style={{ padding: "1rem" }}>
        <h1 className="font-pop text-3xl! font-bold text-(--hunt-text) sm:text-2xl! md:text-5xl! lg:text-6xl!">
          Hunt Without Limits!
        </h1>
      </div>
      <div>
        <h2 className="font-base mx-auto mb-2 w-[90vw] max-w-7xl text-left font-sans text-xl! text-(--hunt-text)">
          Shop by various categories
        </h2>
      </div>

      <div className="mx-auto mb-10 grid w-[90vw] max-w-7xl gap-6 md:grid-cols-4">
        {[
          {
            img: "https://res.cloudinary.com/ekomjah/image/upload/v1766973565/electronics_sbftm7.jpg",
            title: "Electronics",
            desc: "Latest tech gadgets",
          },
          {
            img: "https://res.cloudinary.com/ekomjah/image/upload/v1766973563/homedecor_fu1dud.jpg",
            title: "Home Decor",
            desc: "Stylish home accents",
          },
          {
            img: "https://res.cloudinary.com/ekomjah/image/upload/v1766973566/fashion_zqyh3c.jpg",
            title: "Fashion",
            desc: "Trendy apparel",
          },
          {
            img: "https://res.cloudinary.com/ekomjah/image/upload/v1766973570/groceries_xsbjen.jpg",
            title: "Groceries",
            desc: "Tasty food and good fruits for healthy living",
          },
          // {
          //   img: "https://res.cloudinary.com/ekomjah/image/upload/v1766973563/automotive_kp7stt.jpg",
          //   title: "Automotives",
          //   desc: "Cars and repairs",
          // },
          // {
          //   img: "https://res.cloudinary.com/ekomjah/image/upload/v1766973564/beauty_xttpun.jpg",
          //   title: "Beauty and Body Care",
          //   desc: "Quality skin essentials",
          // },
          // {
          //   img: "https://res.cloudinary.com/ekomjah/image/upload/v1766972847/sports-tools_1_1_bn9rui.jpg",
          //   title: "Sports",
          //   desc: "Everything to stay fit",
          // },
        ].map((collection) => (
          <HuntCategories collection={collection} />
        ))}
      </div>
      <ProductList />
      <Footer />
    </>
  );
}

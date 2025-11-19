import "./App.css";
import { useEffect } from "react";
import CarouselApp from "../components/carousel/carousel";
import PrimaryAppBar from "../components/AppBar/appBar";
import ProductList from "../features/firebase-fetch/fetched";
import HuntCategories from "../features/categories/components/hunt-categories/categories";
import { update } from "../hooks/updateFavicon";
import Footer from "../components/footer/footer";

const categoryImages = {
  fragrances:
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800",
  furniture:
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800",
  tech: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  beauty: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  groceries:
    "https://images.unsplash.com/photo-1628102491629-778571d893a3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JvY2VyaWVzfGVufDB8fDB8fHww",
  "home-decoration":
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  "kitchen-accessories":
    "https://images.unsplash.com/photo-1556185781-a47769abb7ee?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2l0Y2hlbiUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww",
  laptops: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  "mens-shirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  "mens-shoes":
    "https://images.unsplash.com/photo-1614253429340-98120bd6d753?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVuJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
  "mens-watches":
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "mobile-accessories":
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  motorcycle:
    "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW90b3JjeWNsZXxlbnwwfHwwfHx8MA%3D%3D",
  "skin-care":
    "https://plus.unsplash.com/premium_photo-1674739375749-7efe56fc8bbb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  smartphones:
    "https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhvbmV8ZW58MHx8MHx8fDA%3D",
  "sports-accessories":
    "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
  sunglasses:
    "https://images.unsplash.com/photo-1604025823014-6378b2726338?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN1biUyMGdsYXNzZXN8ZW58MHx8MHx8fDA%3D",
  tablets:
    "https://images.unsplash.com/photo-1561154464-82e9adf32764?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D",
  tops: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  vehicle: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
  "womens-bags":
    "https://plus.unsplash.com/premium_photo-1692340973516-1b27b90d49c5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhhbmRiYWd8ZW58MHx8MHx8fDA%3D",
  "womens-dresses":
    "https://images.unsplash.com/photo-1633077705107-8f53a004218f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBkcmVzc2VzfGVufDB8fDB8fHww",
  "womens-jewellery":
    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
  "womens-shoes":
    "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
  "womens-watches":
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "mens-clothing":
    "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
  jewelery:
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
  electronics:
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D",
  "womens-clothing":
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWVuJTIwY2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D",
};

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
        <div className="absolute top-1/2 z-60 -translate-y-1/2 rounded-r-full bg-(--hunt-bg-alpha) p-4 pr-6 text-(--hunt-primary)">
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
        <div className="m-3 flex flex-wrap items-start justify-center gap-5 overflow-auto">
          {Object.entries(categoryImages).map(([text, img]) => (
            <HuntCategories text={text} img={img} />
          ))}
        </div>
      </div>
      <ProductList />
      <Footer />
    </>
  );
}

// export default App;

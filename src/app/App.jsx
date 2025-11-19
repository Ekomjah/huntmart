import "./App.css";
import { useEffect } from "react";
import CarouselApp from "../components/carousel/carousel";
import PrimaryAppBar from "../components/AppBar/appBar";
import ProductList from "../features/firebase-fetch/fetched";
import HuntCategories from "../features/categories/components/hunt-categories/categories";
import { update } from "../hooks/updateFavicon";

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
    "https://plus.unsplash.com/premium_photo-1670983858433-8ef0f54f0c71?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVuJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
  "mens-watches":
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "mobile-accessories":
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  motorcycle: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
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
            Every shopper is a hunter.
          </p>
          <p className="font-sans text-base font-semibold lg:text-lg">
            Every 'check-out' is a trophy.
          </p>
        </div>
      </div>
      <h2>Hunt Without Limits!</h2>
      <div>
        <h2 className="mt-10 mb-5 text-center text-4xl font-semibold text-(--hunt-text)">
          Shop by a various categories
        </h2>
        <div className="flex flex-wrap items-start justify-center gap-5">
          {/* <HuntCategories
            text="books"
            img="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e460afc22b7ea53520_books-min.png"
          />
          <HuntCategories
            text="tech"
            img="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e754ac2e32897cb53b_tech-min.png"
          />
          <HuntCategories
            text="fragrance"
            img="data:image/jpeg;base64,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"
          />
          <HuntCategories text="tech" img="https:" />
          <HuntCategories
            text="furniture"
            img="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e570738029a725e686_Furniture-min.png"
          /> */}
          {Object.entries(categoryImages).map(([text, img]) => (
            <HuntCategories text={text} img={img} />
          ))}
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

// export default App;

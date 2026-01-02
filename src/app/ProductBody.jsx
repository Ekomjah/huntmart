import { HuntCategories } from "@/features/hunt-cards/Categories";
export function ProductBody() {
  return (
    <div>
      <h2 className="font-base mx-auto mt-20 mb-2 w-[90vw] max-w-7xl text-left font-sans text-2xl font-bold text-(--hunt-text) md:text-3xl">
        Shop by various categories
      </h2>
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
          <HuntCategories collection={collection} key={collection.title} />
        ))}
      </div>
    </div>
  );
}

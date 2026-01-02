import { Link } from "react-router";
import StaticRatings from "@/components/ratings/StaticRatings";

export default function ProductsGrid({ products }) {
  const displayTitle = (title) =>
    title.length > 18 ? `${title.slice(0, 18)}...` : title;
  console.log("received props in ProductsGrid component", products)
  return (
    <div className="mx-auto grid w-[90vw] max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {products.map(([id, product]) => {
        const { title, thumbnail, price, rating, reviews } = product;

        return (
          <div
            key={id}
            className="group relative mx-auto flex flex-col rounded-xl bg-gray-100 p-4 shadow-sm transition hover:shadow-lg"
          >
            <Link to={`/shop/products/${id}`} className="block">
              <div className="mb-4 h-48 w-full overflow-hidden rounded-lg bg-white">
                <img
                  src={`https://res.cloudinary.com/ekomjah/image/fetch/w_300,h_300,c_fit,q_auto,f_auto/${thumbnail}`}
                  alt={title}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h2 className="mb-2 line-clamp-2 text-left font-sans text-sm font-semibold text-gray-800">
                {displayTitle(title)}
              </h2>
              <p className="font-pop mb-1 text-left text-lg font-bold text-gray-900">
                ${price}
              </p>
              <div className="flex items-center">
                <StaticRatings ratings={Math.floor(rating)} />
                <span className="mr-2 text-sm text-gray-600">
                  ({reviews?.length || 0})
                </span>
              </div>
            </Link>
            <button className="cta font-pop mt-auto rounded-lg active:scale-95">
              Add to cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

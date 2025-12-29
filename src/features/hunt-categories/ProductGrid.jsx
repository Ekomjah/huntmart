import { Link } from "react-router";

export default function ProductsGrid({ products }) {
  return (
    <div className="mx-auto grid w-[90vw] max-w-7xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map(([id, product]) => {
        const { title, thumbnail, price } = product;

        return (
          <div
            key={id}
            className="group relative mx-auto flex flex-col rounded-xl bg-(--hunt-surface) p-4 shadow-sm transition hover:shadow-lg"
          >
            <Link to={`/shop/products/${id}`} className="block">
              <div className="mb-4 h-48 w-full overflow-hidden rounded-lg bg-white">
                <img
                  src={`https://res.cloudinary.com/ekomjah/image/fetch/w_300,h_300,c_fit,q_auto,f_auto/${thumbnail}`}
                  alt={title}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h2 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-800">
                {title}
              </h2>

              <p className="mb-3 text-lg font-bold text-gray-900">₦{price}</p>
            </Link>

            {/* CTA */}
            <button className="mt-auto rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 active:scale-95">
              Add to cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

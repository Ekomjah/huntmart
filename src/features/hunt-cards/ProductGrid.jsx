import { Link } from "react-router";
import StaticRatings from "@/components/ratings/StaticRatings";
import { useCartStore } from "@/stores/useCartStore";
import { displayName } from "@/utils/nameShortener";
import { Plus, Minus, Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router";
export function ProductsGrid({ products }) {
  const navigate = useNavigate();
  const [isHeartFull, setIsHeartFull] = useState(false);
  const { getQuantity, addToCartData, updateCartData, deleteFromCart } =
    useCartStore();
  const displayTitle = (title) =>
    title.length > 18 ? `${title.slice(0, 18)}...` : title;
  return (
    <div className="mx-auto mb-16 grid w-[90vw] max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {products.map(([id, product]) => {
        const { title, thumbnail, price, rating, reviews, stock } = product;

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
            <div className="mt-4 grid grid-cols-subgrid items-center">
              {getQuantity(id) > 0 && stock > 0 ? (
                <div className="flex flex-1 items-center justify-between gap-2">
                  <button
                    className="p-3! focus:border-0"
                    onClick={() => {
                      getQuantity(id) > 0
                        ? updateCartData(id, getQuantity(id) - 1)
                        : deleteFromCart(id);
                    }}
                  >
                    <Minus strokeWidth={3} />
                  </button>
                  <p>{getQuantity(id)}</p>
                  <button
                    className="p-3! focus:outline-0"
                    onClick={() => updateCartData(id, +getQuantity(id) + 1)}
                  >
                    <Plus strokeWidth={3} />
                  </button>
                  {/* <div
                    onClick={() => setIsHeartFull(!isHeartFull)}
                    className="cursor-pointer rounded bg-gray-300 p-3 transition-colors duration-300 ease-in hover:bg-(--hunt-primary)"
                  >
                    <Heart
                      fill={isHeartFull ? "red" : "var(--hunt-bg)"}
                      strokeWidth={3}
                    />
                  </div> */}
                </div>
              ) : stock < 1 ? (
                <div className="font-pop mt-8 cursor-not-allowed rounded bg-red-500 p-2 text-base font-bold text-white!">
                  Out of Stock
                </div>
              ) : (
                <div className="mt-4">
                  <button
                    className="cta font-pop mt-auto flex items-center justify-between gap-4 rounded-lg active:scale-95"
                    onClick={() => {
                      toast.success(`${displayName(title)} added to cart`, {
                        action: (
                          <button
                            className="cta ml-auto rounded-md"
                            onClick={() => {
                              navigate("/shop/cart");
                            }}
                          >
                            View Cart
                          </button>
                        ),
                      });
                      addToCartData({
                        id: id,
                        title: title,
                        price: price,
                        image: product.images[0],
                        stock: stock,
                        quantity:
                          getQuantity(id) + 1 > stock
                            ? stock
                            : getQuantity(id) + 1,
                      });
                    }}
                  >
                    {" "}
                    <ShoppingBag />
                    <div className="text-sm">Add To Cart </div>
                  </button>
                  {/* <div
                    onClick={() => setIsHeartFull(!isHeartFull)}
                    className="cursor-pointer rounded bg-gray-300 p-3 transition-colors duration-300 ease-in hover:bg-(--hunt-primary)"
                  >
                    <Heart
                      fill={isHeartFull ? "red" : "var(--hunt-bg)"}
                      strokeWidth={3}
                    />
                  </div> */}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { Link, useNavigate } from "react-router";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import StaticRatings from "@/components/ratings/StaticRatings";
import { useCartStore } from "@/stores/useCartStore";
import { displayName } from "@/utils/nameShortener";
import { productImage, productSrcSet, LISTING_SIZES } from "@/utils/cloudinary";
import { salePrice, round2 } from "@/utils/price";

const LOW_STOCK = 5;

export function ProductsGrid({ products }) {
  const navigate = useNavigate();
  const { getQuantity, addToCartData, updateCartData, deleteFromCart } =
    useCartStore();

  return (
    <div className="mx-auto mb-16 grid w-[90vw] max-w-7xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {products.map(([id, product]) => {
        const { title, thumbnail, price, discountPercentage, rating, reviews } =
          product;
        const stock = product.stock ?? 0;
        const quantity = getQuantity(id);
        const inCart = quantity > 0 && stock > 0;
        const soldOut = stock < 1;
        const sale = discountPercentage ? salePrice(price, discountPercentage) : null;
        const lowStock = !soldOut && stock <= LOW_STOCK;

        return (
          <article
            key={id}
            className="group relative flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-gray-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-(--hunt-primary)"
          >
            <Link
              to={`/shop/products/${id}`}
              className="relative block aspect-square bg-(--hunt-search-bg)"
            >
              <img
                src={productImage(thumbnail, 320)}
                srcSet={productSrcSet(thumbnail)}
                sizes={LISTING_SIZES}
                width={320}
                height={320}
                loading="lazy"
                decoding="async"
                alt={title}
                className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
              />
              {discountPercentage > 0 && (
                <span className="absolute top-2 left-2 rounded-md bg-(--hunt-primary) px-1.5 py-0.5 text-xs font-bold text-white shadow-sm">
                  -{Math.round(discountPercentage)}%
                </span>
              )}
              {lowStock && (
                <span className="absolute top-2 right-2 rounded-md bg-(--hunt-error) px-1.5 py-0.5 text-xs font-semibold text-white shadow-sm">
                  Only {stock} left
                </span>
              )}
              {soldOut && (
                <span className="absolute inset-0 flex items-center justify-center bg-white/70">
                  <span className="rounded-md bg-gray-900 px-2 py-1 text-xs font-semibold text-white">
                    Out of stock
                  </span>
                </span>
              )}
            </Link>

            <div className="flex flex-1 flex-col p-2.5 sm:p-3">
              <h3 className="mb-1 line-clamp-2 min-h-[2.5rem] text-left text-xs leading-snug font-semibold text-gray-800 sm:text-sm">
                <Link to={`/shop/products/${id}`} className="hover:underline">
                  {title}
                </Link>
              </h3>

              <div className="mb-2 flex items-center gap-1.5">
                <span className="flex items-center gap-0.5 text-xs">
                  <StaticRatings ratings={Math.round(rating)} size={12} />
                </span>
                <span className="text-[11px] text-gray-500">
                  {rating?.toFixed(1)} ({reviews?.length || 0})
                </span>
              </div>

              <div className="mt-auto flex items-baseline gap-1.5">
                <span className="font-pop text-base font-bold text-gray-900 sm:text-lg">
                  ${round2(sale ?? price).toFixed(2)}
                </span>
                {sale && (
                  <span className="text-xs text-gray-400 line-through">
                    ${price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="mt-2.5">
                {inCart ? (
                  <div className="flex items-center justify-between gap-1 rounded-lg bg-gray-100 p-1">
                    <button
                      aria-label={`Decrease quantity of ${title}`}
                      className="rounded-md! p-1.5! shadow-none! hover:bg-gray-200!"
                      onClick={() =>
                        quantity > 0
                          ? updateCartData(id, quantity - 1)
                          : deleteFromCart(id)
                      }
                    >
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="text-sm font-semibold">{quantity}</span>
                    <button
                      aria-label={`Increase quantity of ${title}`}
                      className="rounded-md! p-1.5! shadow-none! hover:bg-gray-200!"
                      onClick={() => updateCartData(id, quantity + 1)}
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={soldOut}
                    className="cta font-pop flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300! disabled:text-gray-500! disabled:shadow-none! disabled:hover:bg-gray-300! sm:text-sm"
                    onClick={() => {
                      toast.success(`${displayName(title)} added to cart`, {
                        action: (
                          <button
                            className="cta ml-auto rounded-md"
                            onClick={() => navigate("/shop/cart")}
                          >
                            View Cart
                          </button>
                        ),
                      });
                      addToCartData({
                        id,
                        title,
                        price: round2(sale ?? price),
                        image: product.images[0],
                        stock,
                        quantity: Math.min(getQuantity(id) + 1, stock),
                      });
                    }}
                  >
                    <ShoppingBag size={14} />
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

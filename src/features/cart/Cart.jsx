import { useState } from "react";
import { useCartStore } from "@/stores/useCartStore";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/utils/utils";
import { round2 } from "@/utils/price";

export function Cart() {
  const {
    cartData,
    updateCartData,
    deleteFromCart,
    getTotalQuantityOfItemsInCart,
    clearCart,
  } = useCartStore();
  const [summaryOpen, setSummaryOpen] = useState(false);
  const totalPrice = Object.values(cartData).reduce(
    (total, current) => total + round2(current.price) * current.quantity,
    0,
  );
  const cartLength = Object.values(cartData).length;
  const shippingFee = cartLength > 0 ? 6 * cartLength : 0;
  const tax = totalPrice * 0.07;
  const grandTotal = round2(totalPrice + shippingFee + tax);
  const totalQuantity = getTotalQuantityOfItemsInCart();
  if (totalQuantity === 0) {
    return (
      <div className="mx-auto -mt-20 flex min-h-screen flex-col items-center justify-center bg-(--hunt-search-bg) px-6 font-sans">
        <p className="p-4 text-center text-lg font-semibold text-(--hunt-text)">
          Your cart is empty!
        </p>
        <Link
          to="/shop"
          className="group flex items-center gap-2 rounded bg-(--hunt-primary-deep) p-3 font-semibold text-(--hunt-text) transition-colors hover:bg-gray-400"
        >
          Start Shopping
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    );
  }
  return (
    <div className="pb-40 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {Object.entries(cartData).map(([id, obj]) => (
              <div
                key={id}
                className="flex gap-3 border-b pb-4 font-sans text-gray-800 sm:gap-4"
              >
                <Link
                  to={`/shop/products/${id}`}
                  className="ease w-20 shrink-0 transition-transform duration-300 hover:scale-105 sm:w-24"
                >
                  <img
                    src={obj.image}
                    alt={obj.title}
                    className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <Link
                    to={`/shop/products/${id}`}
                    className="line-clamp-2 break-words font-semibold hover:underline"
                  >
                    {obj.title}
                  </Link>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="font-semibold">
                      ${round2(obj.price).toFixed(2)}
                    </span>
                    <div className="flex shrink-0 items-center gap-2 rounded border border-gray-300 p-1">
                      <button
                        aria-label={`Decrease quantity of ${obj.title}`}
                        className="cursor-pointer p-1 hover:bg-gray-100"
                        onClick={() => updateCartData(id, obj.quantity - 1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-6 text-center">{obj.quantity}</span>
                      <button
                        aria-label={`Increase quantity of ${obj.title}`}
                        className="cursor-pointer p-1 hover:bg-gray-100"
                        onClick={() => updateCartData(id, obj.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      aria-label={`Remove ${obj.title} from cart`}
                      className="cursor-pointer p-1 hover:text-red-500"
                      onClick={() => deleteFromCart(id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-semibold">
                    ${round2(round2(obj.price) * obj.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="fixed inset-x-0 bottom-20 z-20 border-t border-gray-200 bg-white font-sans text-gray-800 lg:sticky lg:top-14 lg:col-span-1 lg:h-fit lg:rounded-lg lg:border-0 lg:bg-gray-50 lg:p-6">
            <button
              type="button"
              onClick={() => setSummaryOpen((open) => !open)}
              aria-expanded={summaryOpen}
              aria-controls="order-summary-body"
              className="flex w-full items-center justify-between rounded-none! border-0! bg-transparent! p-4! shadow-none! hover:bg-gray-50! lg:hidden"
            >
              <span className="flex items-center gap-2 text-sm">
                <span className="font-semibold">
                  {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
                </span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500">Order summary</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  ${grandTotal.toFixed(2)}
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    "transition-transform duration-300",
                    summaryOpen && "rotate-180",
                  )}
                />
              </span>
            </button>
            <div
              id="order-summary-body"
              className={cn(
                "px-4 pb-4 lg:block lg:p-0",
                summaryOpen ? "block" : "hidden",
              )}
            >
              <h2 className="mb-4 hidden text-lg font-semibold lg:block">
                Order Summary
              </h2>
              <div className="space-y-3 border-b pb-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (7%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-white">
        <div className="mx-auto flex max-w-7xl gap-3 px-4 py-4 sm:gap-4">
          <Link
            to="/shop"
            className="group flex flex-1 items-center justify-center gap-2 rounded bg-(--hunt-primary-deep) p-3 font-semibold text-(--hunt-text) transition-colors hover:bg-gray-400"
          >
            <ArrowLeft
              size={16}
              className="hidden transition-transform group-hover:-translate-x-1 sm:block"
            />
            Back to shopping
          </Link>
          <Link
            to="/shop/checkout"
            onClick={clearCart}
            className="group flex flex-1 items-center justify-center gap-2 rounded bg-(--hunt-primary-deep) p-3 font-semibold text-(--hunt-text) transition-colors hover:bg-gray-400"
          >
            Checkout
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

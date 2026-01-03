import { useCartStore } from "@/stores/useCartStore";
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function Cart() {
  const {
    cartData,
    updateCartData,
    deleteFromCart,
    getTotalQuantityOfItemsInCart,
    clearCart,
  } = useCartStore();
  const totalPrice = Object.values(cartData).reduce(
    (total, current) => total + current.price * current.quantity,
    0,
  );
  const cartLength = Object.values(cartData).length;
  const shippingFee = cartLength > 0 ? 6 * cartLength : 0;
  const tax = totalPrice * 0.07;
  const grandTotal = totalPrice + shippingFee + tax;
  if (getTotalQuantityOfItemsInCart() === 0) {
    return (
      <div className="mx-auto -mt-20 flex min-h-screen flex-col items-center justify-center bg-(--hunt-search-bg) font-sans">
        <p className="p-4 font-sans text-lg font-semibold text-(--hunt-text)">
          Your cart is empty!
        </p>
        <button className="group flex items-center">
          <Link to="/shop">Start Shopping</Link>
          <div className="ml-2 inline-block transition-transform duration-300 ease-in group-hover:translate-x-1">
            <ArrowRight></ArrowRight>
          </div>
        </button>
      </div>
    );
  }
  return (
    <div className="pb-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {Object.entries(cartData).map(([id, obj]) => (
              <div
                key={id}
                className="flex gap-4 border-b pb-4 font-sans text-gray-800"
              >
                <Link
                  to={`/shop/products/${id}`}
                  className="ease w-24 flex-shrink-0 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={obj.image}
                    alt={obj.title}
                    className="h-24 w-24 object-contain"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <Link
                    to={`/shop/products/${id}`}
                    className="font-semibold hover:underline"
                  >
                    {obj.title}
                  </Link>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">${obj.price}</span>
                    <div className="flex items-center gap-2 rounded border border-gray-300 p-1">
                      <button
                        className="cursor-pointer p-1 hover:bg-gray-100"
                        onClick={() => updateCartData(id, obj.quantity - 1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-6 text-center">{obj.quantity}</span>
                      <button
                        className="cursor-pointer p-1 hover:bg-gray-100"
                        onClick={() => updateCartData(id, obj.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      className="cursor-pointer p-1 hover:text-red-500"
                      onClick={() => deleteFromCart(id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="font-semibold">
                    ${(obj.price * obj.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky top-12 h-fit rounded-lg bg-gray-50 p-6 font-sans text-gray-800 lg:col-span-1">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
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

      <div className="fixed right-0 bottom-0 left-0 border-t bg-white">
        <div className="mx-auto flex max-w-7xl gap-4 px-4 py-4">
          <Link
            to="/shop"
            className="group flex flex-1 items-center justify-center gap-2 rounded bg-(--hunt-primary-deep) p-3 font-semibold text-(--hunt-text) transition-colors hover:bg-gray-400"
          >
            <span className="ease transition-transform group-hover:-translate-x-1">
              <ArrowLeft size={16} />
            </span>
            Back to shopping
          </Link>
          <Link
            to="/shop/checkout"
            onClick={clearCart}
            className="group flex flex-1 items-center justify-center gap-2 rounded bg-(--hunt-primary-deep) p-3 font-semibold text-(--hunt-text) transition-colors hover:bg-gray-400"
          >
            Checkout
            <span className="ease transition-transform group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useCartStore } from "@/stores/useCartStore";
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function Cart() {
  const {
    cartData,
    updateCartData,
    deleteFromCart,
    getTotalQuantityOfItemsInCart,
  } = useCartStore();
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
    <div>
      <div className="mx-auto flex flex-col items-center justify-center bg-gray-50 font-sans text-gray-800">
        {Object.entries(cartData).map(([id, obj]) => (
          <div
            key={id}
            className="mb-4 grid grid-cols-3 items-center justify-between gap-4 border-b"
          >
            <Link
              to={`/shop/products/${id}`}
              className="ease w-24 transition-transform duration-300 hover:scale-105"
            >
              <img src={obj.image} alt={obj.title} />
            </Link>
            <Link to={`/shop/products/${id}`} className="font-semibold">
              {obj.title}
            </Link>
            <div className="flex items-center gap-4">
              <div>${obj.price}</div>
              <div
                className="cursor-pointer"
                onClick={() => updateCartData(id, obj.quantity - 1)}
              >
                <Minus></Minus>
              </div>
              <div>{obj.quantity}</div>
              <div
                className="cursor-pointer"
                onClick={() => updateCartData(id, obj.quantity + 1)}
              >
                <Plus></Plus>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => deleteFromCart(id)}
              >
                <Trash2></Trash2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-8 grid max-w-[1000px] grid-cols-2 items-center justify-center gap-4 px-4">
        <div className="group flex items-center justify-center gap-8 rounded bg-(--hunt-primary-deep) p-4 font-semibold text-(--hunt-text) hover:bg-gray-400">
          <span className="ease mr-2 inline-block transition-transform group-hover:-translate-x-1">
            <ArrowLeft size={16} />
          </span>
          Back to shopping
        </div>
        <div className="group flex items-center justify-center gap-8 rounded bg-(--hunt-primary-deep) p-4 font-semibold text-(--hunt-text) hover:bg-gray-400">
          Checkout
          <span className="ease ml-2 inline-block transition-transform group-hover:translate-x-1">
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </div>
  );
}

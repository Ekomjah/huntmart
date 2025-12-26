import { useCartStore } from "@/stores/useCartStore";
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";

export function Cart() {
  const { cartData, updateCartData, deleteFromCart } = useCartStore();

  return (
    <div>
      <div className="mx-auto flex flex-col items-center justify-center bg-gray-50 font-sans text-gray-800">
        {Object.entries(cartData).map(([id, obj]) => (
          <div
            key={id}
            className="mb-4 grid grid-cols-3 items-center justify-between gap-4 border-b"
          >
            <div className="w-24">
              <img src={obj.image} alt={obj.title} />
            </div>
            <div>{obj.title}</div>
            <div className="flex items-center gap-4">
              <div>${obj.price}</div>
              <Minus></Minus>
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

import { useCartStore } from "@/stores/useCartStore";
import { Minus, Plus, Trash2 } from "lucide-react";

export function Cart() {
  const { cartData } = useCartStore();

  return (
    <div>
      <div className="mx-auto flex flex-col items-center justify-center bg-gray-50 font-sans text-gray-800">
        {Object.entries(cartData).map(([id, obj]) => (
          <div
            key={id}
            className="mb-4 flex items-center justify-between gap-4 border-b p-4"
          >
            <div className="w-24">
              <img src={obj.image} alt={obj.title} />
            </div>
            <div>{obj.title}</div>
            <div className="flex items-center gap-4">
              <div>${obj.price}</div>
              <Minus></Minus>
              <div>{obj.quantity}</div>
              <Plus></Plus>
              <Trash2></Trash2>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button className="font-semibold hover:bg-gray-200">
          Back to shopping
        </button>
      </div>
    </div>
  );
}

import { useCartStore } from "@/stores/useCartStore";

export function Cart() {
  const { cartData } = useCartStore();

  return (
    <div className="mx-auto flex min-h-screen w-[90vw] max-w-[1000px] items-center justify-center bg-gray-50 font-sans text-gray-800">
      {Object.entries(cartData).map(([, obj]) => (
        <div key={obj.id}>{obj.title}</div>
      ))}
    </div>
  );
}

import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartData: localStorage.getItem("cartData")
    ? JSON.parse(localStorage.getItem("cartData"))
    : localStorage.setItem("cartData", JSON.stringify({})),
  addToCartData: (item) => {
    console.log("Adding to cart:", item.title);
    set((state) => ({
      cartData: { ...state.cartData, [item.id]: item },
    }));
    const updatedCartData = get().cartData;
    localStorage.setItem("cartData", JSON.stringify(updatedCartData));
  },
}));

export { useCartStore };

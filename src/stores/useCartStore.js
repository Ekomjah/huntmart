import { create } from "zustand";

const useCartStore = create((set) => ({
  cartData: {},
  addToCartData: (item) =>
    set((state) => ({
      cartData: { ...state.cartData, [item.id]: item },
    })),
}));

export { useCartStore };

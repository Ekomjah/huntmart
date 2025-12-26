import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartData: localStorage.getItem("cartData")
    ? JSON.parse(localStorage.getItem("cartData"))
    : localStorage.setItem("cartData", JSON.stringify({})),
  getQuantity: (id) => {
    const objectQuantity = get().cartData[id] && get().cartData[id]?.quantity;
    return objectQuantity ? objectQuantity : 0;
  },
  addToCartData: (item) => {
    console.log("Adding to cart:", item.title);
    set((state) => ({
      cartData: { ...state.cartData, [item.id]: item },
    }));
    const updatedCartData = get().cartData;
    localStorage.setItem("cartData", JSON.stringify(updatedCartData));
  },
  updateCartData: (id, quantity) => {
    set((state) => ({
      cartData: {
        ...state.cartData,
        [id]: { ...state.cartData[id], quantity },
      },
    }));
    const updatedCartData = get().cartData;
    localStorage.setItem("cartData", JSON.stringify(updatedCartData));
  },
  deleteFromCart: (id) => {
    set((state) => {
      const shallowCopyOfCartData = { ...state.cartData };
      delete shallowCopyOfCartData[id];
      return { cartData: shallowCopyOfCartData };
    });
    const updatedCartData = get().cartData;
    localStorage.setItem("cartData", JSON.stringify(updatedCartData));
  },
}));

export { useCartStore };

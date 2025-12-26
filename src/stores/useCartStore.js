import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartData: JSON.parse(localStorage.getItem("cartData") || "{}"),
  getQuantity: (id) => {
    const objectQuantity = get().cartData[id] && get().cartData[id]?.quantity;
    return objectQuantity ? objectQuantity : 0;
  },
  addToCartData: (item) => {
    if (!item || (typeof item.id !== "string" && typeof item.id !== "number")) {
      throw new Error(
        "Invalid item: Item must have a valid 'id' property of type string or number",
      );
    }
    console.log("Adding to cart:", item.title);
    set((state) => ({
      cartData: { ...state.cartData, [item.id]: item },
    }));
    const updatedCartData = get().cartData;
    localStorage.setItem("cartData", JSON.stringify(updatedCartData));
  },
  updateCartData: (id, quantity) => {
    if (typeof quantity !== "number" || quantity < 0) {
      throw new Error(
        "Invalid quantity: Quantity must be a non-negative number",
      );
    }
    if (!get().cartData[id]) {
      throw new Error(`Item with ID ${id} does not exist in the cart`);
    }
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
  getTotalQuantityOfItemsInCart: () => {
    const cartData = get().cartData;
    const totalQuantity = Object.values(cartData).reduce(
      (total, item) => total + (parseInt(item.quantity) ?? 0),
      0,
    );
    console.log("totalQuantity", totalQuantity);  
    return totalQuantity;
  },
}));

export { useCartStore };

import { create } from "zustand";

const STORAGE_KEY = "cartData";

function readCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return parsed;
  } catch {
    return {};
  }
}

function persist(cartData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData));
  } catch {
    // Storage can be unavailable or full. The in-memory cart stays valid.
  }
}

const useCartStore = create((set, get) => ({
  cartData: readCart(),
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
    const stock = Number(item.stock);
    if (Number.isFinite(stock) && stock < 1) {
      throw new Error(`Item with ID ${item.id} is out of stock`);
    }
    set((state) => {
      const cartData = { ...state.cartData, [item.id]: item };
      persist(cartData);
      return { cartData };
    });
  },
  updateCartData: (id, quantity) => {
    if (!Number.isFinite(+quantity) || +quantity < 0) {
      throw new Error(
        "Invalid quantity: Quantity must be a non-negative number",
      );
    }
    if (!get().cartData[id]) {
      throw new Error(`Item with ID ${id} does not exist in the cart`);
    }
    set((state) => {
      if (+quantity === 0) {
        const cartData = { ...state.cartData };
        delete cartData[id];
        persist(cartData);
        return { cartData };
      }
      const clampedQuantity = Math.min(+quantity, +state.cartData[id].stock);
      const cartData = {
        ...state.cartData,
        [id]: { ...state.cartData[id], quantity: clampedQuantity },
      };
      persist(cartData);
      return { cartData };
    });
  },
  deleteFromCart: (id) => {
    set((state) => {
      const cartData = { ...state.cartData };
      delete cartData[id];
      persist(cartData);
      return { cartData };
    });
  },
  clearCart: () => {
    set(() => {
      const cartData = {};
      persist(cartData);
      return { cartData };
    });
  },
  getTotalQuantityOfItemsInCart: () => {
    const cartData = get().cartData;
    const totalQuantity = Object.values(cartData).reduce((total, item) => {
      const quantity = parseInt(item.quantity);
      return total + (Number.isFinite(quantity) ? quantity : 0);
    }, 0);
    return totalQuantity;
  },
}));

// Keep duplicate tabs in step with each other.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      useCartStore.setState({ cartData: readCart() });
    }
  });
}

export { useCartStore };

import { create } from "zustand";

const useBear = create((set) => ({
  bears: 0,
  increaseBearsCounter: () => set((state) => ({ bears: state.bears + 1 })),
  reduceBearsCounter:   () => set((state) => ({ bears: state.bears - 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export { useBear };

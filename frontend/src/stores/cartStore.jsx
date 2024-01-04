//THIS NEEDS FIXING
//TODO: fix remove and clear cart functions!
import { create } from "zustand";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

export const cartStore = create((set) => ({
  cart: loadCartFromLocalStorage(),
  addToCart: (item) =>
    set((state) => {
      const newCart = [...state.cart, item];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),
  removeFromCart: (index) =>
    set((state) => ({ cart: state.cart.filter((_, i) => i !== index) })),
  clearCart: () => set({ cart: [] }),
}));
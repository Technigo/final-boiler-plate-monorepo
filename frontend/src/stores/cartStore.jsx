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
    set((state) => {
      const newCart = state.cart.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),
  clearCart: () =>
    set((state) => {
      localStorage.removeItem("cart"); // Remove the cart key from local storage
      return { cart: [] };
    }),
    calculateTotalPrice: () =>
        set((state) => {
        const total = state.cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);
        const freeDelivery = total > 50;
        return { total, freeDelivery };
        }),
}));
import { create } from "zustand";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

export const cartStore = create((set) => ({
  cart: loadCartFromLocalStorage(),
  numberOfProducts: loadCartFromLocalStorage()
    .map((item) => item.quantity || 1) // Default to 1 of quantity is undefined.
    .reduce((acc, quantity) => acc + quantity, 0),
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.findIndex(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItem] = {
          ...updatedCart[existingItem],
          quantity: updatedCart[existingItem].quantity + 1,
        };
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        const newNumberOfProducts = updatedCart
          .map((item) => item.quantity || 1)
          .reduce((acc, quantity) => acc + quantity, 0);
        return { cart: updatedCart, numberOfProducts: newNumberOfProducts };
      } else {
        const newCart = [...state.cart, { ...item, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(newCart));
        const newNumberOfProducts = newCart
          .map((item) => item.quantity || 1)
          .reduce((acc, quantity) => acc + quantity, 0);
        return { cart: newCart, numberOfProducts: newNumberOfProducts };
      }
    }),
  addByIndexToCart: (index) =>
    set((state) => {
      const itemToAdd = state.cart[index];
      if (itemToAdd) {
        const updatedCart = [...state.cart];
        const existingItemIndex = updatedCart.findIndex(
          (cartItem) => cartItem._id === itemToAdd._id
        );
        if (existingItemIndex !== -1) {
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + 1,
          };
        } else {
          updatedCart.push({ ...itemToAdd, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        const newNumberOfProducts = updatedCart
          .map((item) => item.quantity || 1)
          .reduce((acc, quantity) => acc + quantity, 0);

        return { cart: updatedCart, numberOfProducts: newNumberOfProducts };
      }
      return state; // Return the unchanged state if item is not found
    }),
  removeFromCart: (index) =>
    set((state) => {
      const itemToRemove = state.cart[index];
      if (itemToRemove.quantity > 1) {
        const updatedCart = [...state.cart];
        updatedCart[index] = {
          ...itemToRemove,
          quantity: itemToRemove.quantity - 1,
        };
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        const newNumberOfProducts = updatedCart
          .map((item) => item.quantity || 1)
          .reduce((acc, quantity) => acc + quantity, 0);
        return { cart: updatedCart, numberOfProducts: newNumberOfProducts };
      } else {
        const newCart = state.cart.filter((_, i) => i !== index);
        localStorage.setItem("cart", JSON.stringify(newCart));
        const newNumberOfProducts = newCart
          .map((item) => item.quantity || 1)
          .reduce((acc, quantity) => acc + quantity, 0);
        return { cart: newCart, numberOfProducts: newNumberOfProducts };
      }
    }),
  clearCart: () =>
    set((state) => {
      localStorage.removeItem("cart"); // Remove the cart key from local storage
      return { cart: [], numberOfProducts: 0 };
    }),
  calculateTotalPrice: () =>
    set((state) => {
      const total = state.cart
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);
      const deliveryCost = total === "0.00" || parseFloat(total) > 60 ? 0 : 9;
      const totalWithDelivery = (parseFloat(total) + deliveryCost).toFixed(2);
      return { total, totalWithDelivery, deliveryCost };
    }),
}));

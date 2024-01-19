import { create } from "zustand";

// Zustand store for navigation
export const useNavStore = create((set) => ({
  activePage: "home", // State for active page
  setActivePage: (page) => set({ activePage: page }), // Function to set active page

  // State for hamburger menu
  burgerMenuVisible: true,
  setBurgerMenuVisible: (isVisible) => set({ burgerMenuVisible: isVisible }),

  burgerMenuOpen: false, // State for open/closed hamburger menu
  setBurgerMenuOpen: (isOpen) => set({ burgerMenuOpen: isOpen }),
}));

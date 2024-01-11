import { create } from "zustand";

// Zustand store for navigation
export const useNavStore = create((set) => ({
  activePage: "home",
  setActivePage: (page) => set({ activePage: page }),

  burgerMenuVisible: true,
  setBurgerMenuVisible: (isVisible) => set({ burgerMenuVisible: isVisible }),

  burgerMenuOpen: false, // State for burger menu
  setBurgerMenuOpen: (isOpen) => set({ burgerMenuOpen: isOpen }),
}));
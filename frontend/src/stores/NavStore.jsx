import { create } from "zustand";

export const useNavStore = create((set) => ({
  activePage: "home",
  setActivePage: (page) => set({ activePage: page }),
}));

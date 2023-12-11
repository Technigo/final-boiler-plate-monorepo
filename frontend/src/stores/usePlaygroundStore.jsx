// playgroundStore.js
import create from "zustand";

const playgroundAPI = `https://catalog.eslov.se/rowstore/dataset/08b5e92d-7bc7-41de-aa56-f67f6662e919`;

const usePlaygroundStore = create((set) => ({
  playgrounds: [],
  fetchPlaygrounds: async () => {
    try {
      const response = await fetch(playgroundAPI);
      const data = await response.json();
      const playgrounds = data.results.map((playground) => ({
        name: playground.name,
        description: playground.description
      }));
      set({ playgrounds });
    } catch (error) {
      console.error("Error fetching playgrounds:", error);
    }
  },
}));

export default usePlaygroundStore;

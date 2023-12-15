// playgroundStore.js
import {create} from "zustand";

const playgroundAPI = `https://catalog.eslov.se/rowstore/dataset/08b5e92d-7bc7-41de-aa56-f67f6662e919`;

const usePlaygroundStore = create((set) => ({
  playgrounds: [],
  playgroundDetails: null,
  fetchPlaygrounds: async () => {
    try {
      const response = await fetch(playgroundAPI);
      const data = await response.json();
      const playgrounds = data.results.map((playground) => ({
        name: playground.name,
        description: playground.description,
        id: playground.id
      }));
      set({ playgrounds });
    } catch (error) {
      console.error("Error fetching playgrounds:", error);
    }
  },
  getPlaygroundDetails: async (id) => {
    try {
      const response = await fetch(`${playgroundAPI}?id=${id}&_limit=1&_offset=0`);
      
      if (!response.ok) {
        throw new Error(`Error fetching playground details: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data || !data.results || data.results.length === 0) {
        throw new Error("Empty response or invalid JSON format");
      }

      const playgroundDetails = {
        name: data.results[0].name,
        description: data.results[0].description,
        city: data.results[0].city,
        street: data.results[0].street,
        postcode: data.results[0].postcode,
        wheelchair: data.results[0].wheelchair,
        roundabout: data.results[0].roundabout,
        zipwire: data.results[0].zipwire,
        swing: data.results[0].swing,
        slide: data.results[0].slide,
        basketswing: data.results[0].basketswing,
        sandpit: data.results[0].sandpit

        // Add other details you want to fetch
      };
      set({ playgroundDetails });
    } catch (error) {
      console.error("Error fetching playground details:", error.message);
      // You might want to set an error state or handle this in your component
    }
  },
  likePlayground: () => {
    set((state) => ({ isLiked: !state.isLiked }));
  },
}));

export default usePlaygroundStore;

import { create } from "zustand";

// Get the backend API endpoint from the environment variables.
const apiEnv = import.meta.env.VITE_BACKEND_API_PLANTS;

export const plantStore = create((set, get) => ({
  isLoading: false,
  plants: [],
  singlePlant: {},
  selectedCategory: null,
  setIsLoading: (loading) => set({ isLoading: loading }),
  setPlants: (plants) => set({ plants }),
  setSinglePlant: (singlePlant) => set({ singlePlant }),
  setApiEndpoint: (endpoint) => set({ apiEndpoint: endpoint }),

  fetchPlants: async (endpoint) => {
    try {
      set({ isLoading: true });
      const response = await fetch(apiEnv + endpoint, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        set({ plants: data, isLoading: false });
      } else {
        console.error("Failed to fetch plants");
        set({ isLoading: false });
      }
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },
  fetchPlantsByCategory: async (category) => {
    let endpoint;
    switch (category) {
      case "shade-loving":
        endpoint = `/category/shady`;
        break;
      case "easy":
        endpoint = `/category/easy`;
        break;
      case "pet-friendly":
        endpoint = `/category/pet-friendly`;
        break;
      case "climbing":
        endpoint = `/category/climbing`;
        break;
      case "popular":
        endpoint = `/category/popular`;
        break;
      default:
        endpoint = ``;
    }

    set({
      selectedCategory: category,
    });

    try {
      await get().fetchPlants(endpoint);
    } catch (error) {
      console.error("Error fetching plants", error);
    }
  },
  fetchSinglePlant: async () => {
    try {
      const response = await fetch(get().apiEndpoint);
      if (response.ok) {
        const data = await response.json();
        set({ singlePlant: data });
      } else {
        console.error("Failed to fetch plant product");
      }
    } catch (error) {
      console.error(error);
    }
  },
  fetchPlantsByIds: async (plantIds) => {
    try {
      // Ensure that fetchPlants is completed before proceeding
      await get().fetchPlants("");

      const allPlants = get().plants;

      const filteredPlants = allPlants.filter((plant) =>
        plantIds.includes(plant.plantID)
      );

      set({ plants: filteredPlants });
    } catch (error) {
      console.error("Error fetching plants by IDs", error);
    }
  },
}));

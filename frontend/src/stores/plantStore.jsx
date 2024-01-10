// Import the 'create' function from the 'zustand' library.
import { create } from "zustand";

// Import the userStore to access user-related data
//WE DONT NEED THIS?
//import { userStore } from "./userStore";

// Get the backend API endpoint from the environment variables.
// const apiEnv = import.meta.env.VITE_BACKEND_API;
const apiEnv = "https://plants-holm-witting-backend.onrender.com/api/plants";

export const plantStore = create((set, get) => ({
  plants: [],
  singlePlant: {},

  //apiEndpoint: `${apiEnv}`, // Default API endpoint
  selectedCategory: null,

  setPlants: (plants) => set({ plants }),
  setSinglePlant: (singlePlant) => set({ singlePlant }),
  setApiEndpoint: (endpoint) => set({ apiEndpoint: endpoint }),

  fetchPlants: async (endpoint) => {
    try {
      const response = await fetch(apiEnv + endpoint, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        set({ plants: data });
        console.log("plantsdata fetch:", data);
      } else {
        console.error("Failed to fetch plants");
      }
    } catch (error) {
      console.error(error);
    }
  },
  fetchPlantsByCategory: async (category) => {
    let endpoint;
    switch (category) {
      case "shade-loving":
        endpoint = `/category/shade-loving`;
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

    set({ selectedCategory: category, 
    //  apiEndpoint: endpoint 
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
        console.log("singlePlant data fetch:", data);
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
      console.log("Plants data fetch by IDs:", filteredPlants);
    } catch (error) {
      console.error("Error fetching plants by IDs", error);
    }
  },
}));

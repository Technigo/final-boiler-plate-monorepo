// Import the 'create' function from the 'zustand' library.
import { create } from "zustand";

// Import the userStore to access user-related data
import { userStore } from "./userStore";

// Get the backend API endpoint from the environment variables.
const apiEnv = import.meta.env.VITE_BACKEND_API;

export const plantStore = create((set, get) => ({
  plants: [],
  apiEndpoint: `${apiEnv}/plants`, // Default API endpoint

  setPlants: (plants) => set({ plants }),
  setApiEndpoint: (endpoint) => set({ apiEndpoint: endpoint }),

  fetchPlants: async () => {
    try {
      const response = await fetch(get().apiEndpoint, {
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
}));

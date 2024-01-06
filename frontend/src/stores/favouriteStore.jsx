

import { create } from "zustand";

const apiEnv = "https://plants-holm-witting-backend.onrender.com/api/favourites";



export const favouriteStore = create((set) => ({
    favourites: [],
    setFavourites: (favourites) => set({ favourites }),

    apiEndpoint: `${apiEnv}`,

    fetchFavourites: async () => {
        try {
          const response = await fetch(`${apiEnv}/get-my-favourites`);
          if (response.ok) {
            const data = await response.json();
            set({ favourites: data });
            console.log("favourite data fetch:", data);
          } else {
            console.error("Failed to fetch favourites");
          }
        } catch (error) {
          console.error(error);
        }
    },

}))
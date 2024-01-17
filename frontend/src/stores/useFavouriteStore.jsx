import { create } from "zustand";

const apiEnv = "http://localhost:8080/api/favourites";
//"https://plants-holm-witting-backend.onrender.com/api/favourites";

export const favouriteStore = create((set) => ({
  isLoading: false,
  favourites: [],

  setFavourites: (favourites) => set({ favourites }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  apiEndpoint: `${apiEnv}`,

  fetchFavourites: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch(`${apiEnv}/get-my-favourites`);
      if (response.ok) {
        const data = await response.json();
        set({ favourites: data, isLoading: false });
        console.log("favourite data fetch:", data);
      } else {
        console.error("Failed to fetch favourites");
        set({ isLoading: false });
      }
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },
  addToFavourites: async (plantId) => {
    try {
      set({ isLoading: true });
      const response = await fetch(`${apiEnv}/add-favourite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourAccessToken}`,
        },
        body: JSON.stringify({ _id: plantId }),
      });

      if (response.ok) {
        set((state) => ({
          favourites: [...state.favourites, plantId],
          isLoading: false,
        }));
        console.log("Plant added to favourites");
      } else {
        console.error("Failed to add plant to favourites");
        set({ isLoading: false });
      }
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },
}));

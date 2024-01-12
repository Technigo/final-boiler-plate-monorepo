/*import { create } from "zustand";
//import { adminStore } from './adminStore'; //keep in case of need for tokens 

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const cocktailStore = create((set) => ({
    // Cocktail state variables
    cocktails: [],
    isLoading: false,
    errorMessage: "",

    // Functions to fetch, add, update, and delete cocktails
    fetchCocktails: async () => {
        set({ isLoading: true, errorMessage: "" });
        try {
            const response = await fetch(`${apiEnv}/cocktails`, {
                method: "GET",
            });
            const data = await response.json();
            if (response.ok) {
                set({ cocktails: data });
            } else {
                throw new Error(data.message || "Failed to fetch cocktails");
            }
        } catch (error) {
            console.error("Error fetching cocktails:", error);
            set({ errorMessage: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    addCocktail: async (formData) => {
        set({ isLoading: true, errorMessage: "" });
        try {
            const response = await fetch(`${apiEnv}/cocktails`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                set((state) => ({ cocktails: [...state.cocktails, data] }));
            } else {
                throw new Error(data.message || "Failed to add cocktail");
            }
        } catch (error) {
            console.error("Error adding cocktail:", error);
            set({ errorMessage: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    updateCocktail: async (id, formData) => {
        set({ isLoading: true, errorMessage: "" });
        try {
            const response = await fetch(`${apiEnv}/cocktails/${id}`, {
                method: "PUT",
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                set((state) => ({
                    cocktails: state.cocktails.map((cocktail) =>
                        cocktail._id === id ? data : cocktail
                    ),
                }));
            } else {
                throw new Error(data.message || "Failed to update cocktail");
            }
        } catch (error) {
            console.error("Error updating cocktail:", error);
            set({ errorMessage: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteCocktail: async (id) => {
        set({ isLoading: true, errorMessage: "" });
        try {
            const response = await fetch(`${apiEnv}/cocktails/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                set((state) => ({
                    cocktails: state.cocktails.filter((cocktail) => cocktail._id !== id),
                }));
            } else {
                const data = await response.json();
                throw new Error(data.message || "Failed to delete cocktail");
            }
        } catch (error) {
            console.error("Error deleting cocktail:", error);
            set({ errorMessage: error.message });
        } finally {
            set({ isLoading: false });
        }
    }
}));
*/
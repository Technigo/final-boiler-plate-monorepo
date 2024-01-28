import { create } from "zustand";
import { adminLoginStore } from './adminLoginStore'; // Import the adminLoginStore

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const cocktailStore = create((set, get) => ({
    cocktails: [],
    isLoading: false,
    errorMessage: "",

    // Function to fetch all cocktails
    fetchCocktails: async () => {
        set({ isLoading: true, errorMessage: "" });
        const token = get(adminLoginStore).accessToken || localStorage.getItem("adminToken");

        try {
            const response = await fetch(`${apiEnv}/cocktails`, {
                method: "GET",
                headers: token ? { "Authorization": `Bearer ${token}` } : {},
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

    // Function to add new cocktails
    addCocktail: async (formData) => {
        set({ isLoading: true, errorMessage: "" });
        const token = get(adminLoginStore).accessToken || localStorage.getItem("adminToken");
        try {
            const response = await fetch(`${apiEnv}/cocktails`, {
                method: "POST",
                headers: token ? { "Authorization": `Bearer ${token}` } : {},
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

    // Function to update cocktails
    updateCocktail: async (id, formData) => {
        set({ isLoading: true, errorMessage: "" });
        const token = get(adminLoginStore).accessToken || localStorage.getItem("adminToken");
        try {
            const response = await fetch(`${apiEnv}/cocktails/${id}`, {
                method: "PUT",
                headers: token ? { "Authorization": `Bearer ${token}` } : {},
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

    // Function to delete cocktails
    deleteCocktail: async (id) => {
        set({ isLoading: true, errorMessage: "" });
        const token = get(adminLoginStore).accessToken || localStorage.getItem("adminToken");
        try {
            const response = await fetch(`${apiEnv}/cocktails/${id}`, {
                method: "DELETE",
                headers: token ? { "Authorization": `Bearer ${token}` } : {},
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
    },
}));

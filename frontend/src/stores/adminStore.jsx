import { create } from "zustand";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const adminStore = create((set) => ({
    // Initialize state variables for admin
    username: "",
    setPassword: (password) => set({ password }),
    accessToken: null,
    isLoggedIn: false,

    // Setters for state variables
    setUsername: (username) => set({ username }),
    setAccessToken: (token) => set({ accessToken: token }),
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

    // Function to handle admin login
    handleAdminLogin: async (username, password) => {
        if (!username || !password) {
            alert("Please enter both username and password");
            return;
        }

        try {
            const response = await fetch(`${apiEnv}/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (data.success) {
                set({
                    username,
                    accessToken: data.response.token,
                    isLoggedIn: true,
                });
                localStorage.setItem("adminToken", data.response.token);
                alert("Admin login successful!");
            } else {
                alert(data.response || "Admin login failed");
            }
        } catch (error) {
            console.error("Admin login error:", error);
            alert("An error occurred during admin login");
        }
    },

    // Function to handle admin logout
    handleAdminLogout: () => {
        set({ username: "", accessToken: null, isLoggedIn: false });
        localStorage.removeItem("adminToken");
    },


    // Functions to fetch, add, update, and delete cocktails
    fetchCocktails: async () => {
        set({ isLoading: true, errorMessage: "" });
        try {
            const response = await fetch(`${apiEnv}/cocktails`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${get().accessToken}` },
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
                headers: { "Authorization": `Bearer ${get().accessToken}` },
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
                headers: { "Authorization": `Bearer ${get().accessToken}` },
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
                headers: { "Authorization": `Bearer ${get().accessToken}` },
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
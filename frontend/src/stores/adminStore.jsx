import { create } from "zustand";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const adminStore = create((set, get) => {
    const savedToken = localStorage.getItem("adminToken");

    return {
        // Initialize state variables for admin
        username: "",
        password: "",
        accessToken: savedToken || null,
        isLoggedIn: !!savedToken,
        cocktails: [],
        isLoading: false,
        errorMessage: "",

        // Setters for state variables
        setUsername: (username) => set({ username }),
        setPassword: (password) => set({ password }),
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
            set({ username: "", accessToken: null, isLoggedIn: false, password: "" });
            localStorage.removeItem("adminToken");
        },




        ////////////////// MANAGE ADMIN REGISTRATION //////////////////
        registerNewAdmin: async (username, password, email) => {
            set({ isLoading: true, errorMessage: "" });
            const token = get().accessToken;

            try {
                const response = await fetch(`${apiEnv}/admin/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { "Authorization": `Bearer ${token}` })
                    },
                    body: JSON.stringify({ username, password, email }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert('Admin registered successfully!');
                    // Optionally, update state or perform other actions upon success
                } else {
                    throw new Error(data.message || 'Admin registration failed');
                }
            } catch (error) {
                console.error('Admin registration error:', error);
                set({ errorMessage: error.message });
            } finally {
                set({ isLoading: false });
            }
        },




        upgradeUserToAdmin: async (userId) => {
            const token = get().accessToken;
            try {
                const response = await fetch(`${apiEnv}/admin/upgradeUser`, {
                    method: "POST",
                    headers: token ? { "Authorization": `Bearer ${token}` } : {},
                    body: JSON.stringify({ userId }),
                });

                const data = await response.json();
                if (data.success) {
                    alert('User upgraded to admin successfully!');
                } else {
                    alert(data.message || 'Failed to upgrade user');
                }
            } catch (error) {
                console.error('User upgrade error:', error);
                alert('An error occurred during user upgrade');
            }
        },





        ////////////////// MANAGE COCKTAILS ///////////////////
        fetchCocktails: async () => {
            set({ isLoading: true, errorMessage: "" });
            const token = get().accessToken;
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

        addCocktail: async (formData) => {
            set({ isLoading: true, errorMessage: "" });
            const token = get().accessToken;
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

        updateCocktail: async (id, formData) => {
            set({ isLoading: true, errorMessage: "" });
            const token = get().accessToken;
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

        deleteCocktail: async (id) => {
            set({ isLoading: true, errorMessage: "" });
            const token = get().accessToken;
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
        }
    }
});

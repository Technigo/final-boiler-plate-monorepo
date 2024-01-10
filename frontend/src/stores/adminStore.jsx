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
}));
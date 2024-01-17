import { create } from "zustand"; // Import the create function from the zustand library.

const userApi = "http://localhost:8080/api/users";

//import.meta.env.VITE_USER_API;

export const userStore = create((set, get) => ({
  isLoading: false,
  username: "",
  password: "",
  email: "",
  accessToken: "",
  isLoggedIn: false,
  errorMessage: "",

  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setEmail: (email) => set({ email }),
  setAccessToken: (token) => set({ accessToken: token }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setErrorMessage: (errorMessage) => set({ errorMessage: errorMessage }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  register: async (username, password, email) => {
    if (!username || !password || !email) {
      alert("Please enter username, email, and password");
      return;
    }

    try {
      set({ isLoading: true });
      const response = await fetch(`${userApi}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        const data = await response.json();
        set({ errorMessage: data.response.message, isLoading: false });
      }

      const data = await response.json();
      const successfullFetch = data.success;
      if (successfullFetch) {
        set({ username: username, email: email, isLoading: false });
        console.log("SUCCESSFULL REGISTRATION!!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup");
      set({ isLoading: false });
    }
  },

  login: async (username, password) => {
    if (!username || !password) {
      set({ errorMessage: "Please enter both username and password" });
      return;
    }

    try {
      set({ isLoading: true });
      const response = await fetch(`${userApi}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
        set({ isLoading: false });
      }

      const data = await response.json();
      const successfullFetch = data.success;

      if (successfullFetch) {
        set({ username: username, email: email, isLoading: false });
        console.log("SUCCESSFULL LOGIN!!");
      }
      // Saves the accessToken in localStorage
      localStorage.setItem("accessToken", data.response.accessToken);
      localStorage.setItem("username", username);
      localStorage.setItem("userId", data.response._id);
      localStorage.setItem("isLoggedIn", true);
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  logout: async () => {
    set({ error: null }); // Reset the error state
    try {
      set({ isLoading: true });
      const response = await fetch(`${userApi}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
        set({ isLoading: false });
      }

      set({ user: null, isLoggedIn: false, isLoading: false });
      return "Logout successful"; // Return a success message
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

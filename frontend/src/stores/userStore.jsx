import { create } from "zustand";

// Get the backend API endpoint from the environment variables.
const apiEnv = import.meta.env.VITE_BACKEND_API;

// Create a Zustand store for user-related state and actions.
export const userStore = create((set, get) => ({
  // Get the username from localStorage if it exists.
  username: localStorage.getItem("username") || "",

  // Define a function to set the username state.
  setUsername: (username) => set({ username }),

  // Initialize password state.
  password: "",
  // Define a function to set the password state.
  setPassword: (password) => set({ password }),

  // Initialize email state.
  email: "",
  // Define a function to set the email state.
  setEmail: (email) => set({ email }),

  // Initialize accessToken state with null.
  accessToken: localStorage.getItem("accessToken") || null,
  // Define a function to set the accessToken state.
  setAccessToken: (token) => set({ accessToken: token }),

  // Initialize isLoggedIn state with false..
  isLoggedIn: localStorage.getItem("accessToken") ? true : false,
  // Define a function to set the isLoggedIn state.
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  // FUNCTION TO REGISTER USERS
  handleSignup: async (username, password, email) => {
    // Check if required fields are provided and display an alert if not.
    if (!username || !password || !email) {
      alert("Please enter username, password and email");
      return;
    }

    try {
      // Send a POST request to the registration endpoint with user data.
      const response = await fetch(`${apiEnv}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }), // Send user data as JSON string
      });

      // Parse the response data as JSON.
      const data = await response.json();
      if (data.success) {
        // Update the states.
        set({
          username,
          email,
          accessToken: data.response.accessToken,
          isLoggedIn: true,
        });
        // Store the accessToken in the browser's localStorage.
        localStorage.setItem("accessToken", data.response.accessToken);
        localStorage.setItem("username", username);
      } else {
        // Display an error message from the server or a generic message.
        alert(data.response || "Signup failed");
      }
    } catch (error) {
      // Handle any signup errors.
      alert("An error occurred during signup. Please try again.");
    }
  },

  // LOGIN
  handleLogin: async (username, password) => {
    // Check if both username and password are provided and display an alert if not.
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      // Send a POST request to the login endpoint with user data.
      const response = await fetch(`${apiEnv}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Parse the response data as JSON.
      const data = await response.json();
      if (data.success) {
        // Update the state with username, accessToken, and set isLoggedIn to true.
        set({
          username,
          accessToken: data.response.accessToken,
          isLoggedIn: true,
        });

        // Store the accessToken in the browser's localStorage.
        localStorage.setItem("accessToken", data.response.accessToken);
        localStorage.setItem("username", username);
      } else {
        // Display an error message from the server or a generic message.
        alert(data.response || "Login failed");
      }
    } catch (error) {
      // Handle any login errors.
      alert("An error occurred during login. Please try again.");
    }
  },

  // Function to handle user logout.
  handleLogout: () => {
    // Clear user information and set isLoggedIn to false.
    set({ username: "", accessToken: null, isLoggedIn: false });
    // Remove the accessToken from localStorage.
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
  },
}));

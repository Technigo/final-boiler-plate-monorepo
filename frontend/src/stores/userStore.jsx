// Import the 'create' function from the 'zustand' library.
import { create } from "zustand";

// Get the backend API endpoint from the environment variables.
const apiEnv = import.meta.env.VITE_BACKEND_API;

// Create a Zustand store for user-related state and actions.
export const userStore = create((set, get) => {
  // Get stored username and token from localStorage.
  const storedUsername = localStorage.getItem("username");
  const storedToken = localStorage.getItem("accessToken");

  return {
    // Initialize username state with stored value or an empty string.
    username: storedUsername || "",
    // Define a function to set the username state and store it in localStorage.
    setUsername: (username) => {
      set({ username });
      localStorage.setItem("username", username);
    },

    // ... (other state and actions)

    // Initialize accessToken state with stored value or null.
    accessToken: storedToken || null,
    // Define a function to set the accessToken state and store it in localStorage.
    setAccessToken: (token) => {
      set({ accessToken: token });
      localStorage.setItem("accessToken", token);
    },

    // ... (other state and actions)

    // Initialize isLoggedIn state with a boolean indicating whether there's a stored token.
    isLoggedIn: !!storedToken,
    // Define a function to set the isLoggedIn state.
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

    // ... (other state and actions)

    // FUNCTION TO REGISTER USERS
    handleSignup: async (username, password, email) => {
      // Check if required fields are provided and display an alert if not.
      if (!username || !password || !email) {
        alert("Please enter username, email, and password");
        return;
      }

      try {
        // Send a POST request to the registration endpoint with user data.
        const response = await fetch(`${apiEnv}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        });

        // Parse the response data as JSON.
        const data = await response.json();
        if (data.success) {
          // Update the username state and store it in localStorage.
          set({ username });
          localStorage.setItem("username", username);
          // Display a success alert.
          alert("Signup successful!");
          console.log("Signing up with:", username);
        } else {
          // Display an error message from the server or a generic message.
          alert(data.response || "Signup failed");
        }
      } catch (error) {
        // Handle and log any signup errors.
        console.error("Signup error:", error);
        alert("An error occurred during signup");
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
          // Display a success alert.
          alert("Login successful!");
          console.log("Logging in with:", username, password);
        } else {
          // Display an error message from the server or a generic message.
          alert(data.response || "Login failed");
        }
      } catch (error) {
        // Handle and log any login errors.
        console.error("Login error:", error);
        alert("An error occurred during login");
      }
    },

    // Function to handle user logout.
    handleLogout: () => {
      // Clear user information and set isLoggedIn to false.
      set({ username: "", accessToken: null, isLoggedIn: false });
      // Remove the accessToken and username from localStorage.
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      // Additional logout logic can be added here if needed.
    },
  };
});

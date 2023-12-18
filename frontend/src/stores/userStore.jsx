// Import the 'create' function from the 'zustand' library.
import { create } from "zustand";
import validator from "validator";

// Get the backend API endpoint from the environment variables.
const apiEnv = import.meta.env.VITE_BACKEND_API;

// Create a Zustand store for user-related state and actions.
export const userStore = create((set) => ({
  username: "",
  setUsername: (username) => set({ username }),

  email: "",
  setEmail: (email) => set({ email }),

  password: "",
  setPassword: (password) => set({ password }),

  consent: false,
  setConsent: (consent) => set({ consent }),

  location: "",
  setLocation: (location) => set({ location }),

  introduction: "",
  setIntroduction: (introduction) => set({ introduction }),

  products: [],
  setProducts: (products) => set({ products }),

  userId: null,
  setUserId: (userId) => set({ userId }),

  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),

  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  // FUNCTION TO REGISTER USERS
  handleSignup: async (username, password, email, consent) => {
    // Check if required fields are provided and display an alert if not.
    if (username.length < 5) {
      alert("Your username should have at least 5 characters");
    } else if (!validator.isEmail(email)) {
      alert("Please enter a valid email address");
    } else if (password.length < 5) {
      alert("Your password should have at least 5 characters");
    } else if (!username || !password || !email || (consent===false)) {
      alert("Please fill in all the fields");
    }

    try {
      // Send a POST request to the registration endpoint with user data.
      const response = await fetch(`${apiEnv}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, consent }),
      });

      // Parse the response data as JSON
      const data = await response.json();
      if (data.success) {
        // Update the username state
        set({ username, email, password, consent });
        // Display a success alert
        alert("Signup successful");
        console.log("Signing up with: ", username);
      }
    } catch (error) {
      // Handle and log any signup errors
      console.error("Signup error: ", error);
      alert("An error occurred during signup");
    }
  },

  // FUNCTION TO HANDLE USER LOGIN
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
        alert("Login successful");
        console.log("Logging in with: ", username, password);
      } else {
        // Display an error message from the server or a generic message.
        alert(data.response || "Login failed");
      }
    } catch (error) {
      // Handle and log any login errors.
      console.error("Login error: ", error);
      alert("An error occurred during login");
    }
  },

  // FUNCTION TO DISPLAY USER PROFILE
  handleProfileDisplay: async (isLoggedIn, userId) => {
    // Check if the user is logged in and display message if they are not
    if (!isLoggedIn) {
      alert("Please log in to see your profile");
    } else {
      try {
        // If they are logged in, send GET request to the user endpoint to retrieve user data
        const response = await fetch(`${apiEnv}/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        // Parse the response data as JSON.
        const data = await response.json();
        if (data.success) {
          // Update the state with the response data
          set({ data });
        }
      } catch (error) {
        // Handle and log any login errors.
        console.error("Profile display error: ", error);
        alert("User profile display failed");
      }
    }
  },

  // FUNCTION TO HANDLE USER PROFILE UPDATE
  handleProfileUpdate: async (isLoggedIn, userId, email, password, location, introduction, products) => {
    // Check if the user is logged in and display message if they are not
    if (!isLoggedIn) {
      alert("Please log in to update your profile");
    } else {
      // If they are logged in, send a POST request to the update endpoint with user data. 
      try { 
        const response = await fetch(`${apiEnv}/update/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, location, introduction, products }),
        });

        // Parse the response data as JSON.
        const data = await response.json();
        if (data.success) {
          // Update relevant states
          set({ 
            email, 
            password, 
            location, 
            introduction, 
            products 
          });
          // Display a success alert
          alert("User profile update successful");
        } else {
          // Display an error message from the server or a generic message
          alert(data.response || "User profile update failed");
        }
      } catch (error) {
        // Handle and log any login errors
        console.error("Profile update error: ", error);
        alert("An error occurred during profile update");
      }
    }
  },

  // FUNCTION TO HANDLE USER LOGOUT
  handleLogout: () => {
    // Clear user information and set isLoggedIn to false.
    set({ username: "", accessToken: null, isLoggedIn: false });
    // Remove the accessToken from localStorage.
    localStorage.removeItem("accessToken");
    // Additional logout logic can be added here if needed.
  },

  // FUNCTION TO HANDLE USER ACCOUNT DELETION
  handleAccountDeletion: () => {
    // Clear user information - to be doublechecked if this is deletion or just deactivation
    set({ 
      username: "", 
      email: "",
      password: "",
      consent: false,
      location: "",
      introduction: "",
      products: [],
      userId: null,
      accessToken: null, 
      isLoggedIn: false 
    });
    // Remove the accessToken from localStorage.
    localStorage.removeItem("accessToken");
    // Show an alert that the account has been deleted
    alert("Your account has been deleted. Feel free to create a new account anytime!");
  }
}));

// SUMMARY
// This file serves as the core of a React application's user authentication and state management system. It utilizes the Zustand library to create a centralized store that handles user-related data and actions. The store includes state variables such as username, email, password, accessToken, and isLoggedIn, each with corresponding functions to modify their values. The handleSignup function allows users to register by sending their information to a server-side registration endpoint, displaying alerts for success or failure. Similarly, the handleLogin function facilitates user login, updating the state with the user's credentials and access token upon success, and storing the token in the browser's local storage. Additionally, it handles the user's logout by clearing user information and local storage data. Overall, this file provides a robust framework for user authentication and state management in the React application, enhancing user registration, login, and logout processes.

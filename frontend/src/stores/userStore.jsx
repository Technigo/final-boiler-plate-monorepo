import { create } from "zustand"; // Import the create function from the zustand library.

const userApi = import.meta.env.VITE_USER_API;

export const userStore = create((set, get) => ({
  user: null,
  error: null,
  isLoggedIn: false,
  register: async (username, password, email) => {
    set({ error: null }); // Reset the error state
    try {
      const response = await fetch(`${userApi}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const user = await response.json();
      set({ user, isLoggedIn: true });
      return user; // Return the user data
    } catch (error) {
      set({ error: error.message });
    }
  },
  login: async (username, password) => {
    set({ error: null }); // Reset the error state
    try {
      const response = await fetch(`${userApi}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const user = await response.json();
      set({ user, isLoggedIn: true });
      return user; // Return the user data
    } catch (error) {
      set({ error: error.message });
    }
  },
  logout: async () => {
    set({ error: null }); // Reset the error state
    try {
      const response = await fetch(`${userApi}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      set({ user: null, isLoggedIn: false });
      return "Logout successful"; // Return a success message
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

// username: "",
// setUsername: (username) => set({ username }),
// email: "",
// setEmail: (email) => set({ email }),
// password: "",
// setPassword: (password) => set({ password }),

// isLoggedIn: false,
// setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
// error: null,
// setError: (error) => set({ error }),

// // REGISTER FUNCTION
// register: async (username, password, email) => {
//   try {
//     const response = await fetch(`${userApi}/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, username, password }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to register");
//     }

//     set({ isLoggedIn: true, username, email });
//   } catch (error) {
//     console.error("Failed to register", error);
//     set({ error: error.message });
//   }
// },

// // LOGIN FUNCTION
// login: async (username, password) => {
//   try {
//     const response = await fetch(`${userApi}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to log in");
//     }

//     set({ isLoggedIn: true, username });
//     return true; // Login was successful
//   } catch (error) {
//     console.error("Failed to log in:", error);
//     set({ error: error.message });
//     return false; // Login failed
//   }
// },

// // LOGOUT FUNCTION
// logout: async () => {
//   try {
//     const response = await fetch(`${userApi}/logout`, {
//       method: "POST",
//     });

//     if (!response.ok) {
//       throw new Error("Failed to log out");
//     }

//     set({ isLoggedIn: false, username: "", password: "" });
//   } catch (error) {
//     console.error("Failed to log out:", error);
//     set({ error: error.message });
//   }
// },

//   // FUNCTION TO REGISTER USERS
//   handleSignup: async (username, password, email) => {
//     // Check if required fields are provided and display an alert if not.
//     if (!username || !password || !email) {
//       alert("Please enter username, email, and password");
//       return;
//     }

//     try {
//       // Send a POST request to the registration endpoint with user data.
//       const response = await fetch(`${apiEnv}/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, username, password }),
//       });

//       // Parse the response data as JSON.
//       const data = await response.json();
//       if (data.success) {
//         // Update the username state.
//         set({ username });
//         // Display a success alert.
//         alert("Signup successful!");
//         console.log("Signing up with:", username);
//       } else {
//         // Display an error message from the server or a generic message.
//         alert(data.response || "Signup failed");
//       }
//     } catch (error) {
//       // Handle and log any signup errors.
//       console.error("Signup error:", error);
//       alert("An error occurred during signup");
//     }
//   },

//   // LOGIN
//   handleLogin: async (username, password) => {
//     // Check if both username and password are provided and display an alert if not.
//     if (!username || !password) {
//       alert("Please enter both username and password");
//       return;
//     }

//     try {
//       // Send a POST request to the login endpoint with user data.
//       const response = await fetch(`${apiEnv}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       // Parse the response data as JSON.
//       const data = await response.json();
//       if (data.success) {
//         // Update the state with username, accessToken, and set isLoggedIn to true.
//         set({
//           username,
//           accessToken: data.response.accessToken,
//           isLoggedIn: true,
//         });
//         // Store the accessToken in the browser's localStorage.
//         localStorage.setItem("accessToken", data.response.accessToken);
//         // Display a success alert.
//         alert("Login successful!");
//         console.log("Logging in with:", username, password);
//       } else {
//         // Display an error message from the server or a generic message.
//         alert(data.response || "Login failed");
//       }
//     } catch (error) {
//       // Handle and log any login errors.
//       console.error("Login error:", error);
//       alert("An error occurred during login");
//     }
//   },

//   // Function to handle user logout.
//   handleLogout: () => {
//     // Clear user information and set isLoggedIn to false.
//     set({ username: "", accessToken: null, isLoggedIn: false });
//     // Remove the accessToken from localStorage.
//     localStorage.removeItem("accessToken");
//     // Additional logout logic can be added here if needed.
//   },

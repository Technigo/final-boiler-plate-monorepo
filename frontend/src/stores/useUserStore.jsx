// import { create } from "zustand"; // Import the create function from the zustand library.
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_BACKEND_API;
// const withEndpoint = (endpoint) => `${API_BASE_URL}/api/auth/${endpoint}`;

// // Utility function to handle HTTP status code
// const handleResponseStatus = (response, successCallback, errorCallback) => {
//   if (response.status >= 200 && response.status < 300) {
//     successCallback(response.data);
//   } else {
//     errorCallback(response.status, response.data);
//   }
// };

// export const userStore = create((set, get) => ({
//   username: "",
//   password: "",
//   email: "",
//   isLoggedIn: false,
//   errorMessage: "",
//   isLoading: false,
//   isAuthenticated: false,

//   setUsername: (username) => set({ username }),
//   setPassword: (password) => set({ password }),
//   setEmail: (email) => set({ email }),
//   setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
//   setErrorMessage: (message) => set({ errorMessage: message }),
//   setIsLoading: (loading) => set({ isLoading: loading }),
//   setIsAuthenticated: (authenticated) =>
//     set({ isAuthenticated: authenticated }),

//   register: async (username, password, email) => {
//     if (!username || !password || !email) {
//       set({ errorMessage: "Please enter username, email, and password" });
//       return;
//     }

//     try {
//       set({ isLoading: true });
//       const response = await axios.post(withEndpoint("register"), {
//         username,
//         password,
//         email,
//       });

//       handleResponseStatus(
//         response,
//         (data) => {
//           // On successful registration, clear the input fields
//           set({ username: "", email: "", password: "", isLoading: false });
//         },
//         (status, errorData) => {
//           console.error("Unexpected status code during registration:", status);
//           set({ errorMessage: errorData.error.message });
//         }
//       );
//     } catch (error) {
//       console.error("Signup error:", error);

//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         set({ errorMessage: error.response.data.error.message });
//       } else if (error.request) {
//         // The request was made but no response was received
//         set({ errorMessage: "No response from server" });
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         set({ errorMessage: "Error in setting up the request" });
//       }
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   login: async (username, password) => {
//     if (!username || !password) {
//       set({ errorMessage: "Please enter both username and password" });
//       return;
//     }

//     try {
//       set({ isLoading: true });
//       const response = await axios.post(
//         withEndpoint("login"),
//         {
//           username,
//           password,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       handleResponseStatus(
//         response,
//         (data) => {
//           // On successful login, clear the input fields
//           set({ username: "", password: "", isLoading: false });
//           // Set authentication and loggedin status
//           set({ isAuthenticated: true, isLoggedIn: true });
//         },
//         (status, errorData) => {
//           console.error("Unexpected status code during login:", status);
//           set({ errorMessage: errorData.error.message });
//         }
//       );
//     } catch (error) {
//       console.error("Login error:", error);

//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         set({ errorMessage: error.response.data.error.message });
//       } else if (error.request) {
//         // The request was made but no response was received
//         set({ errorMessage: "No response from server" });
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         set({ errorMessage: "Error in setting up the request" });
//       }
//     } finally {
//       set({ isLoading: false });
//     }
//   },
//   logout: async () => {
//     try {
//       // Call the server to handle logout and clear the HttpOnly cookie
//       await axios.post(withEndpoint("logout"));

//       // Clear user information from state
//       set({
//         username: "",
//         isAuthenticated: false,
//         isLoggedIn: false,
//         isLoading: false,
//       });
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   },
// }));

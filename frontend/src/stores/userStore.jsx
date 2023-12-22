// Import the 'create' function from the 'zustand' library.
import { create } from "zustand";
import validator from "validator";
import Swal from "sweetalert2"; 

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

  isSignedup: false,
  setIsSignedup: (isSignedup) => set({ isSignedup }),

  isLoggedin: false,
  setIsLoggedin: (isLoggedin) => set({ isLoggedin }),

  // FUNCTION TO REGISTER USERS
  handleSignup: async (username, password, email, consent) => {
    // Check if required fields are provided, display an alert if not and exit the function immediately
    if (username.length < 5) {
      Swal.fire({
        title: "Error!",
        text: "Your username should have at least 5 characters",
        icon: "error"
      })
    } else if (!validator.isEmail(email)) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid email address",
        icon: "error"
      });
    } else if (password.length < 5) {
      Swal.fire({
        title: "Error!",
        text: "Your password should have at least 5 characters",
        icon: "error"
      });
    } else if (!username || !password || !email || !consent) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all the fields and agree to the terms and conditions",
        icon: "error"
      });
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
        set({
          username, 
          email,
          password, 
          consent,
          isSignedup: true
        });
        // Display a success alert
        Swal.fire({
          title: "Congratulations!",
          text: "Sign up successful",
          icon: "success"
        });
        console.log("Signing up with: ", username);
      } else {
        // Handle the case where the server responds with an error or user exists
        alert(data.response || "Sign up failed");
      }
    } catch (error) {
      // Handle and log any signup errors
      console.error("Sign up error: ", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred during signup",
        icon: "error"
      });
    }
  },

  // FUNCTION TO HANDLE USER LOGIN
  handleLogin: async (username, password) => {
    // Check if both username and password are provided and display an alert if not.
    if (!username || !password) {
      Swal.fire({
        title: "Error!",
        text: "Please enter both username and password",
        icon: "error"
      });
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
        // Update the state with username, accessToken, and set isLoggedin to true.
        set({
          username,
          accessToken: data.response.accessToken,
          isLoggedin: true,
        });
        // Store the accessToken in the browser's localStorage.
        localStorage.setItem("accessToken", data.response.accessToken);
        // Display a success alert.
        Swal.fire({
          title: "Congratulations!",
          text: "Log in successful",
          icon: "success"
        });
        console.log("Logging in with: ", username, password);
      } else {
        // Display an error message from the server or a generic message.
        alert(data.response || "Log in failed");
      }
    } catch (error) {
      // Handle and log any login errors.
      console.error("Log in error: ", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred during login",
        icon: "error"
      });
    }
  },

  // FUNCTION TO DISPLAY USER PROFILE
  handleProfileDisplay: async (isLoggedin, userId) => {
    // Check if the user is logged in and display message if they are not
    if (!isLoggedin) {
      Swal.fire({
        title: "Error!",
        text: "Please log in to see your profile",
        icon: "error"
      });
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
        } else {
          // Display an error message from the server or a generic message.
          alert(data.response || "User profile display failed");
        }
      } catch (error) {
        // Handle and log any login errors.
        console.error("Profile display error: ", error);
        Swal.fire({
          title: "Error!",
          text: "User profile display failed",
          icon: "error"
        });
      }
    }
  },

  // FUNCTION TO HANDLE USER PROFILE UPDATE
  handleProfileUpdate: async (isLoggedin, userId, email, password, location, introduction, products) => {
    // Check if the user is logged in and display message if they are not
    if (!isLoggedin) {
      Swal.fire({
        title: "Error!",
        text: "Please log in to update your profile",
        icon: "error"
      });
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
          Swal.fire({
            title: "Congratulations!",
            text: "User profile update successful",
            icon: "success"
          });
        } else {
          // Display an error message from the server or a generic message
          alert(data.response || "User profile update failed");
        }
      } catch (error) {
        // Handle and log any login errors
        console.error("Profile update error: ", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred during profile update",
          icon: "error"
        });
      }
    }
  },

  // FUNCTION TO HANDLE USER LOGOUT
  handleLogout: () => {
    // Clear user information and set isLoggedin to false.
    set({ username: "", accessToken: null, isLoggedin: false });
    // Remove the accessToken from localStorage.
    localStorage.removeItem("accessToken");
    // Additional logout logic can be added here if needed.
  },

  // FUNCTION TO HANDLE USER ACCOUNT DELETION
  handleAccountDeletion: () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete my account!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
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
          isLoggedin: false 
        });
        // Remove the accessToken from localStorage.
        localStorage.removeItem("accessToken");
        // Display confirmation message
        swalWithBootstrapButtons.fire({
          title: "We are sad to see you go...",
          text: "Your account has been deleted. Feel free to create a new account anytime!",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Thanks for staying with us :)",
          icon: "error"
        });
      }
    });
  }

  // Original code
    // Clear user information - to be doublechecked if this is deletion or just deactivation
    // set({ 
    //   username: "", 
    //   email: "",
    //   password: "",
    //   consent: false,
    //   location: "",
    //   introduction: "",
    //   products: [],
    //   userId: null,
    //   accessToken: null, 
    //   isLoggedin: false 
    // });
    // Remove the accessToken from localStorage.
    // localStorage.removeItem("accessToken");
    // Display confirmation message
    // alert("Your account has been deleted. Feel free to create a new account anytime!");
}));

// SUMMARY
// This file serves as the core of a React application's user authentication and state management system. It utilizes the Zustand library to create a centralized store that handles user-related data and actions. The store includes state variables such as username, email, password, accessToken, and isLoggedin, each with corresponding functions to modify their values. The handleSignup function allows users to register by sending their information to a server-side registration endpoint, displaying alerts for success or failure. Similarly, the handleLogin function facilitates user login, updating the state with the user's credentials and access token upon success, and storing the token in the browser's local storage. Additionally, it handles the user's logout by clearing user information and local storage data. Overall, this file provides a robust framework for user authentication and state management in the React application, enhancing user registration, login, and logout processes.

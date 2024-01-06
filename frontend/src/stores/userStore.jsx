// Import the 'create' function from the 'zustand' library.
import { create } from "zustand";
import validator from "validator";
import Swal from "sweetalert2"; 
import defaultProfileImage from "../assets/images/profile_icon.png";

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

  // products: [],
  // setProducts: (products) => set({ products }),

  image: defaultProfileImage,
  setImage: (image) => set({ image }),

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
      });
      return;
    } else if (!validator.isEmail(email)) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid email address",
        icon: "error"
      });
      return;
    } else if (password.length < 5) {
      Swal.fire({
        title: "Error!",
        text: "Your password should have at least 5 characters",
        icon: "error"
      });
      return;
    } else if (!username || !password || !email || !consent) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all the fields and agree to the terms and conditions",
        icon: "error"
      });
      return;
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
        Swal.fire({
          title: "Error!",
          text: data.response || "Sign up failed",
          icon: "error"
        }); 
        // alert(data.response || "Sign up failed");
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
        // Update the state with username, userId, accessToken, and set isLoggedin to true.
        set((state) => ({
          ...state,
          username,
          userId: data.response.id,
          accessToken: data.response.accessToken,
          isLoggedin: true
        }));
        // Store the accessToken and userId in the browser's localStorage.
        localStorage.setItem("accessToken", data.response.accessToken);
        localStorage.setItem("userId", data.response.id);
        // Display a success alert.
        Swal.fire({
          title: "Congratulations!",
          text: "Log in successful",
          icon: "success"
        });
        console.log("Logging in with: ", username, password);
      } else {
        // Display an error message from the server or a generic message.
        Swal.fire({
          title: "Error!",
          text: data.response || "Log in failed",
          icon: "error"
        });
        set({isLoggedin: false});
        return;
      }
    } catch (error) {
      // Handle and log any login errors.
      console.error("Log in error: ", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred during login",
        icon: "error"
      });
      set({ isLoggedin: false });
    }
  },

  // FUNCTION TO DISPLAY USER'S OWN PROFILE (for each user to see their profile settings)
  handleProfileDisplay: async (isLoggedin, userId) => {
    // Check if the user is logged in and display message if they are not
    if (!isLoggedin) {
      Swal.fire({
        title: "Error!",
        text: "Please log in to see the profile",
        icon: "error"
      });
      return;
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
          set((state) => ({
            ...state,
            username: data.response.username,
            email: data.response.email,
            location: data.response.location,
            introduction: data.response.introduction,
            // products: data.response.products,
            image: data.response.image 
          }));
          // Return the profile data for further use in the component
          return data.response;
        } else {
          // Display an error message from the server or a generic message.
          Swal.fire({
            title: "Error!",
            text: data.response || "User profile display failed",
            icon: "error"
          });
          return null;
          // alert(data.response || "User profile display failed");
        }
      } catch (error) {
        // Handle and log any errors.
        console.error("Profile display error: ", error);
        Swal.fire({
          title: "Error!",
          text: "User profile display failed",
          icon: "error"
        });
        return null;
      }
    }
  },

  // FUNCTION TO DISPLAY ADVERTISER'S PROFILE (for other users to see, no details about the advertiser's password or email)
  handleAdvertiserProfileDisplay: async (userId) => {
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
        set((state) => ({
          ...state,
          username: data.response.username,
          location: data.response.location,
          introduction: data.response.introduction,
          // products: data.response.products,
          image: data.response.image 
        }));
        // Return the profile data for further use in the component
        return data.response;
      } else {
        // Display an error message from the server or a generic message.
        Swal.fire({
          title: "Error!",
          text: data.response || "Advertiser profile display failed",
          icon: "error"
        });
        return null;
        // alert(data.response || "User profile display failed");
      }
    } catch (error) {
      // Handle and log any errors.
      console.error("Profile display error: ", error);
      Swal.fire({
        title: "Error!",
        text: "Advertiser profile display failed",
        icon: "error"
      });
      return null;
    }
  },

  // FUNCTION TO HANDLE USER'S OWN PROFILE UPDATE EXCEPT IMAGE (for each user to update their own profile settings)
  // handleProfileUpdate: async (isLoggedin, userId,  => {
  //   // Check if the user is logged in and display message if they are not
  //   if (!isLoggedin) {
  //     Swal.fire({
  //       title: "Error!",
  //       text: "Please log in to update your profile",
  //       icon: "error"
  //     });
  //     return;
  //   } 
    
  //   // If they are logged in, send a POST request to the update endpoint with user data. 
  //   const formData = new FormData();
  //   if (email) {
  //     formData.append("email", email);
  //   }

  //   if (password) {
  //     formData.append("password", password);
  //   }

  //   if (location) {
  //     formData.append("location", location);
  //   }

  //   if (introduction) {
  //     formData.append("introduction", introduction);
  //   }


  //   // formData.append("products", products);
  
  //   // Append image if it exists
  //   if (image) {
  //     formData.append("image", image);
  //   }

  //   try { 
  //     const response = await fetch(`${apiEnv}/users/${userId}`, {
  //       method: "PUT",
  //       body: formData,
  //     });

  //     // Parse the response data as JSON.
  //     const data = await response.json();
  //     console.log(data);
  //     if (data.success) {
  //       // Update relevant states
  //       set((state) => ({
  //         ...state,
  //         
  //         // password: data.response.password
  //       })
  //     );
  //       // Display a success alert
  //       Swal.fire({
  //         title: "Congratulations!",
  //         text: "User profile update successful",
  //         icon: "success"
  //       });
  //     } else {
  //       // Display an error message from the server or a generic message
  //       Swal.fire({
  //         title: "Error!",
  //         text: data.response || "User profile update failed",
  //         icon: "error"
  //       });
  //     }
  //   } catch (error) {
  //     // Handle and log any login errors
  //     console.error("Profile update error: ", error);
  //     Swal.fire({
  //       title: "Error!",
  //       text: "An error occurred during profile update",
  //       icon: "error"
  //     });
  //   }
  // },

  handleProfileUpdate: async (isLoggedin, userId, password, email, location, introduction) => {
    // Check if the user is logged in and display message if they are not
    if (!isLoggedin) {
      Swal.fire({
        title: "Error!",
        text: "Please log in to update your profile",
        icon: "error"
      });
      return;
    } 
    
    // If they are logged in, send a PUT request to the update endpoint with user data. 
    const formData = new FormData();
    if (password) {
      formData.append("password", password);
    }
    
    if (email) {
      formData.append("email", email);
    }

    if (location) {
      formData.append("location", location);
    }

    if (introduction) {
      formData.append("introduction", introduction);
    }

    // formData.append("products", products);
  
    try { 
      const response = await fetch(`${apiEnv}/users/${userId}`, {
        method: "PUT",
        body: formData,
      });

      // Parse the response data as JSON.
      const data = await response.json();
      console.log(data);
      if (data.success) {
        // Update relevant states
        set((state) => ({
          ...state,
          password: data.response.password,
          email: data.response.email,
          location: data.response.location,
          introduction: data.response.introduction
          // image: image
        })
      );
        // Display a success alert
        Swal.fire({
          title: "Congratulations!",
          text: "User profile update successful",
          icon: "success"
        });
      } else {
        // Display an error message from the server or a generic message
        Swal.fire({
          title: "Error!",
          text: data.response || "User profile update failed",
          icon: "error"
        });
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
  },

  // FUNCTION TO HANDLE USER'S IMAGE UPDATE (for each user to update their own image)
  handleImageUpdate: async (userId, selectedImage) => {
    try {    
      if (!selectedImage) {
        // Handle case where no image is selected
        console.error('No image selected for update');
        return;
      }

      let imageUrl, imageId;
      const formData = new FormData();
      formData.append("image", selectedImage);

      const imageResponse = await fetch(`${apiEnv}/update-image/${userId}`, {
        method: "PUT",
        body: formData,
      });

      // Parse the response data as JSON.
      const imageData = await imageResponse.json();
      console.log(imageData);
      if (imageData.success) {
        imageUrl = imageData.response.imageUrl;
        imageId = imageData.response.imageId;
        // Display a success alert
        Swal.fire({
          title: "Yay!",
          text: "Image update successful",
          icon: "success"
        });
        return imageUrl, imageId;
      } else {
        // Handle image upload failure
        console.error('Image upload failed:', imageData.response || 'Unknown error');
        Swal.fire({
          title: "Error!",
          text: imageData.response || "Unknown error",
          icon: "error"
        });
        return null;
      }        
    } catch (error) {
      console.error('Error updating image:', error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred during image update",
        icon: "error"
      });
      return null;
    }
  },

  // FUNCTION TO HANDLE USER LOGOUT
  handleLogout: () => {
    // Clear user information and set isLoggedin to false.
    set({ 
      username: "", 
      accessToken: null, 
      userId: null, 
      isLoggedin: false 
    });
    // Remove the accessToken from localStorage.
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
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
          // products: [],
          image: null,
          userId: null,
          accessToken: null, 
          isLoggedin: false 
        });
        // Remove the accessToken from localStorage and userId.
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
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

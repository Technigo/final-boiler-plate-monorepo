// Import the necessary module for state management
import { create } from "zustand";
// Import the userStore to access user-related data
import { userStore } from "./userStore";

// Get the backend API URL from the environment variable
const apiEnv = import.meta.env.VITE_BACKEND_API;
console.log(apiEnv);

// Create and export a Zustand store for managing ads
export const adStore = create((set) => ({
  // Initialize the ad state with an empty array
  ads: [],
  // Initialize the userId state by accessing it from the userStore
  userId: userStore.userId,

  // Define an action to add an AD to the state
  addAd: (ad) => set((state) => ({ ads: [...state.ads, ad] })),

  // Define an action to set the ads state to a new array of ads
  setads: (ads) => set({ ads }),

  //FETCH AD FUNCTIONS

  // Fetch all ads
  getAllAds: async () => {
    try {
      const response = await fetch(`${apiEnv}/getAllAds`);
      if (response.ok) {
        const data = await response.json();
        set({ ads: data });
      } else {
        console.error("Failed to fetch ads");
      }
    } catch (error) {
      console.error(error);
    }
  },


  // Fetch ads for a specific user
  fetchAds: async () => {
    try {
      const response = await fetch(`${apiEnv}/getAds`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      if (response.ok) {
        const data = await response.json();
        set({ ads: data });
      } else {
        console.error("Failed to fetch ads");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // Fetch a specific ad by ID
  getAdById: async (id) => {
    try {
      const response = await fetch(`${apiEnv}/getAd/${id}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error("Failed to fetch ad");
      }
    } catch (error) {
      console.error("Error fetching ad:", error);
    }
  },


  //CREATE AD FUNCTIONS
  // New action to add an ad to the server and then to the store
  createAd: async (newAdData, imageFile) => {
    console.log("imageFile:", imageFile); // Log the imageFile here
    try {
      const formData = new FormData();
      formData.append('title', newAdData.title);
      formData.append('description', newAdData.description);
      formData.append('product', newAdData.product);
      formData.append('quantity', newAdData.quantity);
      formData.append('unit', newAdData.unit);
      formData.append('address', newAdData.address);
      formData.append('observation', newAdData.observation);
      formData.append('pickupDate', newAdData.pickupDate);
      // Assuming 'available' is a boolean, it should not be set from the model but rather a static value or state.
      formData.append('available', true); // or whatever the logic is to set this
      formData.append('image', imageFile);

      // Send the request to create a new ad with form data
      const response = await fetch(`${apiEnv}/createAd`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          // Do not set Content-Type when sending FormData
          // 'Content-Type': 'multipart/form-data' should not be set manually
        },
        body: formData,
      });

      const newAd = await response.json();
      console.log("Server response for new ad:", newAd);

      if (response.ok) {
        set((state) => {
          const updatedAds = [...state.ads, newAd];
          console.log("Updated ads state:", updatedAds); // Log updated state here
          return { ads: updatedAds };
        });
        alert("Your ad has been successfully created!");
      } else {
        console.error("Failed to create ad");
      }
    } catch (error) {
      console.error(error);
    }
  },

  //UPDATE AD FUNCTIONS
  // Action to update an existing ad
  handleEdit: async (id, updatedAdData, imageFile) => {
    const formData = new FormData();
    Object.entries(updatedAdData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await fetch(`${apiEnv}/update/${id}`, {
      method: "PUT",
      headers: { Authorization: localStorage.getItem("accessToken") },
      body: formData,
    });

    if (response.ok) {
      const updatedAd = await response.json();
      set((state) => ({
        ads: state.ads.map((ad) => ad._id === id ? { ...ad, ...updatedAd } : ad),
      }));
    } else {
      console.error("Failed to update the ad");
    }
  },

  //DELETE FUNCTIONS
  // New action to delete all ads of a specific user
  deleteAllAds: async () => {
    try {
      // Send a DELETE request to the backend API to delete all ads
      const response = await fetch(`${apiEnv}/deleteAll`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      // Check if the request was successful
      if (response.ok) {
        // Clear the ads in the state
        set({ ads: [] });
      } else {
        console.error("Failed to delete ads");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // New action to delete a specific ad by its ID
  deleteAdById: async (id) => {
    try {
      // Send a DELETE request to the backend API to delete an ad by its ID
      const response = await fetch(`${apiEnv}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });

      // Check if the request was successful
      if (response.ok) {
        // Remove the ad from the ads state
        set((state) => ({
          ads: state.ads.filter((ad) => ad._id !== id),
        }));
      } else {
        console.error("Failed to delete ad");
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  },
}));

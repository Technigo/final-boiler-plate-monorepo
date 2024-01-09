// Import the necessary module for state management
import { create } from "zustand";
// Import the userStore to access user-related data
import { userStore } from "./userStore";
import Swal from 'sweetalert2';

// Get the backend API URL from the environment variable
const apiEnv = import.meta.env.VITE_BACKEND_API;
console.log(apiEnv);

// Create and export a Zustand store for managing ads
export const adStore = create((set) => ({
  // Initialize the ad state with an empty array
  ads: [],
  savedAds: [],
  userAds: [],
  // Initialize the userId state by accessing it from the userStore
  userId: userStore.userId,

  // Define an action to add an AD to the state
  addAd: (ad) => set((state) => ({ ads: [...state.ads, ad] })),

  // Define an action to set the ads state to a new array of ads
  setads: (ads) => set({ ads }),

  //FETCH AD FUNCTIONS

  // Function to fetch all saved ads for the current user
  fetchSavedAds: async () => {
    const userId = userStore.getState().userId;
    const url = `${apiEnv}/getSavedAdsByUserId/${userId}`;

    try {
      const response = await fetch(url, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      if (response.ok) {
        const data = await response.json();
        set({ savedAds: data });
      } else {
        Swal.fire('Error!', 'Failed to fetch ads for the user', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while fetching ads for the user', 'error');
    }
  },


  // Fetch all ads
  getAllAds: async () => {
    try {
      const response = await fetch(`${apiEnv}/getAllAds`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      if (response.ok) {
        const data = await response.json();
        set({ ads: data });
      } else {
        Swal.fire('Error!', 'Failed to fetch ads', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while fetching ads', 'error');
    }
  },

  // Fetch ads for the logged in user
  fetchAds: async () => {
    try {
      const response = await fetch(`${apiEnv}/getAds`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      if (response.ok) {
        const data = await response.json();
        set({ ads: data });
      } else {
        Swal.fire('Error!', 'Failed to fetch ads', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while fetching ads', 'error');
    }
  },

  // Fetch a specific ad by ID
  getAdById: async (id) => {
    try {
      const response = await fetch(`${apiEnv}/getAd/${id}`, {});
      if (response.ok) {
        return await response.json();
      } {
        Swal.fire('Error!', 'Failed to fetch ad', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while fetching the ad', 'error');
    }
  },

  // Fetch ads for a specific user by UserID
  fetchAdsByUserId: async (userId) => {
    try {
      const response = await fetch(`${apiEnv}/getAdsByUserId/${userId}`, {});
      if (response.ok) {
        const data = await response.json();
        set({ ads: data });
      } else {
        Swal.fire('Error!', 'Failed to fetch ads for the user', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while fetching ads for the user', 'error');
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
          // Don't set Content-Type when sending FormData
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
        Swal.fire('Success!', 'Your ad has been successfully created!', 'success');
      } else {
        Swal.fire('Error!', 'Failed to create ad', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while creating the ad', 'error');
    }
  },

  // Action to save an ad
  saveAd: async (adId) => {
    try {
      const response = await fetch(`${apiEnv}/saveAd`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({ adId }),
      });
      if (!response.ok) throw new Error('Failed to save ad');
      Swal.fire('Saved!', 'Ad saved successfully', 'success');
    } catch (error) {
      console.error('Save Ad Error:', error);
      Swal.fire('Error!', 'Failed to save ad', 'error');
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
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
      body: formData,
    });

    if (response.ok) {
      const updatedAd = await response.json();
      set((state) => ({
        ads: state.ads.map((ad) => ad._id === id ? { ...ad, ...updatedAd } : ad),
      }));
      Swal.fire('Success!', 'Ad updated successfully', 'success');
    } else {
      Swal.fire('Error!', 'Failed to update the ad', 'error');
    }
  },

  //DELETE FUNCTIONS
  // New action to delete all ads of a specific user
  deleteAllAds: async () => {
    try {
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
        Swal.fire('Success!', 'All ads have been deleted', 'success');
      } else {
        Swal.fire('Error!', 'Failed to delete ads', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while deleting ads', 'error');
    }
  },

  // New action to delete a specific ad by its ID
  deleteAdById: async (id) => {
    try {
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
        Swal.fire('Success!', 'Ad successfully deleted', 'success');
      } else {
        Swal.fire('Error!', 'Failed to delete ad', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while deleting the ad', 'error');
    }
  },

  // Action to unsave an ad
  unsaveAd: async (adId) => {
    try {
      const response = await fetch(`${apiEnv}/unsaveAd/${adId}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });

      if (!response.ok) throw new Error('Failed to unsave ad');

      // Update the state to remove the unsaved ad
      set(state => {
        const updatedSavedAds = state.savedAds.filter(ad => ad._id !== adId);
        return { ...state, savedAds: updatedSavedAds };
      });

      Swal.fire('Removed!', 'Ad unsaved successfully', 'success');
    } catch (error) {
      console.error('Unsave Ad Error:', error);
      Swal.fire('Error!', 'Failed to unsave ad', 'error');
    }
  },


}));

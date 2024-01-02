// playgroundStore.js
import { create } from "zustand";

const playgroundAPI = `https://catalog.eslov.se/rowstore/dataset/08b5e92d-7bc7-41de-aa56-f67f6662e919`;
const BACKEND_URL = import.meta.env.VITE_BACKEND_API;

const usePlaygroundStore = create((set) => ({
  playgrounds: [],
  playgroundDetails: null,
  isLiked: false, // Add isLiked state to track if the playground is liked
  fetchPlaygrounds: async () => {
    try {
      const response = await fetch(playgroundAPI);
      const data = await response.json();
      const playgrounds = data.results.map((playground) => ({
        name: playground.name,
        description: playground.description,
        id: playground.id
      }));
      set({ playgrounds });
    } catch (error) {
      console.error("Error fetching playgrounds:", error);
    }
  },
  getPlaygroundDetails: async (id) => {
    try {
      const response = await fetch(`${playgroundAPI}?id=${id}&_limit=1&_offset=0`);
      
      if (!response.ok) {
        throw new Error(`Error fetching playground details: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data || !data.results || data.results.length === 0) {
        throw new Error("Empty response or invalid JSON format");
      }

      const playgroundDetails = {
        name: data.results[0].name,
        description: data.results[0].description,
        city: data.results[0].city,
        street: data.results[0].street,
        postcode: data.results[0].postcode,
        wheelchair: data.results[0].wheelchair,
        roundabout: data.results[0].roundabout,
        zipwire: data.results[0].zipwire,
        swing: data.results[0].swing, 
        slide: data.results[0].slide,
        sandpit: data.results[0].sandpit
      };
      set({ playgroundDetails });
    } catch (error) {
      console.error("Error fetching playground details:", error.message);
    }
  },

  likePlayground: async () => {
  if (!playgroundAPI) {
    console.error('playgroundDetails is not defined');
    return;
  }

  const { id } = playgroundAPI;

  try {
    const response = await fetch(`${BACKEND_URL}/add-to-favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: JSON.stringify({ 
        apiId: id}),
    });

     // Handle the response
    if (response.ok) {
      const result = await response.json();
      console.log(result.message); // Output success message
    } else {
      const error = await response.text();
      console.error(`Error: ${error}`);
    }
  } catch (error) {
    console.error('Something went wrong:', error);
  }
},


   fetchUserFavorites: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_URL}/user/favorites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.favorites; // Assuming the response has a property named 'favorites'
      } else {
        throw new Error(`Error fetching user favorites: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      throw error;
    }
  },

  // Frontend function to fetch and display user favorites
  displayUserFavorites: async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/get-my-favorites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        const favorites = await response.json();
        return favorites; // Return the favorites array directly
      } else {
        throw new Error(`Error fetching user favorites: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      throw error;
    }
  },

}));





export default usePlaygroundStore;


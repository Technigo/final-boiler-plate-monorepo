// playgroundStore.js
import { create } from "zustand";

const playgroundAPI = `https://catalog.eslov.se/rowstore/dataset/08b5e92d-7bc7-41de-aa56-f67f6662e919`;

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
        basketswing: data.results[0].basketswing,
        sandpit: data.results[0].sandpit
      };
      set({ playgroundDetails });
    } catch (error) {
      console.error("Error fetching playground details:", error.message);
    }
  },
  likePlayground: async () => {
    const { id, name } = playgroundDetails;
    try {
      const response = await fetch('http://localhost:3002/api/playground/add-to-favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ apiId: id, name }),
      });

      if (response.ok) {
        console.log('Playground added to favorites successfully');
        set({ isLiked: true });
      } else {
        console.error('Failed to add playground to favorites');
      }
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  },

   fetchUserFavorites: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3002/api/user/favorites', {
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
}));

export default usePlaygroundStore;

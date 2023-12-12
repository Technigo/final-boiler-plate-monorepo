//Seed json into mongo db before implementing this!
import { create } from 'zustand';
import { Restaurant } from './restaurantModel'; // Import your Restaurant model

// Get the backend API URL from the environment variable
const apiEnv = import.meta.env.VITE_BACKEND_API;
console.log(apiEnv);

export const restaurantStore = create((set) => ({
  restaurants: [], // Initialize the restaurants state with an empty array

  // New action to add a restaurant to the server and then to the store
  addRestaurantToServer: async (restaurantData) => {
    try {
      // Create a new Restaurant instance using your model
      const newRestaurant = new Restaurant(restaurantData);

      // Save the new restaurant to the MongoDB database
      await newRestaurant.save();

      // Update the state with the new restaurant
      set((state) => ({ restaurants: [...state.restaurants, newRestaurant] }));
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  },

  // New action to fetch restaurants from the MongoDB database
  fetchRestaurants: async () => {
    try {
      // Fetch restaurants from the MongoDB database using your model
      const restaurants = await Restaurant.find().exec();

      // Update the state with fetched restaurants
      set({ restaurants });
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  },

  // New action to delete a restaurant by its ID from the MongoDB database
  deleteRestaurantById: async (id) => {
    try {
      // Delete the restaurant from the MongoDB database using your model
      await Restaurant.deleteOne({ restaurantID: id });

      // Update the state to remove the deleted restaurant
      set((state) => ({
        restaurants: state.restaurants.filter((restaurant) => restaurant.restaurantID !== id),
      }));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  },

}));

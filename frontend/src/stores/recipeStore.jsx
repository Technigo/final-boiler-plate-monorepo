// Import the 'create' function from Zustand
import { create } from "zustand";

const api = "http://localhost:3001";

// Define the recipeStore using Zustand's 'create' function
export const recipeStore = create((set) => ({
  // Initialize the state with an empty array of recipes
  recipes: [],
  // Function to set the recipes in the state
  setRecipes: (recipes) => set({ recipes }),
  // Function to add a new recipe to the state
  newRecipe: null,
  // Function to set the recipes in the state
  setNewRecipe: (newRecipe) => set({ newRecipe }),
  // Function to add a new recipe to the state
  inputRecipe: "",
  setInputRecipe: (inputRecipe) => set({ inputRecipe }),
  addNewRecipe: (newRecipe) => {
    // Update the state by creating a new array with existing recipes and new recipe
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    }));
  },

  fetchNewRecipe: async () => {
    try {
      const response = await fetch(`${api}/recipes`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const recipes = data.recipes;
      const newRecipeVar = recipes[recipes.length - 1];
      //Update the newRecipe state with the fetched newRecipe:
      set(() => ({ newRecipe: newRecipeVar }));
    } catch (error) {
      //*****Write error message!!********
    }
  },

   fetchCollectionRecipes: async () => {
    try {
      // Make a GET request to the API endpoint
      const response = await fetch(`${api}/recipes`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      // Check if the response is not okay 
      //***Use same error message in other places??*** */
      if (!response.ok) {
        throw new Error(`Oh no, error, HTTP! ${response.status}`);
      }
      // Parse the JSON response and set the recipes in the state
      const data = await response.json();
      const recipes = data.recipes
      const reversedRecipes = recipes.reverse()
      //Update the Recipes state with the fetched recipes
      set(() => ({ recipes: reversedRecipes }));
      
      // setRecipes(data.recipes)
    } catch (error) {
      console.error(error);
    }
  }


}));

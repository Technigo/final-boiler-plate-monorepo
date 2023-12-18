// Import the 'create' function from Zustand
import { create } from "zustand";

const api = "http://localhost:3001";

// Define the recipeStore using Zustand's 'create' function
export const recipeStore = create((set) => ({
  // Initialize the state with an empty array of recipes
  recipes: [],
  // Function to set the recipes in the state
  setRecipes: (recipes) => set({ recipes }),
  // Initialize the newRecipe state with null
  newRecipe: null,
  // Function to set the new recipe in the state
  setNewRecipe: (newRecipe) => set({ newRecipe }),
  inputRecipe: "",
  setInputRecipe: (inputRecipe) => set({ inputRecipe }),
  // Function to add a new recipe to the state
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

      if (!response.ok) {
        // Handle non-successful response (e.g., 404 Not Found, 500 Internal Server Error)
        throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
      }
      const data = await response.json();
      const recipes = data.recipes;
      const newRecipeVar = recipes[recipes.length - 1];

      //Update the newRecipe state with the fetched newRecipe:
      set(() => ({ newRecipe: newRecipeVar }));
    } catch (error) {
      console.error("Error fetching new recipe:", error);
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
      if (!response.ok) {
        throw new Error(`Failed to fetch collection of recipes! ${response.status}`);
      }
      // Parse the JSON response and set the recipes in the state
      const data = await response.json();
      const recipes = data.recipes
      const reversedRecipes = recipes.reverse()
      //Update the Recipes state with the fetched recipes
      set(() => ({ recipes: reversedRecipes }));

      // setRecipes(data.recipes)
    } catch (error) {
      console.error("Error fetching collection of recipes:", error);
    }
  },

  // From PromptForm.jsx
  generateRecipe: async (ingredients) => {
    try {
      // const newRecipeData = {
      //   ingredients,
      // }

      const response = await fetch("http://localhost:3001/openai/generateText", {
        method: 'POST',
        body: JSON.stringify({prompt: ingredients}),
        headers: { 'Content-Type': 'application/json' },
      })

      // Check if the response is not okay
      if (!response.ok) {
        throw new Error(`Error generating OpenAI completion. Status: ${response.status}`);
      }
      const data = await response.json()

      console.log(data.recipe)
      //Update the state with the new recipe
      set((state) => ({
        recipes: [...state.recipes, data],
        newRecipe: data,
      }))

    } catch (error) {
      console.error("Error generating OpenAI completion:", error);
    }
  },

  
}));

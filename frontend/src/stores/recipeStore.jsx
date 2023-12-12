// Import the 'create' function from Zustand
import { create } from "zustand"

// Define the recipeStore using Zustand's 'create' function
export const recipeStore = create((set) => ({
    // Initialize the state with an empty array of recipes
    recipes: [],
    // Function to set the recipes in the state
    setRecipes: (recipes) => set({ recipes }),
    // Function to add a new recipe to the state
    addNewRecipe: (newRecipe) => {
        // Update the state by creating a new array with existing recipes and new recipe
        set((state) => ({
            recipes: [...state.recipes, newRecipe],
        }));
    }

}))


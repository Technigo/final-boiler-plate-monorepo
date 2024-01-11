// Import the 'create' function from Zustand
import { create } from "zustand";

// *** If we want to work in the localhost:
//const api = "http://localhost:3001";

const api = "https://ai-recipes-collin-dieden.onrender.com"

// Defining the recipeStore using Zustand's 'create' function
export const recipeStore = create((set, get) => ({
  // Initialize the state with an empty array of recipes
  recipes: [],
  // Function to set the recipes in the state
  setRecipes: (recipes) => set({ recipes }),
  // Initialize the newRecipe state with null
  newRecipe: false,
  //Generating state for the post request to openAI. False as default.
  isGenerating: false,
  // Function to set the new recipe in the state
  setNewRecipe: (newRecipe) => set({ newRecipe }),
  inputRecipe: [],
  setInputRecipe: (inputRecipe) => set({ inputRecipe }),
  // Function to add a new recipe to the state
  addNewRecipe: (newRecipe) => {
    // Update the state by creating a new array with existing recipes and new recipe
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    }));
  },
  //State for error message if recipe generation fails
  errorMessageGeneration: "",
  setErrorMessageGeneration: (errorMessageGeneration) => set({ errorMessageGeneration }),
  //State for error message if get request of recipes fails
  errorMessageFetchAll: "",
  setErrorMessageFetchAll: (errorMessageFetchAll) => set({ errorMessageFetchAll }),
  //Initilazing state for vegetarian preference
  isVegetarian: false,
  setIsVegetarian: (isVegetarian) => set({ isVegetarian }),
  //Initilazing state for glutenfree preference
  isGlutenFree: false,
  setIsGlutenFree: (isGlutenFree) => set({ isGlutenFree }),

  // Function to fetch a new recipe from the API
  fetchNewRecipe: async () => {
    try {
      const response = await fetch(`${api}/recipes`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        // Handle non-successful response (e.g., 404 Not Found, 500 Internal Server Error)
        throw new Error(`Status: ${response.status}`);

      }
      const data = await response.json();
      const recipes = data.recipes;
      const newRecipeVar = recipes[recipes.length - 1];

      //Update the newRecipe state with the fetched newRecipe:
      set(() => ({ newRecipe: newRecipeVar }));

      //Error messages, mounted in CollectionRecipes.jsx
    } catch (error) {
      console.error("Error fetching new recipe:", error);
      // Set an error message in the state if fetching new recipe fails
      set(() => ({ errorMessageGeneration: "Error fetching new recipe!" }));
    }
  },

  // Function to fetch all recipes from the API
  fetchCollectionRecipes: async () => {
    try {
      // Make a GET request to the API endpoint
      const response = await fetch(`${api}/recipes`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      // Check if the response is not okay 
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      // Parse the JSON response and set the recipes in the state
      const data = await response.json();
      const recipes = data.recipes
      const reversedRecipes = recipes.reverse()

      //Update the Recipes state with the fetched recipes
      set(() => ({ recipes: reversedRecipes }));

      //Error messages, mounted in CollectionRecipes.jsx
    } catch (error) {
      console.error("Error fetching collection of recipes:", error);
      set(() => ({ errorMessageFetchAll: "Error fetching collection of recipes" }));
    }
  },

  // Function to generate a recipe using OpenAI
  generateRecipe: async (ingredients) => {
    const formattedIngredients = ingredients.join(",")
    const isVegetarian = get().isVegetarian
    const isGlutenFree = get().isGlutenFree

    try {
      //Setting the isGenerating state to true so that loading message can be rendered in Home.jsx
      set(() => ({ isGenerating: true }))
      //Removes old error message when a new recipe is generated
      set(() => ({ errorMessageGeneration: "" }));

      const response = await fetch(`${api}/openai/generateText`, {
        method: 'POST',
        body: JSON.stringify({ prompt: `${formattedIngredients}`, isVegetarian: isVegetarian, isGlutenFree: isGlutenFree }),
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()
      //Checking if data successful, otherwise showing the error message, written in openAiController
      if (!data.success) {
        console.error("Error generating OpenAI completion:", data.error);
        //Updating the error message
        set(() => ({ errorMessageGeneration: data.error || "An unexpected error occurred" }
        ));
      } else {
        // Reset errorMessageGeneration if the generation was successful
        set(() => ({ errorMessageGeneration: "" }));
      }

    } catch (error) {
      console.error("Error generating OpenAI completion:", error);
      set(() => ({ errorMessageGeneration: "Error when connecting and generating OpenAI. Try again later!" }));
    } finally {
      // Set isGenerating back to false once the operation is completed (either success or error)
      set(() => ({ isGenerating: false }));
    }
  },
}));

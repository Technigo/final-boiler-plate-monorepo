// This component is mounted in page: Login. The component fetches a list from the local API using the fetch function and displays them

import { useEffect } from "react";
import { recipeStore } from "../../stores/recipeStore";
import "./collectionRecipes.css"

// Define the API endpoint to fetch recipes
const getAPI = 'http://localhost:3001/recipes';

// Define the CollectionRecipes component
export const CollectionRecipes = () => {
  // Destructure recipes and setRecipes from the recipeStore
  const { recipes, setRecipes, newRecipe, setNewRecipe } = recipeStore()
  // Define a function to fetch recipes from the API
  const fetchCollectionRecipes = async () => {
    try {
      // Make a GET request to the API endpoint
      const response = await fetch(getAPI, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      // Check if the response is not okay 
      if (!response.ok) {
        throw new Error(`Oh no, error, HTTP! ${response.status}`);
      }
      // Parse the JSON response and set the recipes in the state
      const data = await response.json();
      const recipes = data.recipes
      setRecipes(recipes)
      console.log(recipes)
      console.log(recipes[recipes.length-1])
      setNewRecipe(recipes[recipes.length-1])
      
      // setRecipes(data.recipes)
    } catch (error) {
      console.error(error);
    }
  }

  // Use the useEffect hook to fetch recipes when the component mounts
  useEffect(() => {
    fetchCollectionRecipes()
    console.log(recipes)
  }, [])

  // Render the component with a list of recipes (map over the recipes and render each recipe's ingredients and instructions)
  return (
    <div>
      <h2>Recipes:</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            {/* Render your recipe details here */}
            <div>{recipe.ingredients}</div>
            <div>{recipe.instructions}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}


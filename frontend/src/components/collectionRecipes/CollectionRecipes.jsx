// This component is mounted in page: Login. The component fetches a list from the local API using the fetch function and displays them

import { useEffect } from "react";
import { recipeStore } from "../../stores/recipeStore";
import "./collectionRecipes.css"


// Define the CollectionRecipes component
export const CollectionRecipes = () => {
  // Destructure recipes and setRecipes from the recipeStore
  const { recipes, fetchCollectionRecipes } = recipeStore()
  
  // Use the useEffect hook to fetch recipes when the component mounts
  useEffect(() => {
    fetchCollectionRecipes()
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


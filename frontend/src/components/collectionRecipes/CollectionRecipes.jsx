// This component is mounted in page: Login. The component fetches a list from the local API using the fetch function and displays them

import { useEffect, useState } from "react";
import { recipeStore } from "../../stores/recipeStore";
import "./collectionRecipes.css";

// Define the CollectionRecipes component
export const CollectionRecipes = () => {
  // Destructure recipes and setRecipes from the recipeStore
  const { recipes, fetchCollectionRecipes } = recipeStore();
  const [loading, setLoading] = useState(true);

  // Use the useEffect hook to fetch recipes when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCollectionRecipes();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //loading state (Need to set this, so rendering doesn't happen BEFORE fetch!)
  if (loading) {
    return <p>Loading recipes...</p>; // You can replace this with a loading spinner or other loading indicator
  }

  // Slice the recipes array to get only the first 12 recipes
  const limitedRecipes = recipes.slice(0, 12);

  // Render the component with a list of recipes (map over the recipes and render each recipe's ingredients and instructions)
  return (
    <div>
      <h2>Recipes:</h2>
      <ul>
        {limitedRecipes.map((recipe, index) => (
          <li key={index}>
            {/* Render your recipe details here */}
            <h2>{recipe.title}</h2>
            <p>
              <strong>User input:</strong> {recipe.userInput}
            </p>
            <p>
              <strong>Description:</strong> {recipe.description}
            </p>
            <p>
              <strong>Ingredients:</strong>
            </p>
            {/* Iterate over the ingredients object: */}
            {recipe.ingredients ? (
              <ul>
                {Object.entries(recipe.ingredients).map(
                  ([ingredient, quantity], i) => (
                    <li key={i}>{`${ingredient}: ${quantity}`}</li>
                  )
                )}
              </ul>
            ) : (
              <p>No ingredients available.</p>
            )}
            <div>
              <p>
                <strong>Instructions:</strong>
              </p>
              {recipe.instructions ? (
                <ol>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              ) : (
                <p>No instructions available.</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

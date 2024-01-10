// This component is mounted in page: Login. The component fetches a list from the local API using the fetch function and displays them

import { useEffect, useState } from "react";
import { recipeStore } from "../../stores/recipeStore";
import { CollectionRecipe } from "../collectionRecipes/CollectionRecipe";
import "./collectionRecipes.css";

// Define the CollectionRecipes component
export const CollectionRecipes = () => {
  // Destructure recipes and setRecipes from the recipeStore
  const { recipes, fetchCollectionRecipes, errorMessageGeneration, setErrorMessageGeneration, errorMessageFetchAll, setErrorMessageFetchAll, setNewRecipe } = recipeStore();
  const [loading, setLoading] = useState(true);


  // Use the useEffect hook to fetch recipes when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCollectionRecipes();
        setLoading(false);
        setErrorMessageGeneration("")
        setNewRecipe(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //loading state (Need to set this, so rendering doesn't happen BEFORE fetch!)
  if (loading) {
    return <div className="spinner-container">
      <div className="spinner"></div><p>Loading AI-generated recipes. Be patient, this might take a minute or two!</p></div>;
  }

  // Slice the recipes array to get only the first 12 recipes
  const limitedRecipes = recipes.slice(0, 12);

  // Render the component with a list of recipes (map over the recipes and render each recipe's ingredients and instructions)
  return (
    <section className="collection-recipes">
      {/* Error message from RecipeStore rendered if there was something wrong during generation */}
      {errorMessageGeneration && <div className="error-message-container"><p className="error-message-generation">{errorMessageGeneration}</p></div>}

      {/* Error message from RecipeStore rendered if something is wrong with the fetch/database/Render */}
      {errorMessageFetchAll && (
        <div className="error-message-container">
          <p className="error-message-generation">{errorMessageFetchAll}</p>
        </div>)}

      {/* Conditionally render the heading only when it is no error message for fetching all recipes */}
      {!errorMessageFetchAll && (
        <h3>Latest AI-Generated Recipes</h3>)}

      <div className="recipe-grid">
        {limitedRecipes.map((recipe, index) => (
          <CollectionRecipe key={recipe._id} recipe={recipe} index={index} />
        ))}
      </div>
    </section>
  );
};

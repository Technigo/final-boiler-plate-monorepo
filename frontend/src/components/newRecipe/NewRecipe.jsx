import React, { useEffect } from "react";
import "./newRecipe.css";
import { recipeStore } from "../../stores/recipeStore";

export const NewRecipe = () => {
  // Destructure values from the recipeStore
  const { newRecipe, fetchNewRecipe, errorMessageGeneration, fetchCollectionRecipes } = recipeStore();

  // useEffect(() => {
  //   // Fetch a new recipe when the component mounts
  //   fetchNewRecipe();
  // }, [fetchNewRecipe]);

  useEffect(() => {
    // Fetch a new recipe when the component mounts
    fetchCollectionRecipes();
  }, []);

  // Check if there is an error message, stop render of newRecipe
  if (errorMessageGeneration) {
    return null
  }

  // Check if there is no new recipe yet, and return null if true
  // if (!newRecipe) {
  //   return null; // Don't render anything if there is no new recipe yet
  // }

  // Render the new recipe details if there is no error and a new recipe is available
  return (
    <>
      <h3>Gear up for an outdoor escapade!</h3> <h3>Your AI-generated adventure-ready recipe:</h3>
      <div className="new-recipe-wrapper">
        <h3>{newRecipe.title}</h3>
        <p><strong>Your input:</strong> {newRecipe.userInput}</p>
        <p><strong>Description:</strong> {newRecipe.description}</p>
        {/* Iterate over the ingredients object */}
        <p><strong>Ingredients:</strong></p>
        <ul>
          {Object.entries(newRecipe.ingredients).map(([ingredient, quantity], i) => (
            <li key={i}>{`${ingredient}: ${quantity}`}</li>
          ))}
        </ul>

        <div>
          <p><strong>Instructions:</strong></p>
          <ol>
            {newRecipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

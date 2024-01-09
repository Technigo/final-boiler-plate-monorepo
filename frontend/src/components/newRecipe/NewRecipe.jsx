import React, { useEffect } from "react";
import "./newRecipe.css";
import { recipeStore } from "../../stores/recipeStore";
import { PiCookingPot } from "react-icons/pi";
import { TabButton } from "../buttons/tabButton/TabButton";

export const NewRecipe = () => {
  // Destructure values from the recipeStore
  const { newRecipe, errorMessageGeneration, fetchCollectionRecipes } = recipeStore();

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

  // Function to capitalise the first letter of a word in object
  const capitalizeKeys = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        newObj[capitalizedKey] = obj[key];
      }
    }
    return newObj;
  };
  return (
    
    <>
    <section className="recipe-details">
        <h1>{newRecipe.title}</h1>

        <div className="recipe-info">
          <div className="servings">
            <PiCookingPot /> <p>Serves 2 people</p>
          </div>
          <div className="user-input-details">
            {newRecipe.userInput.map((ingredient, ingredientIndex) => (
              <div className="input-tag-details" key={ingredientIndex}>{ingredient}</div>
            ))}
          </div>
        </div>

        <img src="/recipe-imgs/campfire-896196_1280.jpg" alt="" />
        {/* Prepped for later <div className="save-recipe"><SaveButtonBig /></div> */}

        <p className="description">{newRecipe.description}</p>

        <TabButton />

        <h3>Ingredients</h3>
        {/*Mapping the ingredients: */}

        <ul>
          {Object.entries(capitalizeKeys(newRecipe.ingredients)).map(
            ([ingredient, quantity], i) => (
              <li key={i}>{`${ingredient}: ${quantity}`}</li>
            )
          )}
        </ul>

        <h3>Method:</h3>
        <ol>
          {newRecipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </section>
    
    
    </>
    // <section className="new-recipe-section">
    //   <h3>Gear up for an outdoor escapade! Your AI-generated adventure-ready recipe:</h3>
    //   <div className="new-recipe-wrapper">
    //     <h3>{newRecipe.title}</h3>
    //     <p><strong>Your input:</strong> {newRecipe.userInput}</p>
    //     <p><strong>Description:</strong> {newRecipe.description}</p>
    //     {/* Iterate over the ingredients object */}
    //     <p><strong>Ingredients:</strong></p>
    //     <ul>
    //       {Object.entries(newRecipe.ingredients).map(([ingredient, quantity], i) => (
    //         <li key={i}>{`${ingredient}: ${quantity}`}</li>
    //       ))}
    //     </ul>

    //     <div>
    //       <p><strong>Instructions:</strong></p>
    //       <ol>
    //         {newRecipe.instructions.map((instruction, index) => (
    //           <li key={index}>{instruction}</li>
    //         ))}
    //       </ol>
    //     </div>
    //   </div>
    // </section>
  );
};

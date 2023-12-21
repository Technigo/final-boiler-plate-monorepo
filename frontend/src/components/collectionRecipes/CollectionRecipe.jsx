// recipe card, prepped for later

import "./collectionRecipe.css";

export const CollectionRecipe = (recipe) => {
  return (
    <div className="collection-recipe-wrapper">
    <h3>{recipe.recipe.title}</h3>
   
      <p>
        <strong>User input:</strong> {recipe.recipe.userInput}
      </p>
      <p>
        <strong>Description:</strong> {recipe.recipe.description}
      </p>
      <p>
        <strong>Ingredients:</strong>
      </p>
      {recipe.recipe.ingredients ? (
        <ul>
          {Object.entries(recipe.recipe.ingredients).map(
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
        {recipe.recipe.instructions ? (
          <ol>
            {recipe.recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        ) : (
          <p>No instructions available.</p>
        )}
      </div>
  
    </div>
  );
};

import "./newRecipe.css";
import { recipeStore } from "../../stores/recipeStore";

export const NewRecipe = () => {
  const { newRecipe } = recipeStore();

  return (
    <>
      <h2>Gear up for an outdoor escapade! Your AI-generated adventure-ready recipe:</h2>
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

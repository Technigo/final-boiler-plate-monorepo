import "./newRecipe.css";
import { recipeStore } from "../../stores/recipeStore";

export const NewRecipe = () => {
  const { newRecipe } = recipeStore();

  return (
    <div>
      <h3>Your recipe:</h3>
      <h2>{newRecipe.title}</h2>
      <p>Description: {newRecipe.description}</p>
      <p>Ingredients: {newRecipe.ingredients}</p>
      <p>Instructions: {newRecipe.instructions}</p>
    </div>
  );
};

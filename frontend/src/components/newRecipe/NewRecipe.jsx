import "./newRecipe.css";
import { recipeStore } from "../../stores/recipeStore";

export const NewRecipe = () => {
  const { newRecipe } = recipeStore();

  return (
    <div>
      <h3>Your recipe:</h3>
      <div>{newRecipe.ingredients}</div>
      <div>{newRecipe.instructions}</div>
    </div>
  );
};

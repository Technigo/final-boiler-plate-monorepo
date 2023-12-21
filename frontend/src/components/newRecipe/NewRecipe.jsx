import "./newRecipe.css";
import { recipeStore } from "../../stores/recipeStore";

export const NewRecipe = () => {
  const { newRecipe } = recipeStore();
  // console.log(newRecipe)
  // console.log(newRecipe.recipe.description)
  // console.log(newRecipe.recipe.ingredients)
  // console.log(newRecipe.recipe.instructions)

  return (
    <div>
      <h3>Your recipe:</h3>
      {/* <h2>{newRecipe.recipe.title}</h2>
      <p><strong>Description:</strong> {newRecipe.recipe.description}</p> */}
      {/* Iterate over the ingredients object */}
      <p><strong>Ingredients:</strong></p>
      {/* <ul>
        {Object.entries(newRecipe.recipe.ingredients).map(([ingredient, quantity], i) => (
          <li key={i}>{`${ingredient}: ${quantity}`}</li>
        ))}
      </ul> */}

      {/* <div>
        <p><strong>Instructions:</strong></p>
        <ol>
          {newRecipe.recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div> */}
    </div>
  );
};

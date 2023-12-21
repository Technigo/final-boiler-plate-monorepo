import "./newRecipe.css";
import { recipeStore } from "../../stores/recipeStore";

export const NewRecipe = () => {
  const { newRecipe } = recipeStore();

  return (
    <div>
      <h3>Your recipe:</h3>
       <h2>{newRecipe.title}</h2> 
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
  );
};

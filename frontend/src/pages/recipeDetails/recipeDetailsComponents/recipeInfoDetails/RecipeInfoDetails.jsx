import "./recipeInfoDetails.css"
import { PiCookingPot } from "react-icons/pi";

export const RecipeInfoDetails = ({userInput}) => {
  return (
    <div className="recipe-info">
          <div className="servings">
            <PiCookingPot /> <p>Serves 2 people</p>
          </div>
          <div className="user-input-details">
            {userInput.map((ingredient, ingredientIndex) => (
              <div className="input-tag-details" key={ingredientIndex}>{ingredient}</div>
            ))}
          </div> 
        </div>
  )
}

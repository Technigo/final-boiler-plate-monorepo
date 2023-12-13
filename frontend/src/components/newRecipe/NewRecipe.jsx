import "./newRecipe.css"
import { recipeStore } from "../../stores/recipeStore"

export const NewRecipe = () => {
    const {newRecipe} = recipeStore ()
    console.log(newRecipe)

  return (
    <div>
        <h3>Testtest</h3>
        <div>{newRecipe.ingredients}</div>
            <div>{newRecipe.instructions}</div>
    </div>
  )
}

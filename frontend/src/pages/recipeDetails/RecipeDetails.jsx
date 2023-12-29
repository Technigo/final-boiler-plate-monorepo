import "./recipeDetails.css";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { recipeStore } from "../../stores/recipeStore";

export const RecipeDetails = () => {
  const { id } = useParams();
  // Getting the recipe state from recipeStore
  const { recipes } = recipeStore();

  // Find the recipe with the matching 'id' from the 'recipes' array
  const foundRecipe = recipes.find((recipe) => recipe._id === id);

  // Check if a recipe was found
  if (!foundRecipe) {
    return <p>Recipe not found.</p>;
  }
  return (
    <>
      <Header />
      <section className="recipe-details">
        <h1>{foundRecipe.title}</h1>
        <p className="users-input">
          {" "}
          <strong>User's ingredients:</strong>
          {foundRecipe.userInput}
        </p>
        <img src="/src/assets/recipe-imgs/campfire-896196_1280.jpg" alt="" />
        <p className="description">{foundRecipe.description}</p>

        <h3>Ingredients:</h3>
        <ul>
          {Object.entries(foundRecipe.ingredients).map(
            ([ingredient, quantity], i) => (
              <li key={i}>{`${ingredient}: ${quantity}`}</li>
            )
          )}
        </ul>

        <h3>Instructions:</h3>
        <ol>
          {foundRecipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </section>
    </>
  );
};

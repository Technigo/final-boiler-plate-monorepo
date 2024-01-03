import "./recipeDetails.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "../../components/header/Header";
import { recipeStore } from "../../stores/recipeStore";
import { PiCookingPot } from "react-icons/pi";


export const RecipeDetails = () => {
  const { id } = useParams();
  // Getting the recipe state from recipeStore
  const { recipes } = recipeStore();

  // Find the recipe with the matching 'id' from the 'recipes' array
  const foundRecipe = recipes.find((recipe) => recipe._id === id);

  //This is to make the page scroll up to top automatically
  useEffect (() => {
    window.scrollTo(0,0)
  }, [])

  // Check if a recipe was found
  if (!foundRecipe) {
    return <p>Recipe not found.</p>;
  }

   // Function to capitalise the first letter of a word in array
   const capitaliseFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  //Making the userinput into an array
  const userInputArray = foundRecipe.userInput.split(",")
  
  return (
    <>
      <Header />
      <section className="recipe-details">
        <h1>{foundRecipe.title}</h1>
        <ul className="recipe-info">
          <div className="servings"> <PiCookingPot/> <p>Serves 2 people</p></div>
          <div className="users-input"> {userInputArray.map((item, index) => (
        <p key={index}>{item}</p>
      ))} </div>
          {console.log(userInputArray)}
          </ul>
        <img src="/recipe-imgs/campfire-896196_1280.jpg" alt="" />
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

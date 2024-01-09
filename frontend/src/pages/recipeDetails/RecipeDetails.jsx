import "./recipeDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { SaveButtonBig } from "../../components/buttons/saveButtonBig/SaveButtonBig";
import { TabButton } from "../../components/buttons/tabButton/TabButton";
import { recipeStore } from "../../stores/recipeStore";
import { PiCookingPot } from "react-icons/pi";

export const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Getting the recipe state from recipeStore
  const { recipes } = recipeStore();

  // Find the recipe with the matching 'id' from the 'recipes' array
  const foundRecipe = recipes.find((recipe) => recipe._id === id);

  //!!! ANVÄNDS DENNA? !!! Ta bort annars
  //This is to make the page scroll up to top automatically
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //


  // //HÄR ÄR DET NÅGOT FEL!!! Just nu testas med navigate (se även import samt rad 13)
  // // Check if a recipe was found
  // if (!foundRecipe) {
  //   navigate("/*");
  // }
  // //



  // Function to capitalise the first letter of a word in array
  const capitaliseFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  // Function to capitalise the first letter of a word in object
  const capitalizeKeys = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        newObj[capitalizedKey] = obj[key];
      }
    }
    return newObj;
  };

  return (
    <>
      <Header />
      <section className="recipe-details">
        <h1>{foundRecipe.title}</h1>
        <div className="recipe-info">
          <div className="servings">
            {" "}
            <PiCookingPot /> <p className="georgia">Serves 2 people</p>
          </div>
          <span className="dot">•</span>
          <div className="user-input-details">
            {foundRecipe.userInput.map((ingredient, ingredientIndex) => (
              <p className="georgia" key={ingredientIndex}>{ingredient}</p>
            ))}
          </div>
        </div>
        <img src="/recipe-imgs/campfire-896196_1280.jpg" alt="" />
        <div className="save-recipe"><SaveButtonBig /></div>
        <p className="description">{foundRecipe.description}</p>

        <TabButton />

        <h3>Ingredients</h3>
        {/*Mapping the ingredients: */}
        <ul>
          {Object.entries(capitalizeKeys(foundRecipe.ingredients)).map(
            ([ingredient, quantity], i) => (
              <li key={i}>{`${ingredient}: ${quantity}`}</li>
            )
          )}
        </ul>

        <h3>Method:</h3>
        <ol>
          {foundRecipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </section>
      <Footer />
    </>
  );
};

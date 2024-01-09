import "./recipeDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { SaveButtonBig } from "../../components/buttons/saveButtonBig/SaveButtonBig" (preppet for later)
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


  // ANVÄNDS DENNA??? SVAR: JA
  // This is to make the page scroll up to top automatically
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // // DETTA FUNGERAR EJ, testa att byta ut en bokstav på ett recept. Sidan blir blank.
  // // Check if a recipe was found
  // // Check if a recipe was found
  // if (!foundRecipe) {
  //   // Redirect to a not-found page or handle appropriately
  //   navigate("/not-found");
  //   // Render nothing if recipe not found
  //   return null;
  // }

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
      {/* <Header /> */}
      <section className="recipe-details">
        <h1>{foundRecipe.title}</h1>

        <div className="recipe-info">
          <div className="servings">
            <PiCookingPot /> <p>Serves 2 people</p>
          </div>
          <div className="user-input-details">
            {foundRecipe.userInput.map((ingredient, ingredientIndex) => (
              <div className="input-tag-details" key={ingredientIndex}>{ingredient}</div>
            ))}
          </div>
        </div>

        <img src="/recipe-imgs/campfire-896196_1280.jpg" alt="" />
        {/* Prepped for later <div className="save-recipe"><SaveButtonBig /></div> */}

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

        <h3>Method</h3>
        <ol>
          {foundRecipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </section>
      {/* <Footer /> */}
    </>
  );
};
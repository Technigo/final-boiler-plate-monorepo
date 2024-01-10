import "./recipeDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RecipeInfoDetails } from "./recipeDetailsComponents/recipeInfoDetails/RecipeInfoDetails";
import { HeadingDetails } from "./recipeDetailsComponents/headingDetails/HeadingDetails";
import { ImageDetails } from "./recipeDetailsComponents/imageDetails/ImageDetails"
import { DescriptionDetails } from "./recipeDetailsComponents/descriptionDetails/DescriptionDetails"
import { IngredientsDetails } from "./recipeDetailsComponents/ingredientsDetails/IngredientsDetails"
import { MethodDetails } from "./recipeDetailsComponents/methodDetails/MethodDetails"
// import { SaveButtonBig } from "../../components/buttons/saveButtonBig/SaveButtonBig" (preppet for later)
import { TabButton } from "../../components/buttons/tabButton/TabButton";
import { recipeStore } from "../../stores/recipeStore";


export const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Getting the recipe state from recipeStore
  const { recipes } = recipeStore();
  // Find the recipe with the matching 'id' from the 'recipes' array
  const foundRecipe = recipes.find((recipe) => recipe._id === id);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);

  //Setting the function HandleResize: 
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // ANVÄNDS DENNA??? SVAR: JA:)
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

  

  return (
    <>
    <section className="recipe-details">
      {isMobileView ? (
        <>
          <HeadingDetails title={foundRecipe.title} />
          <RecipeInfoDetails userInput={foundRecipe.userInput} />
          <ImageDetails src="/recipe-imgs/campfire-896196_1280.jpg" alt="outdoor cooking" />
          <DescriptionDetails description={foundRecipe.description} />
          {/* <TabButton /> */}
          <IngredientsDetails ingredients={foundRecipe.ingredients} />
          <MethodDetails instructions={foundRecipe.instructions} />
        </>
      ) : (
        <div className="details-desktop-container">
          <ImageDetails src="/recipe-imgs/campfire-896196_1280.jpg" alt="outdoor cooking" />
          <div className="details-text-container">
            <HeadingDetails title={foundRecipe.title} />
            <RecipeInfoDetails userInput={foundRecipe.userInput} />
            <DescriptionDetails description={foundRecipe.description} />
            <TabButton ingredients={foundRecipe.ingredients} instructions={foundRecipe.instructions} />
            {/* <IngredientsDetails ingredients={foundRecipe.ingredients} />
            <MethodDetails instructions={foundRecipe.instructions} /> */}
          </div>
        </div>
      )}
    </section>
  </>
  );
};
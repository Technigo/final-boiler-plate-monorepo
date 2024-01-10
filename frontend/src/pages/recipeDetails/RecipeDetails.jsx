import "./recipeDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RecipeInfoDetails } from "./recipeDetailsComponents/recipeInfoDetails/RecipeInfoDetails";
import { HeadingDetails } from "./recipeDetailsComponents/headingDetails/HeadingDetails";
import { ImageDetails } from "./recipeDetailsComponents/imageDetails/ImageDetails"
import { DescriptionDetails } from "./recipeDetailsComponents/descriptionDetails/DescriptionDetails"
import { IngredientsDetails } from "./recipeDetailsComponents/ingredientsDetails/IngredientsDetails"
import { MethodDetails } from "./recipeDetailsComponents/methodDetails/MethodDetails"
import { TabButton } from "../../components/buttons/tabButton/TabButton";
import { recipeStore } from "../../stores/recipeStore";


export const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Getting the recipe state from recipeStore
  const { recipes, fetchCollectionRecipes } = recipeStore();
  // Find the recipe with the matching 'id' from the 'recipes' array
  const foundRecipe = recipes.find((recipe) => recipe._id === id);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);
  const [loading, setLoading] = useState(true);


  //Fetching all the recipes so recipe state is updated when page is reloaded.
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCollectionRecipes();
        setLoading(false)

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false)
      }
    };
    fetchData();
  }, [fetchCollectionRecipes]);

  //Setting the function HandleResize (Components in different order depending on if its mobile/tablet or desktop)
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // This is to make the page scroll up to top automatically
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Shows the NotFound-page
  if (!foundRecipe) {
    navigate("not-found");
    return null;
  }

  if (loading) {
    return <p>Loading...</p>
  }


  return (
    <>
      <section className="recipe-details">
        {isMobileView ? (
          <>
            <HeadingDetails title={foundRecipe.title} />
            <RecipeInfoDetails userInput={foundRecipe.userInput} />
            <ImageDetails src="/recipe-imgs/campfire-896196_1280.jpg" alt="outdoor cooking" />
            <DescriptionDetails description={foundRecipe.description} />
            <IngredientsDetails ingredients={foundRecipe.ingredients} />
            <MethodDetails instructions={foundRecipe.instructions} />
          </>
        ) : (
          <div className="details-desktop-container">
            <div className="details-image-container"></div>
            {/* <ImageDetails src="/recipe-imgs/campfire-896196_1280.jpg" alt="outdoor cooking" /> */}
            <div className="details-text-container">
              <HeadingDetails title={foundRecipe.title} />
              <RecipeInfoDetails userInput={foundRecipe.userInput} />
              <DescriptionDetails description={foundRecipe.description} />
              <TabButton ingredients={foundRecipe.ingredients} instructions={foundRecipe.instructions} />
              {/* <h1>Hej</h1>
              <h1>Hej</h1>
              <h1>Hej</h1> */}
            </div>
          </div>
        )}
      </section>
    </>
  );
};
import "./recipeDetails.css";
//Importing hooks
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//Importing components
import { RecipeInfoDetails } from "../../components/recipeDetailsComponents/recipeInfoDetails/RecipeInfoDetails";
import { HeadingDetails } from "../../components/recipeDetailsComponents/headingDetails/HeadingDetails"
import { ImageDetails } from "../../components/recipeDetailsComponents/imageDetails/ImageDetails"
import { DescriptionDetails } from "../../components/recipeDetailsComponents/descriptionDetails/DescriptionDetails"
import { IngredientsDetails } from "../../components/recipeDetailsComponents/ingredientsDetails/IngredientsDetails"
import { MethodDetails } from "../../components/recipeDetailsComponents/methodDetails/MethodDetails.jsx"
import { TabButton } from "../../components/buttons/tabButton/TabButton";
//Importing recipeStore
import { recipeStore } from "../../stores/recipeStore";

export const RecipeDetails = () => {
  //Retrieve "id" parameter from the URL
  const { id } = useParams();
  // Use the useNavigate hook to programmatically navigate between pages
  const navigate = useNavigate();
  // Getting functions from recipeStore
  const { recipes, fetchCollectionRecipes } = recipeStore();
  // Find the recipe with the matching 'id' from the 'recipes' array
  const foundRecipe = recipes.find((recipe) => recipe._id === id);
  // State to track whether the view is in mobile mode
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1025);
  const [loading, setLoading] = useState(true);

  //Fetching all the recipes so recipe state is updated when page is reloaded.
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCollectionRecipes();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchCollectionRecipes]);

  //Setting the function HandleResize (components render in different order depending on if its mobile/tablet or desktop)
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1025);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // This is to make the page scroll up to top automatically
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Redirect to the NotFound-page if the recipe is not found
  if (!foundRecipe) {
    navigate("*");
    return null;
  }

  //Display a loading message while fetching recipe data
  if (loading) {
    return (
      <div className="recipe-loader-container">
        <div className="recipe-loader"></div>
        <p>
          Loading AI-generated recipes. Be patient, this might take a minute or
          two!
        </p>
      </div>
    );
  }

  // Render the component based on whether it is in mobile or desktop view
  return (
    <>
      <section className="recipe-details">
        {isMobileView ? (
          <>
            <HeadingDetails title={foundRecipe.title} />
            <RecipeInfoDetails userInput={foundRecipe.userInput} />
            <div className="details-image-container">
              <ImageDetails
                src="/recipe-imgs/campfire-896196_1280.jpg"
                alt="outdoor cooking"
              />
              {/* Overlay div for the gradient */}
              <div className="details-image-gradient-overlay"></div>{" "}

            </div>

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
              <TabButton
                ingredients={foundRecipe.ingredients}
                instructions={foundRecipe.instructions}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

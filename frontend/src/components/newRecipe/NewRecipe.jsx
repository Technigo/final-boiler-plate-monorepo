import  { useEffect, useState, useRef } from "react";
import "./newRecipe.css";
import { recipeStore } from "../../stores/recipeStore";
import { PiCookingPot } from "react-icons/pi";
import {HeadingDetails} from "../recipeDetailsComponents/headingDetails/HeadingDetails"
import {RecipeInfoDetails} from "../recipeDetailsComponents/recipeInfoDetails/RecipeInfoDetails"
import {ImageDetails} from "../recipeDetailsComponents/imageDetails/ImageDetails"
import {DescriptionDetails} from "../recipeDetailsComponents/descriptionDetails/DescriptionDetails"
import { IngredientsDetails } from "../recipeDetailsComponents/ingredientsDetails/IngredientsDetails";
import { MethodDetails } from "../recipeDetailsComponents/methodDetails/MethodDetails";
import { TabButton } from "../buttons/tabButton/TabButton";



export const NewRecipe = () => {
  const { newRecipe, errorMessageGeneration, fetchCollectionRecipes } = recipeStore();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1025);
  const recipeDetailsRef = useRef(null) //This is for scrolling

  useEffect(() => {
    // Fetch a new recipe when the component mounts
    fetchCollectionRecipes();
  }, []);

  // Check if there is an error message, stop render of newRecipe
  if (errorMessageGeneration) {
    return null
  }

  //Setting the function HandleResize (Components in different order depending on if its mobile/tablet or desktop)
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1025);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Scroll into view when the component mounts
    if (recipeDetailsRef.current) {
      recipeDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [newRecipe]); // Scroll into view whenever newRecipe changes


  return (
     <>
      <section className="recipe-details new-recipe-section" ref={recipeDetailsRef}>
        <h3 className="new-recipe-section-heading">Your freshly AI generated outdoor meal</h3>
        {isMobileView ? (
          <>
            <HeadingDetails title={newRecipe.title} />
            <RecipeInfoDetails userInput={newRecipe.userInput} />
            <div className="details-image-container">
              <ImageDetails
                src="/recipe-imgs/campfire-896196_1280.jpg"
                alt="outdoor cooking"
              />
              <div className="details-image-gradient-overlay"></div>{" "}
              {/* Adding this overlay div for the gradient */}
            </div>

            <DescriptionDetails description={newRecipe.description} />
            <IngredientsDetails ingredients={newRecipe.ingredients} />
            <MethodDetails instructions={newRecipe.instructions} />
          </>
        ) : (
          <div className="details-desktop-container">
            <div className="details-image-container"></div>
            {/* <ImageDetails src="/recipe-imgs/campfire-896196_1280.jpg" alt="outdoor cooking" /> */}
            <div className="details-text-container">
              <HeadingDetails title={newRecipe.title} />
              <RecipeInfoDetails userInput={newRecipe.userInput} />
              <DescriptionDetails description={newRecipe.description} />
              <TabButton
                ingredients={newRecipe.ingredients}
                instructions={newRecipe.instructions}
              />
            </div>
          </div>
        )}
      </section>
    </>
  )


}


// export const NewRecipe = () => {
//   // Destructure values from the recipeStore
//   const { newRecipe, errorMessageGeneration, fetchCollectionRecipes } = recipeStore();

//   // useEffect(() => {
//   //   // Fetch a new recipe when the component mounts
//   //   fetchNewRecipe();
//   // }, [fetchNewRecipe]);

//   useEffect(() => {
//     // Fetch a new recipe when the component mounts
//     fetchCollectionRecipes();
//   }, []);

//   // Check if there is an error message, stop render of newRecipe
//   if (errorMessageGeneration) {
//     return null
//   }

//   // Check if there is no new recipe yet, and return null if true
//   // if (!newRecipe) {
//   //   return null; // Don't render anything if there is no new recipe yet
//   // }

//   // Render the new recipe details if there is no error and a new recipe is available

//   // Function to capitalise the first letter of a word in object
//   const capitalizeKeys = (obj) => {
//     const newObj = {};
//     for (const key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
//         newObj[capitalizedKey] = obj[key];
//       }
//     }
//     return newObj;
//   };
//   return (
    
//     <>
//     <section className="recipe-details">
//         <h1>{newRecipe.title}</h1>

//         <div className="recipe-info">
//           <div className="servings">
//             <PiCookingPot /> <p>Serves 2 people</p>
//           </div>
//           <div className="user-input-details">
//             {newRecipe.userInput.map((ingredient, ingredientIndex) => (
//               <div className="input-tag-details" key={ingredientIndex}>{ingredient}</div>
//             ))}
//           </div>
//         </div>

//         <img src="/recipe-imgs/campfire-896196_1280.jpg" alt="" />
//         {/* Prepped for later <div className="save-recipe"><SaveButtonBig /></div> */}

//         <p className="description">{newRecipe.description}</p>

//         <TabButton />

//         <h3>Ingredients</h3>
//         {/*Mapping the ingredients: */}

//         <ul>
//           {Object.entries(capitalizeKeys(newRecipe.ingredients)).map(
//             ([ingredient, quantity], i) => (
//               <li key={i}>{`${ingredient}: ${quantity}`}</li>
//             )
//           )}
//         </ul>

//         <h3>Method:</h3>
//         <ol>
//           {newRecipe.instructions.map((instruction, index) => (
//             <li key={index}>{instruction}</li>
//           ))}
//         </ol>
//       </section>
    
    
//     </>
   
//   );
// };



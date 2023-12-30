import { Link } from "react-router-dom";

import "./collectionRecipe.css";

const imageUrls = [
  "/recipe-imgs/campfire-896196_1280.jpg",
  "/recipe-imgs/camping-cooker-1853680_1280.jpg",
  "/recipe-imgs/picnic-4246724_1280.jpg",
  "/recipe-imgs/pot-5901086_1280.jpg",
]; //These can be moved to a json-file later!

export const CollectionRecipe = ({ recipe, index }) => {
  // Calculate the index of the image to use based on the recipe index
  const imageIndex = index % imageUrls.length;
  const selectedImageUrl = imageUrls[imageIndex]

  return (
    <Link
      to={`/recipe-details/${recipe._id}`}
      className="collection-recipe-link"
    >
      <section className="collection-recipe-card">
        <div className="collection-recipe-image-container">
          <img src={selectedImageUrl} alt={recipe.title} />
        </div>
        <h2>{recipe.title}</h2>

        <p>
          <strong>User's ingredients:</strong> {recipe.userInput}
        </p>
      </section>
    </Link>
  );
};

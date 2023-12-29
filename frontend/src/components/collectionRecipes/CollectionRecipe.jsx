// recipe card, prepped for later

import "./collectionRecipe.css";

const imageUrls = [
  "/src/assets/recipe-imgs/campfire-896196_1280.jpg",
  "/src/assets/recipe-imgs/camping-cooker-1853680_1280.jpg",
  "/src/assets/recipe-imgs/picnic-4246724_1280.jpg",
  "/src/assets/recipe-imgs/pot-5901086_1280.jpg",
]; //These can be moved to a json-file later!

export const CollectionRecipe = ({ recipe, index }) => {
  // Calculate the index of the image to use based on the recipe index
  const imageIndex = index % imageUrls.length;

  return (
    <section className="collection-recipe-card">
      <div className="collection-recipe-image-container">
        <img src={imageUrls[imageIndex]} alt={recipe.title} />
      </div>
      <h2>{recipe.title}</h2>

      <p>
        <strong>User input:</strong> {recipe.userInput}
      </p>
      {/* <p>
        <strong>Description:</strong> {recipe.description}
      </p>
      <p>
        <strong>Ingredients:</strong>
      </p>
      {recipe.ingredients ? (
        <ul>
          {Object.entries(recipe.ingredients).map(
            ([ingredient, quantity], i) => (
              <li key={i}>{`${ingredient}: ${quantity}`}</li>
            )
          )}
        </ul>
      ) : (
        <p>No ingredients available.</p>
      )}
      <div>
        <p>
          <strong>Instructions:</strong>
        </p>
        {recipe.instructions ? (
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        ) : (
          <p>No instructions available.</p>
        )}
      </div> */}
    </section>
  );
};

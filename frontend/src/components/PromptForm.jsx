// Mounted in page: Login. Represents a form where users can input a list of ingredients, submit the form, and receive a generated recipe. 
import './promptform.css';
import { recipeStore } from '../stores/recipeStore';

// Define the PromptForm component
export const PromptForm = () => {
  // Destructure the functions from the recipeStore
  const { inputRecipe, setInputRecipe, fetchNewRecipe, generateRecipe, fetchCollectionRecipes, isVegetarian, setIsVegetarian, isGlutenFree, setIsGlutenFree } = recipeStore()


  // Define the form submission handler function
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      //Use the generateRecipe function from the recipeStore
      await generateRecipe(inputRecipe)

      //Clear inputRecipe and fetch new recipe data
      setInputRecipe([])
      fetchNewRecipe()


    } catch (error) {
      console.error("Error in handleFormSubmit", error)
    }
  };

  const handleIngredientChange = (index, value) => {
    const updatedInputRecipe = [...inputRecipe];
    updatedInputRecipe[index] = value;
    setInputRecipe(updatedInputRecipe);
  };

  // Placeholder texts for each textarea
  const placeholders = ["E.g. Pasta", "E.g. Egg", "E.g. Basil"];

  // Render the component. Form element
  return (
    <div className="promptform-wrapper">
      {/* <h2>Generate a camping stove-friendly recipe for your outdoor adventure!</h2> */}
      <div className="promptform-box">
        <h3 className="instruction-text">Enter ingredients of your choice and let AI do the rest:</h3>
        <form className="ingredient-form" onSubmit={handleFormSubmit}>
          <div className="textareas-container">
            {[1, 2, 3].map((index) => (
              <textarea
                key={index}
                placeholder={placeholders[index - 1]}
                value={inputRecipe[index - 1] || ''}
                onChange={(e) => handleIngredientChange(index - 1, e.target.value)}
                required={index === 1} //only the first field is required
              ></textarea>
            ))}
          </div>
          <div className="checkbox-options">
            <label>
              <input
                type="checkbox"
                checked={isVegetarian}
                onChange={(e) => setIsVegetarian(e.target.checked)}
              />
              Vegetarian
            </label>

            <label>
              <input
                type="checkbox"
                checked={isGlutenFree}
                onChange={(e) => setIsGlutenFree(e.target.checked)}
              />
              Gluten-free
            </label>

          </div>

          <button className="generate-button" type="submit">
            Generate Recipe
          </button>
        </form>
      </div>
    </div>

  );
};
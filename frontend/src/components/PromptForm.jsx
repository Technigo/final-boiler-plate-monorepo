// Mounted in page: Login. Represents a form where users can input a list of ingredients, submit the form, and receive a generated recipe. 
import './promptform.css';
import { recipeStore } from '../stores/recipeStore';

// Define the PromptForm component
export const PromptForm = () => {
  // Destructure the addNewRecipe function from the recipeStore
  const { inputRecipe, setInputRecipe, fetchNewRecipe, generateRecipe, errorMessageGeneration, isVegetarian, setIsVegetarian, isGlutenFree, setIsGlutenFree, isLactoseFree, setIsLactoseFree } = recipeStore()


  // Define the form submission handler function
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      //TESTAR DENNA NYA FUNKTION FÖR ATT GÖRA INPUTEN TILL EN ARRAY
      console.log(inputRecipe)
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
  const placeholders = ["(e.g. pasta)", "(e.g. egg", "(e.g. basil)"];

  // Render the component. Form element
  return (
    <div className="promptform-wrapper">
      <h2>Generate a camping stove-friendly recipe for your outdoor adventure!</h2>
      <p className="instruction-text">Input 1-3 ingredients of your choice:</p>
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

          <label>
            <input
              type="checkbox"
              checked={isLactoseFree}
              onChange={(e) => setIsLactoseFree(e.target.checked)}
            />
            Lactose-free
          </label>
        </div>

        <button className="generate-button" type="submit">
          Create recipe using AI
        </button>
      </form>
    </div>
  );
};
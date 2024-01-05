// Mounted in page: Login. Represents a form where users can input a list of ingredients, submit the form, and receive a generated recipe. 
import './promptform.css';
import { recipeStore } from '../stores/recipeStore';

// Define the PromptForm component
export const PromptForm = () => {
    // Destructure the addNewRecipe function from the recipeStore
    const { inputRecipe, setInputRecipe, fetchNewRecipe, generateRecipe } = recipeStore()

    //Handle userInput(ingredients) to make into array and split of 5 first words
    const handleUserInputToArray = (userInput) => {
        const array = userInput.split(/[ ,]+/)
        const limitedArray = array.slice(0, 5)
        return limitedArray
    }

    // Define the form submission handler function
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
           //TESTAR DENNA NYA FUNKTION FÖR ATT GÖRA INPUTEN TILL EN ARRAY
            console.log(handleUserInputToArray(inputRecipe))
             //Use the generateRecipe function from the recipeStore
            await generateRecipe(inputRecipe)


            //Clear inputRecipe and fetch new recipe data
            setInputRecipe("")
            fetchNewRecipe()



        } catch (error) {
            console.error("Error in handleFormSubmit", error)
        }

    };

    // Render the component. Form element
    return (
        <div className="promptform-wrapper">
            <h2>Generate a recipe for your next outdoor adventure!</h2>
            <form className="ingredient-form" onSubmit={handleFormSubmit}>
                <textarea
                    placeholder="Input 1-3 ingredients..."
                    value={inputRecipe}
                    onChange={(e) => setInputRecipe(e.target.value)}
                    required
                ></textarea>
                <button className="generate-button"type="submit">Create recipe using AI</button>
            </form>
        </div>
    );
};
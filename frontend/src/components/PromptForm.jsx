// Mounted in page: Login. Represents a form where users can input a list of ingredients, submit the form, and receive a generated recipe. 
import './promptform.css';
import { recipeStore } from '../stores/recipeStore';

// Define the PromptForm component
export const PromptForm = () => {
    // Destructure the addNewRecipe function from the recipeStore
    const { inputRecipe, setInputRecipe, fetchNewRecipe, generateRecipe,errorMessageGeneration } = recipeStore()


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

    // Render the component. Form element
    return (
        <div className="promptform-wrapper">
            <h2>Generate a recipe for your next outdoor adventure!</h2>
            <form className="ingredient-form" onSubmit={handleFormSubmit}>
                <textarea
                    placeholder="Ingredient 1"
                    value={inputRecipe}
                    onChange={(e) => setInputRecipe(e.target.value)}
                    required
                ></textarea>
                <textarea
                    placeholder="Ingredient 2"
                    value={inputRecipe}
                    onChange={(e) => setInputRecipe(e.target.value)}
                    required
                ></textarea>
                <textarea
                    placeholder="Ingredient 3"
                    value={inputRecipe}
                    onChange={(e) => setInputRecipe(e.target.value)}
                    required
                ></textarea>
                <p className="error-message">{errorMessageGeneration}</p>
                <button className="generate-button"type="submit">Create recipe using AI</button>
            </form>
        </div>
    );
};
// Mounted in page: Login. Represents a form where users can input a list of ingredients, submit the form, and receive a generated recipe. 

import React, { useState } from 'react';
import './promptform.css';
import { recipeStore } from '../stores/recipeStore';

// Define the PromptForm component
export const PromptForm = () => {
    // Destructure the addNewRecipe function from the recipeStore
    const { addNewRecipe, inputRecipe, setInputRecipe, fetchNewRecipe } = recipeStore()

    // Define the form submission handler function
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // Define the API endpoint for posting new recipes
            const postAPI = 'http://localhost:3001/generate-recipe';

            // Create an object with the input recipe data
            const newRecipeData = {
                ingredients: inputRecipe
            };

            // Make a POST request to the API with the input data
            const response = await fetch(postAPI, {
                method: 'POST',
                body: JSON.stringify(newRecipeData),
                headers: { 'Content-Type': 'application/json' },
            });

            // Check if the response is not okay
            if (!response.ok) {
                throw new Error(`Oh no, error, HTTP! ${response.status}`);
            }

            // Parse the JSON response and add the new recipe to the state
            const data = await response.json();
            addNewRecipe(data);
            setInputRecipe('');
            fetchNewRecipe()
        } catch (error) {
            console.error('Error in handleFormSubmit:', error);
        }
    };

    

    // Render the component. Form element
    return (
        <div className="promptform-wrapper">
            <h1>OpenAIrFeast</h1>
            <form onSubmit={handleFormSubmit}>
                <textarea
                    placeholder="Your ingredients"
                    value={inputRecipe}
                    onChange={(e) => setInputRecipe(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Create recipe 🥘</button>
            </form>
        </div>
    );
};
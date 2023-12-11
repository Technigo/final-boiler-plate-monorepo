
import React, { useState } from 'react';
import './promptform.css';

export const PromptForm = ({ addNewRecipe }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [inputRecipe, setInputRecipe] = useState('');

    const handleFormSubmit = async (event) => {
        try {
            event.preventDefault();

            const postAPI = 'http://localhost:3001/generate-recipe';

            const newRecipeData = {
                ingredients: inputRecipe,
                instructions: "Your instructions here",
            };

            const response = await fetch(postAPI, {
                method: 'POST',
                body: JSON.stringify(newRecipeData),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Oh no, error, HTTP! ${response.status}`);
            }

            const data = await response.json();

            addNewRecipe(data);
            setInputRecipe('');
        } catch (error) {
            console.error('Error in handleFormSubmit:', error);
        }
    };

    return (
        <div className="promptform-wrapper">
            <h1>OpenAIrFeasts</h1>
            <form onSubmit={handleFormSubmit}>
                <textarea
                    placeholder="Your ingredients"
                    value={inputRecipe}
                    onChange={(e) => setInputRecipe(e.target.value)}
                    required
                ></textarea>
                <p>{errorMessage}</p>
                <button type="submit">Create recipe 🥘</button>
            </form>
        </div>
    );
};
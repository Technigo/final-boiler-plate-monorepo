import { RecipeModel } from "../models/RecipeModel";
import asyncHandler from "express-async-handler";

//const OPENAI_API_KEY = ""

// Controller for handling the POST request to generate a new recipe
export const postGenerateRecipeController = asyncHandler(async (req, res) => {
    try {
        // Destructure the "ingredients" from the request body
        const { ingredients } = req.body

        //If no ingredients (falsy) or if ingredients (inputRecipe) is empty string:
        if (!ingredients || ingredients.trim().length === 0) {
            return res.status(400).json({ error: 'Ingredients are required.' });
        }

        // ***** IN PURPOSE OF DEMONSTRATION, a placeholder generated recipe is provided for now***
        const generatedRecipe = "Tänd gasen och hacka löken."

        // Create a new RecipeModel with the provided ingredients and generatedRecipe
        // const newRecipe = new RecipeModel({ ingredients, instructions: generatedRecipe })
        // // Save the new recipe to the database
        // await newRecipe.save()
        // // Respond with the created recipe
        // res.status(201).json({ recipe: newRecipe })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to create a new recipe." });
    }
})

// Controller for handling the GET request to retrieve all recipes
export const getRecipeController = asyncHandler(async (req, res) => {
    try {
        // Retrieve all recipes from the RecipeModel
        const recipes = await RecipeModel.find()
        // Respond with the array of recipes
        res.status(200).json({ recipes })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to retrieve recipes.' });
    }
})
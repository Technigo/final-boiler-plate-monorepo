import { RecipeModel } from "../models/RecipeModel";
import asyncHandler from "express-async-handler";

//const OPENAI_API_KEY = ""

// Controller for handling the POST request to generate a new recipe
export const postGenerateRecipeController = asyncHandler(async (req, res) => {
    try {
        // Destructure the "ingredients" from the request body
        const { ingredients } = req.body

        // Check if ingredients are provided and have at least 3 items
        if (!ingredients || ingredients.length < 3) {
            return res.status(400).json({ error: "Please provide at least 3 ingredients" })
        }
        // ***** FOR DEMONSTRATION PURPOSES, a placeholder generated recipe is provided for now***
        const generatedRecipe = "Tänd gasen och hacka löken."

        // Create a new RecipeModel with the provided ingredients and generatedRecipe
        const newRecipe = new RecipeModel({ ingredients, instructions: generatedRecipe })
        // Save the new recipe to the database
        await newRecipe.save()
        // Respond with the created recipe
        res.status(201).json({ recipe: newRecipe })

    } catch (error) {
        res.status(500).json(error);
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
import { RecipeModel } from "../models/RecipeModel";
import asyncHandler from "express-async-handler";



//const OPENAI_API_KEY = ""


// export const getListEndController = asyncHandler(async (req, res) => {
//     const endpoints = {
//         endpoints: listEndpoints(router),
//     };
//     res.json(endpoints);
// }
// )

export const postGenerateRecipeController = asyncHandler(async (req, res) => {
    try {
        const { ingredients } = req.body

        if (!ingredients || ingredients.length < 3) {
            return res.status(400).json({ error: "Please provide at least 3 ingredients" })
        }

        const generatedRecipe = "Tänd gasen och hacka löken."

        const newRecipe = new RecipeModel({ ingredients, instructions: generatedRecipe })
        await newRecipe.save()

        res.status(201).json({ recipe: newRecipe })

    } catch (error) {
        res.status(500).json(error);
    }
})

export const getRecipeController = asyncHandler(async (req, res) => {
    try {
        const recipes = await RecipeModel.find()
        res.status(200).json({ recipes })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
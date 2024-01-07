import { RecipeModel } from "../models/RecipeModel";
import asyncHandler from "express-async-handler";

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

export const searchRecipesController = asyncHandler(async (req, res) => {
    const { query } = req.params;
    console.log("Search query:", query)
  
    try {
      const searchWords = query.split(',').map(word => new RegExp(word.trim(), 'i'));

      const recipes = await RecipeModel.find({ 
        "searchWords": { $in: searchWords },
      });

      if (recipes.length === 0) {
        return res.status(404).json({ error: "No recipes found for the specified query" });
    }console.log("Found recipes:", recipes)

      res.status(200).json({ recipes, success: true });
      
    } catch (error) {
      console.error("Error searching recipes:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });
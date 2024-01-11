// This contain two controllers for handling two types of GET requests. One to handle GET requests to retrieve all recipes. One to handle GET requetsts to search for specific recipes.

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

// Controller for handling GET request to search specfic recipes
export const searchRecipesController = asyncHandler(async (req, res) => {
  // Extract the query parameter from the request  
  const { query } = req.params;
  console.log("Search query:", query)

  try {
    const searchWords = query.split(',').map(word => new RegExp(word.trim(), 'i'));

    const recipes = await RecipeModel.find({
      "searchWords": { $in: searchWords },
    });

    // If no recipes are found, respond with a 404 status code and an error message
    if (recipes.length === 0) {
      return res.status(404).json({ error: "No recipes found for the specified query" });
    } console.log("Found recipes:", recipes)
    // Respond with the array of found recipes and a success message
    res.status(200).json({ recipes, success: true });

  } catch (error) {
    // Handle errors and respond with a 500 status code
    console.error("Error searching recipes:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
// Defines an Express router for handling and listing the available endpoints

import express from "express";
import asyncHandler from "express-async-handler";
import {
    getRecipeController,
    postGenerateRecipeController,
} from "../controllers/recipeController";

// Create an instance of the Express router
const router = express.Router()

const listEndpoints = require("express-list-endpoints")

// Route to list available endpoints
router.get("/", asyncHandler(async (req, res) => {
    const endpoints = {
        endpoints: listEndpoints(router),
    };
    // Respond with the list of endpoints
    res.json(endpoints);
}));

router.post("/generate-recipe", postGenerateRecipeController);

router.get("/recipes", getRecipeController);

export default router


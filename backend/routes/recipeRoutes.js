import express from "express";
import asyncHandler from "express-async-handler";
import {
    // getListEndController,
    getRecipeController,
    postGenerateRecipeController,
} from "../controllers/recipeController";

// Create an instance of the Express router
const router = express.Router()

const listEndpoints = require("express-list-endpoints")

router.get("/", asyncHandler(async (req, res) => {
    const endpoints = {
        endpoints: listEndpoints(router),
    };
    res.json(endpoints);
}));

router.post("/generate-recipe", postGenerateRecipeController);

router.get("/recipes", getRecipeController);

export default router


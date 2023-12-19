// Defines a Mongoose schema for recipes and creates a Mongoose model based on that schema. Exports the model for use in other parts of the application

import mongoose from "mongoose";

const { Schema } = mongoose;

export const recipeSchema = new Schema(
    {
        userInput: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        ingredients: {
            type: [String],
            required: true,
        },
        
        instructions: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)

export const RecipeModel = mongoose.model("Recipe", recipeSchema);
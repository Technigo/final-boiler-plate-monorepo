// Defines a Mongoose schema for recipes and creates a Mongoose model based on that schema. Exports the model for use in other parts of the application

import mongoose from "mongoose";

const { Schema } = mongoose;


export const recipeSchema = new Schema(
    {
        userInput: {
            type: Array,
            required: true,
        },

        searchWords: {
            type: String, 
            required: true
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
            type: Object,
            required: true,
        },
        
        instructions: {
            type: [String],
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)

// Create a text index on the userInput field for text searches
recipeSchema.index({ userInput: 'text' });

export const RecipeModel = mongoose.model("Recipe", recipeSchema);
import mongoose from "mongoose";

const { Schema } = mongoose;

export const recipeSchema = new Schema(
    {
        ingredients: {
            type: String,
            required: true,
        },

        instructions: {
            type: String,
            reqiured: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)

export const RecipeModel = mongoose.model("Recipe", recipeSchema);
// This controller defines a function that uses the OpenAI API to generate text based on a user-provided prompt. It includes error handling and sends a JSON response with the generated text or an error message

import OpenAI from "openai";
import { RecipeModel } from "../models/RecipeModel";

// Create an instance of the OpenAI class with provided API key (in .env-file)
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

// Define the generateText function, which handles text generation using the OpenAI API
const generateText = async (req, res) => {
  // Extract the "prompt" from the request body
  const { prompt } = req.body;
  console.log(prompt);

  try {
    // Use the OpenAI API to generate text using the chat completions endpoint
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            'You are a helpful assistant designed to output JSON. You will be creating a recipe based on 1-3 main ingredients the user will give you. The recipe should be designed to be cooked on a portable camping stove with one heater, no temperature control, consisting of one frying-pan and/or one saucepan. Generate a recipe for a dish, that serves 2 people, with the following specifications: title: [Your Title Here] description: [Your Description Here] ingredients: [ ingredient: "amount" ] instructions: [Your Instructions Here]. If an ingredient requires specific details like weight and amount, include that as well. Use grams and millilitres. Use British English. Important: If the user provides inappropriate or non-existing ingredients, please respond with an array with the string : [Sorry I don\'t understand]',
        },
        {
          role: "user",
          content: `These are the main ingredients: ${prompt}`,
        },
        {
          role: "assistant",
          content:
            '{\n    "title": "[Your Title Here]",\n    "description": "[Your Description Here]",\n    "ingredients": {\n      "Ingredient1": "[amount1]",\n      "Ingredient2": "[amount2]",\n      "Ingredient3": "[amount3]",\n      "...": "..."\n    },\n    "instructions": [\n      "[Step 1]",\n      "[Step 2]",\n      "[Step 3]",\n      "..."\n    ]\n}',
        },
      ],
      model: "gpt-3.5-turbo-1106",
      // Specify the response format as a JSON object
      response_format: { type: "json_object" },
      temperature: 0.5, // Adjust this value based on your preference. Lower values (e.g., 0.2) will make the output more deterministic and focused, potentially reducing token usage.
    });

    // Extract the generated text from the API respons
    const generatedRecipe = response.choices[0].message.content;

    //Checking if the response is inappropriate or non-existing:
    if (generatedRecipe.includes("Sorry I don't understand")) {
      const errorMessage =
        "You have provided invalid or non-existing ingredients. Please try again!";
      console.error(errorMessage);
      // Handle the case where the user provided inappropriate or non-existing ingredients
      return res.status(400).json({
        success: false,
        error: errorMessage,
      });
    }
    const generatedRecipeObject = JSON.parse(generatedRecipe);
    const title = generatedRecipeObject.title;
    const description = generatedRecipeObject.description;
    const ingredients = generatedRecipeObject.ingredients;
    const instructions = generatedRecipeObject.instructions;
    console.log(generatedRecipeObject);

    // Create a new RecipeModel with the provided ingredients and generatedRecipe
    const newRecipe = new RecipeModel({
      userInput: prompt,
      title: title,
      description: description,
      ingredients: ingredients,
      instructions: instructions,
    });

    console.log(newRecipe);
    // Save the new recipe to the database
    await newRecipe.save();

    // Respond with the created recipe
    res.status(201).json({ recipe: newRecipe, success: true });

  } catch (error) {
    // Handle errors that may occur during the API request
    if (error.response) {
      // Log details of the API response error
      console.log("Status", error.response.status);
      console.log("Data", error.response.data);
    } else {
      // Log other types of errors
      console.log("Message", error.message);
    }

    // Send a JSON response with error status and message
    res.status(400).json({
      success: false,
      error: "The recipe could not be generated",
    });
  }
};

// Export the generateText function to make it accessible in other parts of the application
module.exports = { generateText };

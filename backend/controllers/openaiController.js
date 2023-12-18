// This controller defines a function that uses the OpenAI API to generate text based on a user-provided prompt. It includes error handling and sends a JSON response with the generated text or an error message

import OpenAI from "openai";
import { RecipeModel } from "../models/RecipeModel";

// Create an instance of the OpenAI class with provided API key (in .env-file)
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

// Define the generateText function, which handles text generation using the OpenAI API
const generateText = async (req, res) => {
  // Extract the "prompt" from the request body
  const { prompt } = req.body
  try {
    // Use the OpenAI API to generate text using the chat completions endpoint
    const response = await openai.chat.completions.create({
      messages: [
        // System message to define the assistant's role and purpose 
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        // User message containing the provided prompt
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo-1106",
      // Specify the response format as a JSON object
      response_format: { type: "json_object" },
      temperature: 1, // Adjust this value based on your preference. Lower values (e.g., 0.2) will make the output more deterministic and focused, potentially reducing token usage.
    });

    // Extract the generated text from the API response
    const generatedInstructions = response.choices[0].message.content
    // Create a new RecipeModel with the provided ingredients and generatedRecipe
    const newRecipe = new RecipeModel({
      ingredients: prompt, 
      instructions: generatedInstructions
    })
    // Save the new recipe to the database
    await newRecipe.save()

    // Respond with the created recipe
    res.status(201).json({ recipe: newRecipe })

    // Log the generated text to the console
    console.log(generatedInstructions)

    // Send a JSON response with success status, API response data, and the generated answer
    // res.status(200).json({
    //   success: true,
    //   data: response,
    //   answer: generatedInstructions, 
    // })

  } catch (error) {
    // Handle errors that may occur during the API request
    if (error.response) {
      // Log details of the API response error
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      // Log other types of errors
      console.log(error.message);
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

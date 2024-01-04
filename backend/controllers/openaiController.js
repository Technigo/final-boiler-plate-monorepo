// This controller defines a function that uses the OpenAI API to generate text based on a user-provided prompt. It includes error handling and sends a JSON response with the generated text or an error message

import OpenAI from "openai";
import { RecipeModel } from "../models/RecipeModel";

// Create an instance of the OpenAI class with provided API key (in .env-file)
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

// Define the generateText function, which handles text generation using the OpenAI API
const generateText = async (req, res) => {
  // Extract the "prompt" from the request body
  const { prompt } = req.body
  console.log(prompt)
  
  try {
    // Use the OpenAI API to generate text using the chat completions endpoint
    const response = await openai.chat.completions.create({
      messages: [
        // System message to define the assistant's role and purpose 
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON."
        },
        // User message containing the provided prompt
        { role: "user", content: `You will be creating a recipe based on 1-3 main ingredients the user will give you. The recipe should be designed to be cooked on a portable camping stove with one heater, no temperature control, consisting of one frying-pan and/or one saucepan.  Generate a recipe for a dish, that serves 2 people, with the following specifications: title: [Your Title Here] description: [Your Description Here] ingredients: [ ingredient: "amount" ] instructions: [Your Instructions Here]. All keywords must have a value. If an ingredient requires specific details like weight and amount, include that as well. Use grams and millilitres. Recipe should be designed for 2 people. These are the main ingredients: ${prompt}` },
      ],
      model: "gpt-3.5-turbo-1106",
      // Specify the response format as a JSON object
      response_format: { type: "json_object" },
      temperature: 1, // Adjust this value based on your preference. Lower values (e.g., 0.2) will make the output more deterministic and focused, potentially reducing token usage.
    });

    // Extract the generated text from the API respons
    const generatedRecipe = response.choices[0].message.content
    const generatedRecipeObject = JSON.parse(generatedRecipe)
    const title = generatedRecipeObject.title
    const description = generatedRecipeObject.description
    const ingredients = generatedRecipeObject.ingredients
    const instructions = generatedRecipeObject.instructions
    console.log(generatedRecipeObject)
   

    // Create a new RecipeModel with the provided ingredients and generatedRecipe
    const newRecipe = new RecipeModel({
      userInput: prompt,
      title: title,
      description: description,
      ingredients: ingredients,
      instructions: instructions,
    })

    console.log(newRecipe)
    // Save the new recipe to the database
    await newRecipe.save()

    // Respond with the created recipe
    res.status(201).json({ recipe: newRecipe })

    // Log the generated text to the console
    // console.log(generatedRecipe)

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

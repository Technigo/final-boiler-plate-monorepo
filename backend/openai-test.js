// Utilizes the OpenAI API to generate text using the chat completions endpoint

import OpenAI from "openai";

// Create an instance of the OpenAI class without providing an API key
const openai = new OpenAI();

// Define an asynchronous function named "main"
async function main() {
  // Use the OpenAI API to generate text using the chat completions endpoint
  const completion = await openai.chat.completions.create({
    // Specify a system message to define the assistant's role and purpose
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  // Log the generated completion (response) to the console
  console.log(completion.choices[0]);
}

// Call the "main" function to execute the text generation
main();
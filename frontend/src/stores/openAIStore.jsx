// A store using Zustand, a state management library for React. This store manages the state related to OpenAI responses

import { create } from "zustand";

// Create a Zustand store named "openAIStore"
export const openAIStore = create((set) => ({
  // Initial state with "openAiResponse" set to null
  openAiResponse: null,

  // Function to generate an OpenAI completion
  generateOpenAiCompletion: async (ingredients) => {
    try {
      // Send a POST request to the OpenAI server to generate text
      const response = await fetch("http://localhost:3001/openai/generateText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: ingredients,
        }),
      });

      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error(`Error generating OpenAI completion. Status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();

      console.log(data.answer)

      // Update the state with the OpenAI response
      set({ openAiResponse: data });

    } catch (error) {
      // Log and handle errors that occur during the request
      console.error("Error generating OpenAI completion:", error);
    }
  },
}));
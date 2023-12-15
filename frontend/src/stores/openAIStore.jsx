import { create } from "zustand";

export const openAIStore = create((set) => ({
  openAiResponse: null,

  generateOpenAiCompletion: async (ingredients) => {
    try {
      const response = await fetch("http://localhost:3001/openai/generateText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: ingredients, 
        }),
      });

      if (!response.ok) {
        throw new Error(`Error generating OpenAI completion. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.answer)
      set({ openAiResponse: data });

    } catch (error) {
      console.error("Error generating OpenAI completion:", error);
    }
  },
}));
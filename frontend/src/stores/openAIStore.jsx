import { create } from "zustand";

export const openAIStore = create((set) => ({
  openAiResponse: null,

  generateOpenAiCompletion: async (messages) => {
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "", // Replace with your actual OpenAI API key
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error generating OpenAI completion. Status: ${response.status}`);
      }

      const data = await response.json();
      set({ openAiResponse: data });

    } catch (error) {
      console.error("Error generating OpenAI completion:", error);
    }
  },
}));
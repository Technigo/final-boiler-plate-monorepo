// YourReactComponent.jsx
import React, { useState } from "react";
import { openAIStore } from "../stores/openAIStore";

export const TestOpenAI = () => {
  const [userInput, setUserInput] = useState("");
  const openAiStore = openAIStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: userInput },
    ];

    await openAiStore.generateOpenAiCompletion(messages);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit">Generate OpenAI Completion</button>
      </form>

      {openAiStore.openAiResponse && (
        <div>
          <strong>OpenAI Response:</strong>
          <pre>{JSON.stringify(openAiStore.openAiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};


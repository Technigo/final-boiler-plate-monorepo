// YourReactComponent.jsx
import React, { useState } from "react";
import { openAIStore } from "../stores/openAIStore";

export const TestOpenAI = () => {
  const [userInput, setUserInput] = useState("");
  const {generateOpenAiCompletion} = openAIStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInput)

    await generateOpenAiCompletion(userInput);
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
    </div>
  );
};


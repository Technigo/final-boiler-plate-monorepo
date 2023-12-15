// Component that utilizes the Zustand store (openAIStore) to interact with the OpenAI API
import React, { useState } from "react";
import { openAIStore } from "../stores/openAIStore";


export const TestOpenAI = () => {
  // Use the "useState" hook to manage the state of "userInput"
  const [userInput, setUserInput] = useState("");

  // Destructure the "generateOpenAiCompletion function from the "openAIStore"
  const { generateOpenAiCompletion } = openAIStore();

  // Define a function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userInput)
    // Call the "generateOpenAiCompletion" function with the "userInput"
    generateOpenAiCompletion(userInput);
  };

  // Render the TestOpenAI component
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


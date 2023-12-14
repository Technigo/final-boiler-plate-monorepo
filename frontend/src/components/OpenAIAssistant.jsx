import { useState } from "react";
import openai from "openai";

// Initialize OpenAI API with your key from .env
const openaiInstance = new openai.OpenAIAPI(process.env.REACT_APP_OPENAI_API_KEY);

const OpenAIAssistant = () => {
    const [prompt, setPrompt] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);

        try {
            const response = await openaiInstance.Completion.create({
                engine: "text-davinci-003",
                prompt: prompt,
                temperature: 0.5,
                max_tokens: 200,
            });

            setApiResponse(response.choices[0].text);
        } catch (error) {
            console.error("Error generating response:", error);
            setApiResponse("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask a question..."
            />
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "Generating..." : "Generate Response"}
            </button>
            {apiResponse && (
                <div>
                    <strong>Assistant's Response:</strong>
                    <p>{apiResponse}</p>
                </div>
            )}
        </div>
    );
};

export default OpenAIAssistant;
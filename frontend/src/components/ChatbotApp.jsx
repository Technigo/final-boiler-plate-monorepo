import { useState } from "react"
const { Configuration, OpenAIApi } = require("openai");

const ChatbotApp = () => {
    const configuration = new Configuration({
        apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);
    const [prompt, setPrompt] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 0.5,
                max_tokens: 4000,
            });
            //console.log("response", result.data.choices[0].text);
            setApiResponse(result.data.choices[0].text);
        } catch (e) {
            //console.log(e);
            setApiResponse("Something is going wrong, Please try again.");
        }
        setLoading(false);
    };


    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: '100vh',
                }}
            >
                <form onSubmit={handleSubmit}>
                    <textarea
                        type="text"
                        value={prompt}
                        placeholder="Please ask to openai"
                        onChange={(e) => setPrompt(e.target.value)}
                    ></textarea>
                    <button
                        disabled={loading || prompt.length === 0}
                        type="submit"
                    >
                        {loading ? "Generating..." : "Generate"}
                    </button>
                </form>
            </div>
            {apiResponse && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <pre>
                        <strong>API response:</strong>
                        {apiResponse}
                    </pre>
                </div>
            )}
        </>
    );
};


export default ChatbotApp;
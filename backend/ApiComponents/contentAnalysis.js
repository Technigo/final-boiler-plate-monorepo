import language from "@google-cloud/language";

const client = new language.LanguageServiceClient();

const analyzePostTone = async (text) => {
  const document = {
    content: text,
    type: "PLAIN_TEXT",
  };

  try {
    const [result] = await client.analyzeSentiment({ document: document });
    return result; // Contains sentiment analysis results
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw error; // Rethrow the error for further handling
  }
};

export { analyzePostTone };

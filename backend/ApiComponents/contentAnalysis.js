const fetch = require("node-fetch");

const analyzeTextWithApiKey = async (text) => {
  const apiKey = process.env.GOOGLE_LANGUAGE_KEY;
  const apiEndpoint = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`;

  const requestBody = {
    document: {
      content: text,
      type: "PLAIN_TEXT",
    },
  };

  console.log("Sending request to Google API with body:", requestBody);

  const response = await fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "Content-Type": "application/json" },
  });

  console.log("Response from Google API:", response);

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error("Error details from Google API:", errorDetails);
    throw new Error(`Error in Google API: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("Response data:", data);
  return data;
};

export { analyzeTextWithApiKey };

// import language from "@google-cloud/language";

// const client = new language.LanguageServiceClient();

// const analyzePostTone = async (text) => {
//   const document = {
//     content: text,
//     type: "PLAIN_TEXT",
//   };

//   try {
//     const [result] = await client.analyzeSentiment({ document: document });
//     return result; // Contains sentiment analysis results
//   } catch (error) {
//     console.error("Error analyzing sentiment:", error);
//     throw error; // Rethrow the error for further handling
//   }
// };

// export { analyzePostTone };

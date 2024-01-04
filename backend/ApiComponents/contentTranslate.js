const fetch = require("node-fetch");

const translateTextWithApiKey = async (text, targetLanguage) => {
  const apiKey = process.env.GOOGLE_LANGUAGE_KEY;
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      q: text,
      target: targetLanguage,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.translations[0].translatedText;
};

export { translateTextWithApiKey };

// const { Translate } = require("@google-cloud/translate").v2;
// const translate = new Translate();

// async function translateText(text, target) {
//   let [translations] = await translate.translate(text, target);
//   return translations;
// }

// module.exports = translateText;

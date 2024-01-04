import { translateTextWithApiKey } from "../ApiComponents/contentTranslate";

const testTranslation = async () => {
  try {
    const sampleText = "Hello world!"; // Text to be translated
    const targetLanguage = "es"; // Target language (Spanish in this case)

    const translatedText = await translateTextWithApiKey(
      sampleText,
      targetLanguage
    );
    console.log(`Original: ${sampleText}`);
    console.log(`Translated: ${translatedText}`);
  } catch (error) {
    console.error("Error during translation:", error);
  }
};

testTranslation();

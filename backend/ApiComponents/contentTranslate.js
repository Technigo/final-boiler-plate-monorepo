const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate();

async function translateText(text, target) {
  let [translations] = await translate.translate(text, target);
  return translations;
}

module.exports = translateText;

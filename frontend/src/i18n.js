import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import enTranslation from "./Translations/en.json"
import svTranslation from "./Translations/sv.json"

const resources = {
    en: {
        translation: enTranslation,
    },
    sv: {
        translation: svTranslation,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "sv", // default language
    interpolation: {
        escapeValue: false
    }
})

export default i18n
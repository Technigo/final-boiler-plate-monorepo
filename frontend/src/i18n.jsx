import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
    sv:
    {
        "translation": {
            "Home": "Hem",
            "About us": "Om oss",
            "My page": "Min sida",
            "Articles": "Artiklar"

        }
    },

    en: {
        translation: {
            // ... Other translations

        },
    },
};


i18n.use(initReactI18next).init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
})

export default i18n;
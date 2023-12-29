import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
    sv:
    {
        "translation": {
            "Home": "Hem",
            "About us": "Om oss",
            "My page": "Min sida",
            "Articles": "Artiklar",
            "Login": "Logga in",
            "Username": "Användarnamn",
            "Password": "Lösenord",
            "Become a member": "Bli medlem",
            "Navigate your Goals with HabitFlow: Daily Progress, Lifetime Glow!": "Navigera i dina mål med HabitFlow: Dagliga framsteg, livstid glöd!",
            "Sorry, this page does not exist. Back to start-page:": "Tyvärr, den här sidan finns inte. Tillbaka till startsidan:",
            "Why": "Varför",
            "Customized goal setting": "Anpassad målsättning",
            "Track your progress": "Spåra dina framsteg",
            "Become the best version of yourself": "Bli den bästa versionen av dig själv",
            "Discover a variety of articles about habits. From understanding the science behind habit formation to practical tips for positive changes, our collection offers valuable insights for cultivating a healthier and more productive lifestyle.": "Upptäck en mängd olika artiklar om vanor. Från att förstå vetenskapen bakom vanebildning till praktiska tips för positiva förändringar, vår kollektion erbjuder värdefulla insikter för att odla en hälsosammare och mer produktiv livsstil.",

            "How it works": "Såhär funkar det",
            "> You choose your habits": "> Du väljer dina vanor",
            "> Track your daily progress": "> Håll koll på dina dagliga framsteg",
            "> See how your longest streak lasts": "> Se hur många dagar i rad du håller din vana",
            "> See how many weeks you have finished": "> Se hur många veckor en vana varit aktiv",
            "> Up to 10 habits": "> Upp till 10 vanor",

            "At HabitFlow, we understand the profound impact that habits can have on shaping the course of one's life. Rooted in the belief that intentional habits are the building blocks of personal growth, we've crafted a dedicated platform to guide you on your journey towards positive change.": "På HabitFlow förstår vi den djupgående inverkan som vanor kan ha på att forma ens livs gång. Med rötter i tron ​​att avsiktliga vanor är byggstenarna för personlig tillväxt, har vi skapat en dedikerad plattform för att guida dig på din resa mot positiv förändring.",
            "Our Mission: Empowering Your Daily Choices": "Vårt uppdrag: Stärka dina dagliga val",
            "Our mission is simple yet transformative: to empower individuals to take control of their daily choices and steer them towards a life of purpose and fulfillment. We recognize that the smallest habits, when cultivated intentionally, can lead to profound transformations.": "Vårt uppdrag är enkelt men ändå transformerande: att ge individer möjlighet att ta kontroll över sina dagliga val och styra dem mot ett liv i syfte och tillfredsställelse. Vi inser att de minsta vanorna, när de odlas avsiktligt, kan leda till djupgående förvandlingar.",
            "The Essence of HabitFlow: Precision, Personalization, and Community": "Essensen av HabitFlow: Precision, personalisering och gemenskap",
            "HabitFlow is not just a habit tracker; it's a companion on your path to personal evolution. We pride ourselves on offering a platform that combines precision tracking with personalized insights. Whether you're aiming to break free from unhealthy patterns or adopt new positive habits, HabitFlow is designed to be your guiding light.": "HabitFlow är inte bara en vanespårare; det är en följeslagare på din väg till personlig utveckling. Vi är stolta över att erbjuda en plattform som kombinerar precisionsspårning med personliga insikter. Oavsett om du siktar på att bryta dig från ohälsosamma mönster eller anta nya positiva vanor, är HabitFlow designad för att vara din ledstjärna.",
            "Why Choose HabitFlow: Your Partner in Progress": "Varför välja HabitFlow: Din partner på gång",
            "Choosing HabitFlow means choosing a holistic approach to habit formation. We are more than a tool; we are your partner in progress. Whether you're striving for a healthier lifestyle, increased productivity, or personal development, HabitFlow is here to help you navigate the path to positive change.": "Att välja HabitFlow innebär att välja ett holistiskt förhållningssätt till vanebildning. Vi är mer än ett verktyg; vi är din partner på gång. Oavsett om du strävar efter en hälsosammare livsstil, ökad produktivitet eller personlig utveckling, är HabitFlow här för att hjälpa dig att navigera på vägen till positiv förändring.",
            "Join us on this transformative journey. Together, let's nurture the habits that shape a life of purpose and fulfillment. Welcome to HabitFlow - Where Positive Change Begins.": "Följ med oss ​​på denna transformerande resa. Låt oss tillsammans vårda de vanor som formar ett liv i syfte och tillfredsställelse. Välkommen till HabitFlow – där positiv förändring börjar.",
            "Who are we?": "Vilka är vi?",
            "I'm": "Jag är"

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
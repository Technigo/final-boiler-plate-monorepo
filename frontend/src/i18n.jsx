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
            "> Set personal goals": "> Sätt upp personliga mål",
            "> See how many weeks you have finished": "> Se hur många veckor en vana varit aktiv",
            "> Up to 10 habits": "> Upp till 10 vanor",

            "Welcome Emma!": "Välkommen Emma!",
            "My Habits": "Mina Vanor",
            "Drink 2L of water": "Drick 2L vatten",
            "Read 20 pages in a book": "Läs 20 sidor i en bok",
            "Walk for 30 minutes": "Promenera i 30 minuter",
            "Finished Weeks: X": "Avklarade veckor: X",

            "Start your journey towards a better you": "Starta din resa mot ett bättre jag",
            "Set goals, track progress, and achieve your best self with us.": "Sätt mål, spåra dina framsteg och bli ditt bästa jag med oss.",
            "Sign up here and become a member today!": "Bli medlem idag!",
            "Sign Up": "Bli medlem",

            "At HabitFlow, we understand the profound impact that habits can have on shaping the course of one's life. Rooted in the belief that intentional habits are the building blocks of personal growth, we've crafted a dedicated platform to guide you on your journey towards positive change.": "På HabitFlow förstår vi den djupgående inverkan som vanor kan ha på att forma ens livs gång. Med rötter i tron ​​att avsiktliga vanor är byggstenarna för personlig tillväxt, har vi skapat en dedikerad plattform för att guida dig på din resa mot positiv förändring.",
            "Our Mission: Empowering Your Daily Choices": "Vårt uppdrag: Stärka dina dagliga val",
            "Our mission is simple yet transformative: to empower individuals to take control of their daily choices and steer them towards a life of purpose and fulfillment. We recognize that the smallest habits, when cultivated intentionally, can lead to profound transformations.": "Vårt uppdrag är enkelt men ändå transformerande: att ge individer möjlighet att ta kontroll över sina dagliga val och styra dem mot ett liv i syfte och tillfredsställelse. Vi inser att de minsta vanorna, när de odlas avsiktligt, kan leda till djupgående förvandlingar.",
            "The Essence of HabitFlow: Precision, Personalization, and Community": "Essensen av HabitFlow: Precision, personalisering och gemenskap",
            "HabitFlow is not just a habit tracker; it's a companion on your path to personal evolution. We pride ourselves on offering a platform that combines precision tracking with personalized insights. Whether you're aiming to break free from unhealthy patterns or adopt new positive habits, HabitFlow is designed to be your guiding light.": "HabitFlow är inte bara en vanespårare; det är en följeslagare på din väg till personlig utveckling. Vi är stolta över att erbjuda en plattform som kombinerar precisionsspårning med personliga insikter. Oavsett om du siktar på att bryta dig från ohälsosamma mönster eller anta nya positiva vanor, är HabitFlow designad för att vara din ledstjärna.",
            "Why Choose HabitFlow: Your Partner in Progress": "Varför välja HabitFlow: Din partner på gång",
            "Choosing HabitFlow means choosing a holistic approach to habit formation. We are more than a tool; we are your partner in progress. Whether you're striving for a healthier lifestyle, increased productivity, or personal development, HabitFlow is here to help you navigate the path to positive change.": "Att välja HabitFlow innebär att välja ett holistiskt förhållningssätt till vanebildning. Vi är mer än ett verktyg; vi är din partner på gång. Oavsett om du strävar efter en hälsosammare livsstil, ökad produktivitet eller personlig utveckling, är HabitFlow här för att hjälpa dig att navigera på vägen till positiv förändring.",
            "Join us on this transformative journey. Together, let's nurture the habits that shape a life of purpose and fulfillment. Welcome to HabitFlow - Where Positive Change Begins.": "Följ med oss ​​på denna transformerande resa. Låt oss tillsammans vårda de vanor som formar ett liv i syfte och tillfredsställelse. Välkommen till HabitFlow – där positiv förändring börjar.",
            "Who are we?": "Vilka är vi?",
            "I'm": "Jag är",

            "No habits yet, go ahead and add some!": "Här finns inga vanor registrerade än, ta och lägg till några!",
            "Hi": "Hej",
            ", welcome! Let's make the best of this day ☀️": ", välkommen! Låt oss göra det bästa av den här dagen ☀️",
            "My habits": "Mina vanor",
            "Sign Out": "Logga ut",

            "Oops! You need to be logged in.": "Hoppsan! Du måste vara inloggad.",
            "Access to My Page is exclusive to our members. Please": "Tillgång till Min Sida är endast för medlemmar.",
            "log in": "Logga in",
            "or": "eller",
            "sign up": "registrera dig",
            "to manage your personal content and enjoy all the benefits of being a member.": "för att få tillgång till alla fördelar med att vara medlem.",
            "If you're just looking around, welcome! Feel free to": "Om du bara tittar runt, välkommen!",
            "go back to our homepage": "Gå tillbaka till vår startsida",
            "and explore.": "och läs mer.",

            "enter new habit": "Lägg till en ny vana här",
            "Add Habit": "Skapa ny vana",
            "Delete All My Habits": "Radera mina vanor",

            "The Power of Habits: How They Shape Your Life": "Vanornas kraft: hur de formar ditt liv",
            "Habits are the invisible architects of our lives, shaping our routines, decisions, and ultimately, our destinies. From the moment we wake up to the...": "Vanor är våra livs osynliga arkitekter, som formar våra rutiner, beslut och i slutändan våra öden. Från det ögonblick vi vaknar till...",
            "Habits are the invisible architects of our lives, shaping our routines, decisions, and ultimately, our destinies. From the moment we wake up to the time we go to bed, habits influence our actions and reactions. Understanding the power of habits can be the key to unlocking positive change in our lives.\n\nThis article explores the science behind habits, delving into the neurological processes that occur when habits are formed. It discusses the three components of a habit loop: cue, routine, and reward, and how identifying and manipulating these elements can help us establish new, beneficial habits and break free from detrimental ones.\n\nBy recognizing the role habits play in our lives, we gain the ability to intentionally cultivate habits that align with our goals and values. Whether it's adopting a morning exercise routine, practicing mindfulness, or cultivating a reading habit, harnessing the power of habits empowers us to lead more intentional and fulfilling lives.": "Vanor är de osynliga arkitekterna av våra liv, som formar våra rutiner, beslut och i slutändan våra öden. Från det ögonblick vi vaknar tills vi går och lägger oss påverkar vanorna våra handlingar och reaktioner. Att förstå vanornas kraft kan vara nyckeln till att låsa upp positiva förändringar i våra liv.\n\nDen här artikeln utforskar vetenskapen bakom vanor och fördjupar sig i de neurologiska processer som uppstår när vanor bildas. Den diskuterar de tre komponenterna i en vaneslinga: signal, rutin och belöning, och hur identifiering och manipulering av dessa element kan hjälpa oss att etablera nya, fördelaktiga vanor och bryta oss från skadliga.\n\nGenom att inse vilken roll vanor spelar i våra liv, får vi förmågan att avsiktligt odla vanor som är i linje med våra mål och värderingar . Oavsett om det gäller att ta till sig en morgonträningsrutin, utöva mindfulness eller odla en läsvana, så ger oss kraften i vanorna möjlighet att leva mer avsiktliga och tillfredsställande liv.",

            "Read more": "Läs mer",

            "The Habits of Highly Successful People: Lessons in Productivity and Achievement": "Vanorna hos mycket framgångsrika människor: lektioner i produktivitet och prestation",
            "Ever wondered what sets highly successful individuals apart from the rest? It often boils down to their habits. In this article, we explore...": "Har du någonsin undrat vad som skiljer mycket framgångsrika individer från resten? Det handlar ofta om deras vanor. I den här artikeln utforskar vi...",
            "Ever wondered what sets highly successful individuals apart from the rest? It often boils down to their habits. In this article, we explore the habits of successful people, drawing insights from the routines of entrepreneurs, athletes, and other high achievers.\n\nFrom time management and goal setting to cultivating a growth mindset, successful individuals often share common habits that contribute to their accomplishments. This article breaks down these habits, providing readers with valuable lessons and actionable tips to incorporate into their own lives.\n\nBy adopting the habits of highly successful people, readers can enhance their productivity, resilience, and overall success. From the power of a morning routine to the significance of continuous learning, this article serves as a roadmap for those aspiring to achieve greatness in their personal and professional lives.": "Har du någonsin undrat vad som skiljer mycket framgångsrika individer från resten? Det handlar ofta om deras vanor. I den här artikeln utforskar vi framgångsrika människors vanor och hämtar insikter från rutinerna hos entreprenörer, idrottare och andra högpresterande.\n \nFrån tidshantering och målsättning till att odla ett tillväxttänk, delar framgångsrika individer ofta gemensamma vanor som bidrar till deras prestationer. Den här artikeln bryter ner dessa vanor och ger läsarna värdefulla lärdomar och praktiska tips att införliva i sina egna liv.\n\ nGenom att ta till sig vanorna hos mycket framgångsrika människor kan läsarna förbättra sin produktivitet, motståndskraft och övergripande framgång. Från kraften i en morgonrutin till betydelsen av kontinuerligt lärande, den här artikeln fungerar som en färdplan för dem som strävar efter att uppnå storhet i sin personliga och professionella liv.",

            "Breaking Bad: Strategies for Overcoming Unhealthy Habits": "Breaking Bad: Strategier för att övervinna ohälsosamma vanor",
            "Breaking bad habits can be a challenging but crucial step toward personal growth and well-being. This article explores effective strategies for overcoming unhealthy habits, providing readers...": "Att bryta dåliga vanor kan vara ett utmanande men avgörande steg mot personlig tillväxt och välbefinnande. Den här artikeln utforskar effektiva strategier för att övervinna ohälsosamma vanor, ge läsarna...",
            "Breaking bad habits can be a challenging but crucial step toward personal growth and well-being. This article explores effective strategies for overcoming unhealthy habits, offering readers actionable tips for positive change.\n\nIdentify the root cause by understanding triggers and emotions associated with your habits. Set clear, achievable goals, celebrating each step forward. Replace negative habits with positive alternatives aligned with your values.\n\nBuild a support system with friends, family, or a support group. Practice mindfulness to heighten self-awareness, interrupting automatic behaviors. View setbacks as growth opportunities, adjusting your strategy accordingly.\n\nConsider professional help if needed. Celebrate progress, no matter how small, to reinforce positive behavior. Breaking bad habits is a gradual journey requiring patience and perseverance. Commit to these strategies for transformative, lasting change.": "Att bryta dåliga vanor kan vara ett utmanande men avgörande steg mot personlig tillväxt och välbefinnande. Den här artikeln utforskar effektiva strategier för att övervinna ohälsosamma vanor, och erbjuder läsare praktiska tips för positiv förändring.\n\nIdentifiera grundorsaken genom att förstå triggers och känslor associerade med dina vanor. Sätt tydliga, uppnåeliga mål, fira varje steg framåt. Ersätt negativa vanor med positiva alternativ som är anpassade till dina värderingar.\n\nBygg ett stödsystem med vänner, familj eller en stödgrupp. Öva mindfulness för att öka självmedvetenheten , avbryta automatiska beteenden. Se motgångar som tillväxtmöjligheter, justera din strategi därefter.\n\nÖverväg professionell hjälp om det behövs. Fira framsteg, oavsett hur små de är, för att förstärka positivt beteende. Att bryta dåliga vanor är en gradvis resa som kräver tålamod och uthållighet. Engagera dig för dessa strategier för transformativ, varaktig förändring.",

            "A former saleswoman in optics, now a freight forwarder, with a background in security, who has now taken on the challenge of becoming a Frontend Developer. In order to reach my goals, it is important for me to write lists! Using a habit tracker makes it easier to keep track of my to-do's, which brings me one step closer to a better Lisa! Hope you too will find pleasure in using this habit tracker!": "En föredetta säljare inom optik, nu logistiker, med en bakgrund inom säkerhet, som nu tagit sig an utmaningen att bli Frontend Developer. För att nå mina mål är det viktigt för mig att skriva listor! Genom att använda en habittracker blir det lättare att hålla koll på mina to-do:s som tar mig ett steg närmare en bättre Lisa! Hoppas även du ska hitta nöje i att använda denna habittracker!",
            "With a background in customer service, I've always enjoyed solving problems and making connections. Now, I'm channeling that passion into a new career as a Frontend Developer. Transitioning into frontend development, I've found that the discipline of tracking my habits sharpens my focus and propels my learning. I'm excited for you to discover how tracking your habits can lead to your own version of success!": "Med en bakgrund inom kundservice har jag alltid tyckt om att lösa problem och skapa kontakter. Nu kanaliserar jag den passionen till en ny karriär som frontend utvecklare. Att övergå till frontendutveckling har gjort att jag upptäckt hur viktigt det är med goda vanor för att nå mina mål. Jag ser fram emot att du upptäcker hur vår hemsida kan hjälpa dig att nå dina mål!",

            "Finished weeks:": "Färdiga veckor:"

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
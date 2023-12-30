import React from "react";
import { useTranslation } from 'react-i18next';
import "./aboutusinfo.css";

const AboutUsInfo = () => {

    const { t } = useTranslation();

    return (
        <div className="aboutus-container">
            <hr></hr>
            <h2>{t('About us')}</h2>
            <div className="aboutus-text">
                <p>{t("At HabitFlow, we understand the profound impact that habits can have on shaping the course of one's life. Rooted in the belief that intentional habits are the building blocks of personal growth, we've crafted a dedicated platform to guide you on your journey towards positive change.")}</p>
                <h3>{t("Our Mission: Empowering Your Daily Choices")}</h3>
                <p>{t("Our mission is simple yet transformative: to empower individuals to take control of their daily choices and steer them towards a life of purpose and fulfillment. We recognize that the smallest habits, when cultivated intentionally, can lead to profound transformations.")}</p>
                <h3>{t("The Essence of HabitFlow: Precision, Personalization, and Community")}</h3>
                <p>{t("HabitFlow is not just a habit tracker; it's a companion on your path to personal evolution. We pride ourselves on offering a platform that combines precision tracking with personalized insights. Whether you're aiming to break free from unhealthy patterns or adopt new positive habits, HabitFlow is designed to be your guiding light.")}</p>
                <h3>{t("Why Choose HabitFlow: Your Partner in Progress")}</h3>
                <p>{t("Choosing HabitFlow means choosing a holistic approach to habit formation. We are more than a tool; we are your partner in progress. Whether you're striving for a healthier lifestyle, increased productivity, or personal development, HabitFlow is here to help you navigate the path to positive change.")}
                    <br />
                    {t("Join us on this transformative journey. Together, let's nurture the habits that shape a life of purpose and fulfillment. Welcome to HabitFlow - Where Positive Change Begins.")}</p>
                <br /><br />
            </div>
            <hr></hr>
        </div>

    );
};

export default AboutUsInfo; 
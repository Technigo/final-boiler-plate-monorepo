import React from "react";
import { useTranslation } from 'react-i18next';
import "./howitworks.css";

const HowItWorks = () => {
    const { t } = useTranslation();

    return (
        <div className="how-it-works-container">
            <div className="how-column">
                <h2>{t("How it works")}</h2>
                <h3>{t("> You choose your habits")}</h3>
                <h3>{t("> Track your daily progress")}</h3>
                <h3>{t("> See how your longest streak lasts")}</h3>
                <h3>{t("> See how many weeks you have finished")}</h3>
                <h3>{t("> Up to 10 habits")}</h3>
            </div>
            <div className="welcome-column">
                <h3>{t("en bild här med en print sen på hur habit ser ut")}</h3>
            </div>
        </div>
    );
};

export default HowItWorks;













import React from "react";
import { useTranslation } from 'react-i18next';
import "./howitworks.css";

const HowItWorks = () => {

    const { t } = useTranslation();

    return (
        <div className="how-it-works-container">
            <h1>{t("How it works")}</h1>
            <h2>{t("> You choose your habits")}</h2>
            <h2>{t("> Track your daily progress")}</h2>
            <h2>{t("> See how your longest streak last")}</h2>
            <h2>{t("> See how many weeks you have finnished")}</h2>
            <h2>{t("> Up to 10 habits")}</h2>
        </div>

    );
};

export default HowItWorks; 











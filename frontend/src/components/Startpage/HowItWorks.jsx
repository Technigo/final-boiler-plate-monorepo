import React from "react";
import { useTranslation } from 'react-i18next';
import "./howitworks.css";
import HabitFront from './HabitFront';

const HowItWorks = () => {
    const { t } = useTranslation();

    return (

        <div className="how-it-works-container">
            <div className="how-column">
                <h2>{t("How it works")}</h2>
                <h3>{t("> You choose your habits")}</h3>
                <h3>{t("> Track your daily progress")}</h3>
                <h3>{t("> Set personal goals")}</h3>
                <h3>{t("> See how many weeks you have finished")}</h3>
                <h3>{t("> Up to 10 habits")}</h3>
            </div>
            <div className="welcome-column">
                <p>{t("Welcome Emma!")}</p>
                <p>{t("My Habits")}</p>
                <hr></hr>
                <div className="my-habits">
                    <HabitFront habitName={t("Drink 2L of water")} habitColor="blue" containerClass="water" />
                    <HabitFront habitName={t("Read 20 pages in a book")} habitColor="green" containerClass="book" />
                    <HabitFront habitName={t("Walk for 30 minutes")} habitColor="purple" containerClass="walk" />
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;













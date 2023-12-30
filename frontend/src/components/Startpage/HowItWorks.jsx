import React from "react";
import { useTranslation } from 'react-i18next';
import "./howitworks.css";
import Habit from './Habit';

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
                <p>Welcome, Emma!</p>
                <p>My Habits</p>
                <hr></hr>
                <div className="my-habits">
                <Habit habitName="Drink 2L of water" habitColor="green" containerClass="water" />
                <Habit habitName="Read 20 pages in a book" habitColor="green" containerClass="book" />
                <Habit habitName="Walk for 30 minutes" habitColor="purple" containerClass="walk" />
            </div> 
        </div>
        </div>
    );
};

export default HowItWorks;













import React from "react";
import { useTranslation } from 'react-i18next';
import "./whoarewe.css";

const WhoAreWe = () => {

    const { t } = useTranslation();

    return (
        <div className="whoarewe-container">
            <h2>{t("Who are we?")}</h2>
            <div className="whoarewe-info">
                <img src="/lisa.JPG" alt="picture of lisa" />
                <div className="whoarewe-text">
                    <h3>{t("I'm")} Lisa Dahlkar</h3>
                    <p>{t("A former saleswoman in optics, now a freight forwarder, with a background in security, who has now taken on the challenge of becoming a Frontend Developer. In order to reach my goals, it is important for me to write lists! Using a habit tracker makes it easier to keep track of my to-do's, which brings me one step closer to a better Lisa! Hope you too will find pleasure in using this habit tracker!")}</p>
                    <div className="icons">
                        <a href="http://github.com/lisawh0/" className="icon" target="_blanc"><img className="icon" src="/github.png" alt="github" /></a>
                        <a href="https://www.linkedin.com/in/lisa-dahlkar-401183174/" className="icon" target="_blanc"><img className="icon" src="/linkedin.png" alt="linkedin" /></a>
                        <a href="https://lisadahlkarportfolio.netlify.app/" className="icon" target="_blanc"><img className="icon" src="/portfolio.png" alt="portfolio" /></a>
                    </div>
                </div>
            </div>
            <div className="whoarewe-info">
                <img src="/Linnea.jpg" alt="picture of linnea" />
                <div className="whoarewe-text">
                    <h3>{t("I'm")} Linnea Johansson</h3>
                    <p>{t("With a background in customer service, I've always enjoyed solving problems and making connections. Now, I'm channeling that passion into a new career as a Frontend Developer. Transitioning into frontend development, I've found that the discipline of tracking my habits sharpens my focus and propels my learning. I'm excited for you to discover how tracking your habits can lead to your own version of success!")}</p>
                    <div className="icons">
                        <a href="https://github.com/JohanssonLinnea" className="icon" target="_blanc"><img className="icon" src="/github.png" alt="github" /></a>
                        <a href="https://www.linkedin.com/in/linnea-johansson-68886828a/" className="icon" target="_blanc"><img className="icon" src="/linkedin.png" alt="linkedin" /></a>
                        <a href="#" className="icon" target="_blanc"><img className="icon" src="/portfolio.png" alt="portfolio" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhoAreWe; 
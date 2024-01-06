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
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web</p>
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
import "./aboutContent.css";


import { TbHealthRecognition } from "react-icons/tb";
import { MdOutlineComputer } from "react-icons/md";
import { IoTrailSignOutline } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"


export const AboutContent = () => {
    return (
        <div className="about-container">
            <div className="vision-tech-info">
                <div className="about-vision">
                    <div className="about-icons"><TbHealthRecognition /></div>
                    <p>Our vision is to make it easier for people to connect with nature and enjoy delicious meals outdoors.</p>
                </div>

                <div className="about-tech">
                    <div className="about-icons"><MdOutlineComputer /></div>
                    <p>
                        Tech: React, JavaScript, Zustand, HTML, OpenAI, MongoDB/Atlas, CSS, React Router, Node, Express, Render, Netlify.
                    </p></div>

                <div className="project-info">
                    <div className="about-icons"><IoTrailSignOutline /></div>
                    <p>
                        Navigate through the GitHub README trail for more information and code for OpenAir Feast.
                    </p></div></div>

            <div className="cards-container">
                <div className="card">
                    <div className="card-content">
                        <img src="https://idah-collin-portfolio.netlify.app/assets/profilbildidah.jpeg" alt="Photo of Idah Collin" />
                        <h3>Idah Collin</h3>
                        <div className="contact-idah">
                            <a href="https://idah-collin-portfolio.netlify.app/"><FaBook /></a>
                            <a href="https://www.linkedin.com/in/idah-collin"><FaLinkedin /></a>
                            <a href="https://github.com/IdahCollin"><FaGithub /></a>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="card">
                    <div className="card-content">
                        <img src="https://emmy-dieden-portfolio.netlify.app/assets/gifs/Profilbild-min.JPG" alt="Photo of Emmy Dieden" />
                        <h3>Emmy Dieden</h3>
                        <div className="contact-emmy">
                            <a href="https://emmy-dieden-portfolio.netlify.app/"><FaBook /></a> <a href="https://www.linkedin.com/in/emmy-dieden-774574283/"><FaLinkedin /></a>
                            <a href="https://github.com/EmmyDieden"><FaGithub /></a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

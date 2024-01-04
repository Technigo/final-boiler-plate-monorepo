import "./aboutContent.css";
import { FaLinkedin } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"
import { TbHealthRecognition } from "react-icons/tb";
import { MdOutlineComputer } from "react-icons/md";
import { IoTrailSignOutline } from "react-icons/io5";

export const AboutContent = () => {
    return (
        <div className="card-container">
            <div className="about-vision">
                <h3><TbHealthRecognition /> Vision</h3>
                <p>Our vision is to make it easier for people to connect with nature and enjoy delicious meals outdoors.</p>
            </div>

            <div className="about-tech">
                <h3><MdOutlineComputer /> Tech</h3>
                <p>
                    React, JavaScript, Zustand, OpenAI, MongoDB, CSS, HTML, Mob Programming
                </p></div>

            <div className="project-info">
                <h3><IoTrailSignOutline /> Info</h3>
                <p>
                    Navigate through the GitHub Read-me trail for a deeper exploration.
                </p></div>
            <div className="card">
                <div className="card-content">
                    <img src="https://idah-collin-portfolio.netlify.app/assets/profilbildidah.jpeg" alt="Photo of Idah Collin" />
                    <h3>Idah Collin</h3>
                    <div className="contact-idah">
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
                        <a href="https://www.linkedin.com/in/emmy-dieden-774574283/"><FaLinkedin /></a>
                        <a href="https://github.com/EmmyDieden"><FaGithub /></a>
                    </div>
                </div>
            </div>


        </div>
    )
}

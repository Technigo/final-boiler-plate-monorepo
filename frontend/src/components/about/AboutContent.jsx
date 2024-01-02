import "./aboutContent.css";
import { FaLinkedin } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"

export const AboutContent = () => {
    return (
        <div className="card-container">
            <div className="card">
                <div className="card-content">
                    <img src="https://idah-collin-portfolio.netlify.app/assets/profilbildidah.jpeg" alt="Photo of Idah Collin" />
                    <h2>Idah Collin</h2>
                    <div className="contact-idah">
                        <a href="https://www.linkedin.com/in/idah-collin"><FaLinkedin/></a>
                        <a href="https://github.com/IdahCollin"><FaGithub/></a>
                       </div>
                </div>
            </div>

            {/* Card 2 */}
            <div className="card">
                <div className="card-content">
                    <img src="https://emmy-dieden-portfolio.netlify.app/assets/gifs/Profilbild-min.JPG" alt="Photo of Emmy Dieden" />
                    <h2>Emmy Dieden</h2>
                    <div className="contact-Emmy">
                    <a href="https://www.linkedin.com/in/emmy-dieden-774574283/"><FaLinkedin/></a>
                    <a href="https://github.com/EmmyDieden"><FaGithub/></a>
                      </div>
                </div>
            </div>
        </div>
    )
}

import "./aboutContent.css";
import { FaLinkedin } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"

export const AboutContent = () => {
    return (
        <div className="card-container">
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

            <div className="about-vision">
                <h3>Our vision</h3>
                <p>Our vision is to make it easier for people to connect with nature and enjoy delicious meals outdoors. varför kan inte denna och nästa div ligga utanför card-container diven?</p>
            </div>

            <div className="about-tech">
                <h3>Tech</h3>
                <ul>
                    <li>React</li>
                    <li>JavaScript</li>
                    <li>Zustand</li>
                    <li>OpenAI</li>
                    <li>MongoDB</li>
                    <li>Fyll på</li>
                </ul>
                <h4>More information about the project: Länk till Read-me på GitHub?</h4>
            </div>
        </div>

    )
}

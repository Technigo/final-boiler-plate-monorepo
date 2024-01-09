import { Link } from "react-router-dom";
import { Buttons } from "../Buttons/Buttons";
import "./Footer.css";

// import linkedinIcon from "../assets/linkedin.png";
// import githubIcon from "../assets/github.png";

export const Footer = () => {
  const handleButtonClick = () => {
    console.log("Contact button clicked");
  };

  return (
    <div className="footer">
      <div className="footer-text">
        <p>
          Technigo Web Developer Bootcamp Fall 2023 Final Project <br />
          {/* <span>
            Frida Lindskog
            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a
              href="https://github.com/FridafridaL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub" />
            </a>
          </span>
          <span>
            Carolina Luna
            <a
              href="https://www.linkedin.com/in//"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub" />
            </a>
          </span>
          <span>
            Sandra Gustafsson
            <a
              href="https://www.linkedin.com/in//"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub" />
            </a>
          </span>
          <span>
            Emmy Jansson
            <a
              href="https://www.linkedin.com/in/emmy-jansson-2104a3293/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a
              href="https://github.com/EmmyLJ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub" />
            </a>
          </span> */}
        </p>
      </div>
    </div>
  );
};

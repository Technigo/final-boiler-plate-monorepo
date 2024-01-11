import { Link } from "react-router-dom";

import "./Footer.css";

import linkedinIcon from "../../assets/linkedin.png";
import githubIcon from "../../assets/github.png";

//Footer with our names and contact info
export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-text">
        <p>
          Technigo Web Developer Bootcamp Fall 2023 Final Project <br />
          <span>
            Frida Lindskog
            <Link
              to="https://linkedin.com/in/frida-lindskog-0566b5149"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </Link>
            <Link
              to="https://github.com/FridafridaL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub" />
            </Link>
          </span>
          <span>
            Carolina Luna
            <Link
              to="https://linkedin.com/in/carolina-luna-b1659251"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </Link>
            <Link
              to="https://github.com/KroLuna"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub" />
            </Link>
          </span>
          <br />
          <span>
            Sandra Gustafsson
            <Link
              to="https://linkedin.com/in/sandra-gustafsson-3665061a5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </Link>
            <Link
              to="https://github.com/SVMaxica"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub" />
            </Link>
          </span>
          <span>
            Emmy Jansson
            <Link
              to="https://linkedin.com/in/emmy-jansson-2104a3293"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </Link>
            <Link
              to="https://github.com/EmmyLJ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub" />
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

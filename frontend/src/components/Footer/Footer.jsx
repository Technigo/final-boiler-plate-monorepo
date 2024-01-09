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
          Frida Lindskog, Carolina Luna, Sandra Gustafsson
          <span>
            Emmy
            {/* <a
              href="https://www.linkedin.com/in/emmy-jansson-2104a3293/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a
              href="https://github.com/emmy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub" />
            </a> */}
          </span>
        </p>
      </div>
    </div>
  );
};

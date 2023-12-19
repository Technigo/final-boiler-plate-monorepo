import { Link } from "react-router-dom";
import { Buttons } from "../Buttons/Buttons";
import "./Footer.css";

export const Footer = () => {
  const handleButtonClick = () => {
    console.log("About us button clicked");
  };

  return (
    <div className="footer">
      <div className="footer-text">
        <p>
          Final Project by Frida Lindskog, Carolina Luna, Sandra Gustafsson and
          Emmy Jansson. Technigo Web Developer Bootcamp Fall 2023
        </p>
        <Link to="/about-us">
          <Buttons buttonText="About Us" onClick={handleButtonClick} />
        </Link>
      </div>
    </div>
  );
};

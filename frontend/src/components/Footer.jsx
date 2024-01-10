import "./Footer.css";
import hang from "../assets/team/hang.svg";
import janice from "../assets/team/janice.svg";
import mina from "../assets/team/mina.svg";
import maria from "../assets/team/maria.svg";
import { useNavigate, Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-sub-section">
              <h2 className="footer-about">
                <Link to="/about">About</Link>
              </h2>
              <h2 className="footer-terms">
                <Link to="/terms">Terms </Link>
              </h2>
            </div>
            <div>
              <h2> .......................................... </h2>
            </div>
            <h2>Contact Us</h2>
            <p>
              This is a final project for the Web Development Bootcamp at
              Technigo.
            </p>
            <div className="team-container">
              <a
                href="https://github.com/Hang-Nguyen-Vu"
                className="team-member"
              >
                <img src={hang} alt="Hang" />
                <h4>Hang</h4>
              </a>
              <a href="https://github.com/jforjanice" className="team-member">
                <img src={janice} alt="Janice" />
                <h4>Janice</h4>
              </a>
              <a href="https://github.com/Minadarabi" className="team-member">
                <img src={mina} alt="Mina" />
                <h4>Mina</h4>
              </a>
              <a
                href="https://github.com/mariateresepettersson"
                className="team-member"
              >
                <img src={maria} alt="Maria" />
                <h4>Maria</h4>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Greenbuddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

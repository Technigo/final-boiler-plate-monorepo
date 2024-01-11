import { Navigation } from "../header/navigation/Navigation"
import "./Footer.css";
import { PiSmileyWinkLight } from "react-icons/pi";
import { PiSmileyXEyesLight } from "react-icons/pi";

export const Footer = () => {
  return (
    <footer>
      {/* <p>
        This page was created by Julia Holm and Vera Witting as a final project
        at Technigos Web developement Boot Camp.
      </p> */}
      <div className="image-container">
        <div className="profile-pic">
          <p>Julia</p>
          <PiSmileyXEyesLight className="profile-pic-icon" />
        </div>
        <div className="profile-pic">
          <p>Vera</p>
          <PiSmileyWinkLight className="profile-pic-icon" />
        </div>
        {/* <img className="profile-pic" src="" alt="Picture of Julia Holm." />
        <img className="profile-pic" src="" alt="Picture of Vera Witting." /> */}
      </div>
      <Navigation /> 
    </footer>
  );
};

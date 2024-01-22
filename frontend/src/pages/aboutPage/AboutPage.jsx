import { Link } from "react-router-dom";

// ICONS IMPORTS
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCode } from "react-icons/fa";

// COMPONENTS IMPORTS
import { Intro } from "./sections/intro/Intro";
import { Developers } from "./sections/developers/Developers";
import { Project } from "./sections/project/Project";

import "./AboutPage.css";

export const AboutPage = () => {
  return (
    <div className="about-page-wrapper">
      <Intro />
      <Developers />
      <Project />
    </div>
  );
};

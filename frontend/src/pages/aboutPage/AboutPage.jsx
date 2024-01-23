import { Link } from "react-router-dom";
// importing components
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

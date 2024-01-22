import { Link } from "react-router-dom";
import { FaCode } from "react-icons/fa";

export const Project = () => {
  return (
    <section className="project-wrapper">
      <div className="project-section section-container">
        <h2 className="section-title">Plants by Holm & Witting</h2>
        <h3 className="h3-sub-title">A Technigo Final Project</h3>
        <p className="about-p">
          This is maybe some stuff from our readme file, something about what we
          wanted to create, something about how we achieved this, something
          about how we worked together. Finally something about if you who are
          reading like what you see, don't be shy to contact us! Or if you have
          any tips or feedback, learning is the best!
        </p>
        <Link
          to="https://github.com/JuliaHolm/final-boiler-plate-monorepo"
          className="project-link"
        >
          <FaCode className="code-icon" />
          <p className="about-p">
            Take a look at this project on <b>Github!</b>
          </p>
        </Link>
      </div>
    </section>
  );
};

import { Link } from "react-router-dom";

// ICONS IMPORTS
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCode } from "react-icons/fa";

export const Developers = () => {
  const julia = {
    profileImg: "./profile-julia.png",
    profileImgAlt: "Julia Holm profile picture",
    name: "Julia Holm",
    title: "junior frontend developer",
    githubUrl: "https://github.com/JuliaHolm",
    linkedInUrl: "https://www.linkedin.com/in/julia-holm-63249226b/",
    pText:
      "Julia is a dedicated developer known for her beautiful web sites, innovative solutions and exceptional coding abilities. She creates user-friendly applications and solves complex issues with ease. Her drive for excellence and great focus makes her a valuable asset to any project and a standout in the technology field.",
  };

  const vera = {
    profileImg: "./profil-vera.jpg",
    profileImgAlt: "Vera Witting profile picture",
    name: "Vera Witting",
    title: "Junior frontend developer",
    githubUrl: "https://github.com/verawitting",
    linkedInUrl: "https://www.linkedin.com/in/vera-witting-ba51b1b6/",
    pText:
      "Vera, a skilled developer, seamlessly integrates her graphic design background with coding expertise. Recognized for her creative problem-solving approach, Vera navigates challenges with confidence. Her dedication to crafting user-friendly applications positions her as a valuable contributor to any project, earning respect in the tech community.",
  };

  return (
    <section className="developers-wrapper">
      <h2 className="section-title">Developers</h2>
      <div className="developers-container section-container">
        <div className="developer-container">
          <div className="profile-img-wrapper">
            <img
              className="profile-img"
              src={julia.profileImg}
              alt={julia.profileImgAlt}
            />
          </div>
          <h3 className="developer-name">{julia.name}</h3>
          <h4 className="sub-title">{julia.title}</h4>
          <div className="social-links">
            <Link to={julia.githubUrl} target="_blank">
              <FaGithub className="icon" />
            </Link>
            <Link to={julia.linkedInUrl} target="_blank">
              <FaLinkedin className="icon" />
            </Link>
            <MdEmail className="icon" />
          </div>
          <p className="about-p">{julia.pText}</p>
        </div>
        <div className="developer-container">
          <div className="profile-img-wrapper">
            <img
              className="profile-img"
              src={vera.profileImg}
              alt={vera.profileImgAlt}
            />
          </div>
          <h3 className="developer-name">{vera.name}</h3>
          <h4 className="sub-title">{vera.title}</h4>
          <div className="social-links">
            <Link to={vera.githubUrl} target="_blank">
              <FaGithub className="icon" />
            </Link>
            <Link to={vera.linkedInUrl} target="_blank">
              <FaLinkedin className="icon" />
            </Link>
            <MdEmail className="icon" />
          </div>
          <p className="about-p">{vera.pText}</p>
        </div>
      </div>
    </section>
  );
};

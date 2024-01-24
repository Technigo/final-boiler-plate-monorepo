import { Link } from "react-router-dom";

// importing icons
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GrSend } from "react-icons/gr";

export const Developers = () => {

  const developers = [
    {
      profileImg: "./profile-julia.jpg",
      profileImgAlt: "Julia Holm profile picture",
      name: "Julia Holm",
      title: "junior frontend developer",
      githubUrl: "https://github.com/JuliaHolm",
      linkedInUrl: "https://www.linkedin.com/in/julia-holm-63249226b/",
      email: "",
      pText:
        "Julia is a dedicated developer known for her beautiful web sites, innovative solutions and exceptional coding abilities. She creates user-friendly applications and solves complex issues with ease. Her drive for excellence and great focus makes her a valuable asset to any project and a standout in the technology field.",
    }, 
    {
      profileImg: "./profil-vera.jpg",
      profileImgAlt: "Vera Witting profile picture",
      name: "Vera Witting",
      title: "Junior frontend developer",
      githubUrl: "https://github.com/verawitting",
      linkedInUrl: "https://www.linkedin.com/in/vera-witting-ba51b1b6/",
      email: "vera.witting@gmail.com",
      pText:
        "Vera, a skilled developer, seamlessly integrates her graphic design background with coding expertise. Recognized for her creative problem-solving approach, Vera navigates challenges with confidence. Her dedication to crafting user-friendly applications positions her as a valuable contributor to any project, earning respect in the tech community.",
    }
  ];

  return (
    <section className="developers-wrapper">
      <h2 className="section-title">Developers</h2>
      <div className="developers-container section-container">
        {developers.map((developer) => {
          return (
            <div className="developer-container">
              <div className="profile-img-wrapper">
                <img
                  className="profile-img"
                  src={developer.profileImg}
                  alt={developer.profileImgAlt}
                />
              </div>
              <h3 className="developer-name">{developer.name}</h3>
              <h4 className="sub-title">{developer.title}</h4>
              <div className="social-links" aria-label="contact links">
                <Link to={developer.githubUrl} target="_blank" aria-label="Git Hub">
                  <FaGithub className="icon" />
                </Link>
                <Link to={developer.linkedInUrl} target="_blank" aria-label="Linked in">
                  <FaLinkedin className="icon" />
                </Link>
                <GrSend className="icon" />
              </div>
              <p className="about-p">{developer.pText}</p>
            </div>
          )
        })}
      </div> 
    </section>
  );
};

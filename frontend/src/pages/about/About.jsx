
import { Link } from "react-router-dom"
import { PiSmileyWinkLight } from "react-icons/pi";
import { PiSmileyXEyesLight } from "react-icons/pi";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCode } from "react-icons/fa";




import "./About.css"

export const About = () => {
  return (
    <>
    <section className="about-intro">
    <h1>About & Contact</h1>
        <p className="h2-p">How fun, you found our about and contact page!</p>
        <p>This page is a full stack final project of Technigos Boot Camp in Web Developement of 2023. 
            And if you haven't noticed, is not an actual web shop but a demo version.
            If you like something, or id you've got something on your mind, don't be shy to contact the developers!
            They are super nice!</p>

    </section>
    <section className="about-developers">
        <h2 className="section-title">Developers</h2>
        <div className="developers-wrapper">
        <div className="developer-wrapper">
        <PiSmileyXEyesLight className="profile-pic-icon" />
            <h3>Julia T Holm</h3>
            <p>Julia is a dedicated developer known for her beautiful web sites, 
                innovative solutions and exceptional coding abilities. She creates user-friendly 
                applications and solves complex issues with ease. Her drive for excellence and 
                great focus makes her a valuable asset to any project and a 
                standout in the technology field. </p>
            <Link to={"https://github.com/JuliaHolm"} target="_blank" ><FaGithub /></Link>
            <Link to={"https://www.linkedin.com/in/julia-holm-63249226b/"} target="_blank" ><FaLinkedin /></Link>
            <MdEmail />
        </div>
        <div className="developer-wrapper">
        <PiSmileyWinkLight className="profile-pic-icon" />
            <h3>Vera Witting</h3>
            <p>Vera, a skilled developer, seamlessly integrates her graphic design background 
                with coding expertise. Recognized for her creative problem-solving approach, 
                Vera navigates challenges with confidence. Her dedication to crafting user-friendly 
                applications positions her as a valuable contributor to any project, earning respect 
                in the tech community.</p>
    <Link to={"https://github.com/verawitting"} target="_blank" ><FaGithub /></Link>
            <Link to={"https://www.linkedin.com/in/vera-witting-ba51b1b6/"} target="_blank" ><FaLinkedin /></Link>
            <MdEmail />

        </div>
        </div>
    </section>
    <section>
        <h2 className="section-title">Plants by Holm & Witting</h2>
        <h3>A Technigo Final Project</h3>
        <p>This is maybe some stuff from our readme file, something about what we wanted to create, 
            something about how we achieved this, something about how we worked together.
            Finally something about if you who are reading like what you see, 
            don't be shy to contact us! Or if you have any tips or feedback, learning is the best!
        </p>
        <Link><FaCode />Take a look at this project on Github</Link>
    </section>
    </>
  )
}

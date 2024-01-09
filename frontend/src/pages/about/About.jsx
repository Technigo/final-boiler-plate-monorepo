
import { PiSmileyWinkLight } from "react-icons/pi";
import { PiSmileyXEyesLight } from "react-icons/pi";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";



import "./About.css"

export const About = () => {
  return (
    <>
    <section className="about-intro">
    <h2>About & Contact</h2>
        <h3>How fun, you found our about and contact page!</h3>
        <p>This page is the final project of Technigos Boot Camp in Web Developement. And if you haven't noticed, is not an actual web shop but a demo version.</p>

    </section>
    <section className="about-developers">
        <h2>Developers</h2>
        <div className="developers-wrapper">
        <div className="developer-wrapper">
        <PiSmileyXEyesLight className="profile-pic-icon" />
            <h3>Julia T Holm</h3>
            <p>Julia is an exceptional developer known for her innovative solutions and exceptional coding abilities. She creates user-friendly 
                applications and solves complex issues with ease. Her drive for excellence makes her a valuable asset to any project and a 
                standout in the technology field. </p>
            <FaGithub />
            <FaLinkedin />

        </div>
        <div className="developer-wrapper">
        <PiSmileyWinkLight className="profile-pic-icon" />
            <h3>Vera Witting</h3>
            <p>Vera is a dedicated developer with a background in graphic design. 
    She's well-regarded for her innovative problem-solving and coding skills. 
    Vera excels at creating user-friendly applications and adeptly handling complex challenges. 
    Her commitment to excellence makes her a valuable addition to any project and a respected figure in the technology field.</p>
        <FaGithub /> 
        <FaLinkedin />

        </div>
        </div>
    </section>
    <section>
        <h2>Plants by Holm & Witting</h2>
        <h3>A Technigo Final Project</h3>
        <p>This is maybe some stuff from our readme file, something about what we wanted to create, 
            something about how we achieved this, something about how we worked together.
            Finally something about if you who are reading like what you see, 
            don't be shy to contact us! Or if you have any tips or feedback, learning is the best!
        </p>
    </section>
    </>
  )
}

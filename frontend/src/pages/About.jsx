import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Heading } from "../components/reusableComponents/Heading";
import { Button } from "../components/reusableComponents/Button";
import aboutUs from "../assets/aboutUs.json";
import Lottie from "lottie-react";
import "../pages/about.css";

export const About = () => {
  const style = {
    height: 500,
  };
  return (
    <>
      <Navbar
        menuItems={[
          { path: "/login", name: "Login" },
          { path: "/register", name: "Signup" },
          { path: "/terms", name: "Terms" },
        ]}
        menuDesks={[
          { path: "/login", name: "Login" },
          { path: "/register", name: "Signup" },
          { path: "/terms", name: "Terms" },
        ]}
      />
      <div className="main-container">
        <div className="main-wrapper">
          <div className="about-container">
            <Heading
              level={1}
              text="What Is Green Buddy?"
              aria-label="What Is Green Buddy?"
            />
            <Lottie animationData={aboutUs} style={style} />

            <p>
              Green Buddy serves as a hub for sharing and potentially exchanging
              home-made and home-grown products. With a primary mission to combat
              food waste, our platform connects individuals with surplus goods to
              those who appreciate and can utilize them effectively.
            </p>
            <Heading
              level={2}
              text="Why Green Buddy?"
              aria-label="Why Green Buddy?"
            />
            <p>
              For garden owners and producers, our platform offers invaluable
              support by ensuring that their excess harvests find purpose and care
              in the hands of appreciative recipients. Beyond the immediate
              reduction of food waste, our community fosters a sense of shared
              responsibility and environmental consciousness. Join us in cultivating
              a greener future, one surplus product at a time.
            </p>
            <Heading
              level={2}
              text="Ready to get started with Green Buddy?"
              aria-label="log-in?"
            />
            <Button label="Get started" link="/login" className="about-btn"/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

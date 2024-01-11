import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Heading } from "../components/reusableComponents/Heading";
import { Button } from "../components/reusableComponents/Button";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";
import BackArrow from "../components/reusableComponents/BackArrow";
import contact from "../assets/get-contact.svg";
import giveAway from "../assets/give-away.svg";
import picture from "../assets/picture.svg";
import aboutUs from "../assets/aboutUs.json";
import Lottie from "lottie-react";
import "../pages/about.css";

export const About = () => {
  const style = {
    height: 500,
  };
  const navigate = useNavigate();

  // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
  const isLoggedin = userStore((state) => state.isLoggedin);
  const handleLogout = userStore((state) => state.handleLogout);

  const logoRedirectPath = isLoggedin ? "/home" : "/";

  return (
    <>
      <Navbar
        menuItems={
          isLoggedin
            ? [
                { path: "/home", name: "Home" },
                { path: "/search", name: "Search" },
                { path: "/settings", name: "My Settings" },
                { path: "/manage-your-ads", name: "My Products" },
                { path: "/terms", name: "Terms" },
                {
                  name: "Logout",
                  onClick: () => {
                    handleLogout();
                    navigate("/");
                  },
                },
              ]
            : [
                { path: "/home", name: "Home" },
                { path: "/about", name: "About" },
                { path: "/terms", name: "Terms" },
                { path: "/login", name: "Login" },
              ]
        }
        menuDesks={
          isLoggedin
            ? [
                { path: "/home", name: "Home" },
                { path: "/search", name: "Search" },
                { path: "/settings", name: "My Settings" },
                { path: "/manage-your-ads", name: "My Products" },
                { path: "/terms", name: "Terms" },
                {
                  name: "Logout",
                  onClick: () => {
                    handleLogout();
                    navigate("/");
                  },
                },
              ]
            : [
                { path: "/home", name: "Home" },
                { path: "/terms", name: "Terms" },
                { path: "/login", name: "Login" },
              ]
        }
        logoRedirectPath={logoRedirectPath}
      />
      <div className="main-container">
        <div className="main-wrapper">
          <div className="about-container">
            <div className="arrow-container">
              <BackArrow />
            </div>
            <Heading
              level={1}
              text="What Is Green Buddy?"
              aria-label="What Is Green Buddy?"
            />
            <Lottie animationData={aboutUs} style={style} />

            <p>
              Green Buddy serves as a hub for sharing and potentially exchanging
              home-made and home-grown products. With a primary mission to
              combat food waste, our platform connects individuals with surplus
              goods to those who appreciate and can utilize them effectively.
            </p>
            <Heading
              level={2}
              text="Why Green Buddy?"
              aria-label="Why Green Buddy?"
            />
            <p>
              For garden owners and producers, our platform offers invaluable
              support by ensuring that their excess harvests find purpose and
              care in the hands of appreciative recipients. Beyond the immediate
              reduction of food waste, our community fosters a sense of shared
              responsibility and environmental consciousness. Join us in
              cultivating a greener future, one surplus product at a time.
            </p>

            <Heading
              level={2}
              text="Ready to get started with us?"
              aria-label="log-in?"
            />
            <div className="about-list">
              <div>
                <h3>Share online</h3>
                <img src={picture} alt="share-online" />
              </div>
              <div>
                <h3>Get contacted</h3>
                <img src={contact} alt="contact" />
              </div>
              <div>
                <h3>Give it away</h3>
                <img src={giveAway} alt="give-away" />
              </div>
            </div>
            <div className="about-btn">
              <Button label="Get started" link="/login" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

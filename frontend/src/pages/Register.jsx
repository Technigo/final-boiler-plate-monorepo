// Import necessary components, hooks, and stores.
import { userStore } from "../stores/userStore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";
import Footer from "../components/Footer";
import FooterMobile from "../components/FooterMobile";
import lottie from 'lottie-web';
import calenderAnimationData from '../data/calender.json';
import "../components/register.css";

// Define the 'Register' functional component.
export const Register = () => {
  // Initialize state variables for 'username', 'email', and 'password' using 'useState'.
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();

  // Access the 'handleSignup' function from the 'userStore'.
  const storeHandleSignup = userStore((state) => state.handleSignup);

  // Function to handle the click event of the signup button.
  const onSignupClick = async () => {
    if (!username || !password || !email) {
      // Display an alert if any of the required fields are empty.
      alert("Please enter email, username, and password");
      return;
    }
    try {
      // Call the 'handleSignup' function from 'userStore' with 'username', 'password', and 'email' parameters.
      await storeHandleSignup(username, password, email);
      if (username && password) {
        // If the signup is successful, navigate to the login route ("/").
        navigate("/"); // Replace with your desired path
      }
    } catch (error) {
      // Handle any errors that occur during signup and display an alert.
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  };

  const isMobile = useMediaQuery({ maxWidth: 393 });
  const isTablet = useMediaQuery({ minWidth: 394, maxWidth: 834 });

  const { t } = useTranslation();

  useEffect(() => {
    const container = document.getElementById('calender-lottie-container');

    if (container) {
      const animation = lottie.loadAnimation({
        container,
        animationData: calenderAnimationData,
        renderer: 'svg',
        loop: true,
        autoplay: true,
      });

      // Cleanup the animation on component unmount
      return () => {
        animation.destroy();
      };
    }
  }, [calenderAnimationData]);

  // Render the component content.
  return (
    <>
      {isMobile ? (
        <NavbarMobile />
      ) : isTablet ? (
        <NavbarMobile />
      ) : (
        <Navbar />
      )}
      <div className="register-container">
        <div id="calender-lottie-container" className="calender-lottie-container" />
        <h2>{t("Start your journey towards a better you")}</h2>
        <h3>{t("Set goals, track progress, and achieve your best self with us.")}</h3>
        <h3>{t("Sign up here and become a member today!")}</h3>
        <div className="user-registration">
          <input
            type="text"
            placeholder={t("Email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder={t("Username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder={t("Password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Create a button for signing up and attach the 'onSignupClick' event handler. */}
          <button className="register-button" onClick={onSignupClick}>{t("Sign Up")}</button>
        </div>
      </div>

      {isMobile ? (
        <FooterMobile />
      ) : isTablet ? (
        <Footer />
      ) : (
        <Footer />
      )}

    </>
  );
};

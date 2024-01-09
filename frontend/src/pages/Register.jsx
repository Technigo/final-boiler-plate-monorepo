// Import necessary components, hooks, and stores.
import { userStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Logo } from "../components/reusableComponents/Logo";
import { Heading } from "../components/reusableComponents/Heading";
import { Button } from "../components/reusableComponents/Button";
import BackArrow from "../components/reusableComponents/BackArrow";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json/";
import {Icon} from "react-icons-kit";
import {eyeOff} from "react-icons-kit/feather/eyeOff";
import {eye} from "react-icons-kit/feather/eye";
import "../pages/register.css";

// Define the "Register" functional component.
export const Register = () => {
  // Initialize state variables for "username", "email", "password" and "consent" using "useState".
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Setting initial state for input type to be password and icon to be eyeOff so that the inputPassword will be hidden
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  // Initialize the "navigate" function from React Router.
  const navigate = useNavigate();

  // Access the "handleSignup" function from the "userStore".
  const storeHandleSignup = userStore((state) => state.handleSignup);

  // Function to handle the toggle between the hide password (eyeOff icon) and the show password (eye icon)
  const handleToggle = () => {
    if (type ==="password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  // Function to handle the click event of the signup button.
  const onSignupClick = async (e) => {
    e.preventDefault();
    // Set loading to true when starting the register process
    setLoading(true);
    try {
      // Call the "handleSignup" function from "userStore" with "username", "password", "email" and "consent" parameters.
      await storeHandleSignup(username, password, email, consent);

      // When the user has signed up successfully, navigate to log in page
      const isSignedup = userStore.getState((state) => state.isSignedup);

      if (isSignedup) {
        // If the signup is successful, navigate to the login route.
        navigate("/login");
      }
    } catch (error) {
      console.error("Register failed:", error);
    } finally {
      // Reset loading to false after the register process is completed (success or failure)
      setLoading(false);
    }
  };

  // Render the component content.
  return (
    <div className="container">
      <div className="arrow-container">
        <BackArrow />
        <Logo className={"login-logo"} />
      </div>
      {/* Apply styling from app.css */}

      <div className="user-registration">
        <Heading level={1} text="Sign up" aria-label="Sign Up" />
        {/* Create input fields for "email", "username", "password", "consent" and associate them with state variables. */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="john@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <div className="password-input">
          <input
            type={type}
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={handleToggle}>
            <Icon icon={icon} size={22}/>
          </span>
        </div>

        <div className="tnc">
          <input
            type="checkbox"
            name="consent"
            id="consent"
            checked={consent}
            onChange={() => setConsent(!consent)}
          />
          <label htmlFor="consent">I agree to terms and policy</label>
        </div>
        {/* Create a button for signing up and attach the "onSignupClick" event handler. */}
        {loading && <Lottie animationData={loadingAnimation} />}
        {!loading && (
          <Button
            iconSize="button"
            label="Sign Up"
            onClick={onSignupClick}
            className="button"
          />
        )}
        <h4>
          Have an account?
          <Link to="/login">Log In</Link>
        </h4>
      </div>
    </div>
  );
};

// SUMMARY

// This code defines the Register component, which handles user registration functionality. It imports necessary components, hooks, and the user store, and it defines state variables for email, username, and password. The component provides a form for entering registration details, handles the signup button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the "Logos" component.

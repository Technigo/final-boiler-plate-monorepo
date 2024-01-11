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
import loadingAnimation from "../assets/loading.json";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import "../pages/register.css";
import Swal from "sweetalert2";

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

  // Function for basic email validation
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Function to handle the toggle between the hide password (eyeOff icon) and the show password (eye icon)
  const handleToggle = () => {
    if (type === "password") {
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
    setLoading(true);

    if (!isValidEmail(email)) {
      setLoading(false);
      Swal.fire("Error", "Please enter a valid email address", "error");
      return;
    }

    if (username.length < 5) {
      setLoading(false);
      Swal.fire(
        "Error",
        "Username must be at least 5 characters long",
        "error"
      );
      return;
    }

    if (password.length < 5) {
      setLoading(false);
      Swal.fire(
        "Error",
        "Password must be at least 5 characters long",
        "error"
      );
      return;
    }

    try {
      const response = await storeHandleSignup(
        username,
        password,
        email,
        consent
      );
      if (response.success) {
        navigate("/home");
      } else {
        Swal.fire(
          "Error",
          response.message || "Signup failed. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Register failed:", error);
      Swal.fire("Error", "An unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Render the component content.
  return (
    <>
      <div className="main-container">
        <div className="main-wrapper">
          <div className="register-arrow-wrapper">
            <BackArrow />
            <Logo className={"login-logo"} color="green" />
          </div>
          <div className="user-registration">
            <Heading level={1} text="Sign up" aria-label="Sign Up" />
            {/* Create input fields for "email", "username", "password", "consent" and associate them with state variables. */}
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <br></br>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="john@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
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
                  <Icon icon={icon} size={22} />
                </span>
              </div>
            </div>
            <div>
              <div className="tnc">
                <input
                  type="checkbox"
                  name="consent"
                  id="consent"
                  checked={consent}
                  onChange={() => setConsent(!consent)}
                />
                <label htmlFor="consent">
                  I agree to <Link to="/terms">terms and policy</Link>
                </label>
              </div>
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
              <Link to="/login"> Log In</Link>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

// SUMMARY

// This code defines the Register component, which handles user registration functionality. It imports necessary components, hooks, and the user store, and it defines state variables for email, username, and password. The component provides a form for entering registration details, handles the signup button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the "Logos" component.

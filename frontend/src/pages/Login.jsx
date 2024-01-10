// Import the 'useState' and 'useNavigate' hooks from 'react'.
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Import the 'userStore' from the 'userStore' module.
import { userStore } from "../stores/userStore"; // Make sure this is correctly imported
import { Heading } from "../components/reusableComponents/Heading";
import { Logo } from "../components/reusableComponents/Logo";
import { Button } from "../components/reusableComponents/Button";
import BackArrow from "../components/reusableComponents/BackArrow";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json/";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import "../pages/login.css";

// Define the 'Login' functional component.
export const Login = () => {
  // Create state variables for 'username' and 'password' using 'useState'.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Setting initial state for input type to be password and icon to be eyeOff so that the inputPassword will be hidden
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  // Use the 'useNavigate' hook to programmatically navigate between routes.
  const navigate = useNavigate();

  // Access the 'handleLogin' function from the 'userStore'.
  const storeHandleLogin = userStore((state) => state.handleLogin);

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Trigger form submission when Enter key is pressed
      onLoginClick(e);
    }
  };

  // Function to handle the click event of the login button.
  const onLoginClick = async (e) => {
    e.preventDefault();
    // Set loading to true when starting the login process
    setLoading(true);
    // Call the 'handleLogin' function from 'userStore' with 'username' and 'password' parameters.
    try {
      await storeHandleLogin(username, password);
      // Get the 'isLoggedIn' state from 'userStore'.
      const isLoggedin = userStore.getState().isLoggedin;
      if (isLoggedin) {
        // If the user is logged in, navigate to the "/home" route.
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      // Reset loading to false after the login process is completed (success or failure)
      setLoading(false);
    }
  };

  const style = {
    height: 200,
  };

  // Render the component content.
  return (
    <div className="main-container">
      <div className="main-wrapper">
        <div className="arrow-container">
          <BackArrow />
          <Logo className={"login-logo"} color="green" />
        </div>
        <div>
          {/* Apply styling from app.css */}
          <div className="user-login">
            <Heading level={1} text="Login" aria-label="Login" />
            {/* Create input fields for 'username' and 'password' and associate them with state variables. */}
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                  onKeyUp={handleKeyPress}
                />
                <span onClick={handleToggle}>
                  <Icon icon={icon} size={22} />
                </span>
              </div>
            </div>
            {loading && <Lottie animationData={loadingAnimation} style={style} />}
            {!loading && (
              <Button
                iconSize="button"
                label="Login"
                onClick={onLoginClick}
                className="button"
              />
            )}
            <h4>
              Don&apos;t have an account? <Link to="/register">Sign up</Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

// SUMMARY

// This code defines the Login component, which handles user login functionality. It imports necessary components, hooks, and the user store, and it defines state variables for username and password. The component also provides a form for entering login credentials, handles the login button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the 'Logos' component.

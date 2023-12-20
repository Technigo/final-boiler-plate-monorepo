import "./Login.css";
import { Link } from "react-router-dom";
// Import the 'userStore' from the 'userStore' module.
import { userStore } from "../stores/userStore"; // Make sure this is correctly imported
// Import the 'useState' and 'useNavigate' hooks from 'react'.
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Input } from "../components/Input";
import { Button } from "../components/Button";

// Define the 'Login' functional component.
export const Login = () => {
  // Create state variables for 'username' and 'password' using 'useState'.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Use the 'useNavigate' hook to programmatically navigate between routes.
  const navigate = useNavigate();

  // Access the 'handleLogin' function from the 'userStore'.
  const storeHandleLogin = userStore((state) => state.handleLogin);

  // Function to handle the click event of the login button.
  const onLoginClick = async () => {
    if (!username || !password) {
      // Display an alert if either 'username' or 'password' is empty.
      alert("Please enter both username and password");
      return;
    }
    try {
      // Call the 'handleLogin' function from 'userStore' with 'username' and 'password' parameters.
      await storeHandleLogin(username, password);
      // Get the 'isLoggedIn' state from 'userStore'.
      const isLoggedIn = userStore.getState().isLoggedIn;
      if (isLoggedIn) {
        // If the user is logged in, navigate to the "/home" route.
        navigate("/home");
      }
      // Additional logic after successful login can be added here.
    } catch (error) {
      // Handle any errors that occur during login and display an alert.
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="bg-wrapper">
        <img src="./login-register-bg.png" alt="" className="bg-img" />
        <div className="overlay">
          {/* Display the heading and paragraphs. */}
          <div className="big-logo">
            <img
              src="./big-logo-sand.svg"
              alt="Plants by Holm and Witting logo"
            />
          </div>
          <div className="user-login">
            {/* Create input fields for 'username' and 'password' and associate them with state variables. */}
            <div className="input-container">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                ariaLabel="Username input"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ariaLabel="Password input"
              />
            </div>
            <a className="forgot-password">Forgot Password?</a>
            {/* Create a button for logging in and attach the 'onLoginClick' event handler. */}
            <Button
              className="login-btn"
              onClick={onLoginClick}
              btnText="Login"
              ariaLabel="login button"
            />
          </div>
          <nav className="register-link-container">
            {/* Create a navigation menu with links to the login and sign-up routes. */}
            <ul className="app-ul">
              <li className="app-li">
                <span>Don't have an account?</span>
                <Link to="/register">
                  Become a <b>member</b>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

// SUMMARY

// This code defines the Login component, which handles user login functionality. It imports necessary components, hooks, and the user store, and it defines state variables for username and password. The component also provides a form for entering login credentials, handles the login button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the 'Logos' component.

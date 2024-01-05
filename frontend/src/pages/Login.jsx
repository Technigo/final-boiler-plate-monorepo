// Import the 'userStore' from the 'userStore' module.
import { userStore } from "../stores/userStore"; // Make sure this is correctly imported
// Import the 'useState' and 'useNavigate' hooks from 'react'.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackArrow from "../components/reusableComponents/BackArrow";
import "../pages/login.css";

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
  const onLoginClick = async (e) => {
    e.preventDefault();

    // Call the 'handleLogin' function from 'userStore' with 'username' and 'password' parameters.
    await storeHandleLogin(username, password);
    // Get the 'isLoggedIn' state from 'userStore'.
    const isLoggedin = userStore.getState().isLoggedin;

    if (isLoggedin) {
      // If the user is logged in, navigate to the "/home" route.
      navigate("/home");
    }
  };

  // Render the component content.
  return (
    <>
      
        <BackArrow />

      <div>
        {/* Display the heading and paragraphs. */}
        <h1>Login</h1>
        <div className="user-login">
          {/* Create input fields for 'username' and 'password' and associate them with state variables. */}
          <h2>Username</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h2>Password</h2>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={onLoginClick}>
            Login
          </button>
          <h3>
            Don&apos;t have an account? <a href="/register">Sign up</a>
          </h3>
        </div>
      </div>
    </>
  );
};

// SUMMARY

// This code defines the Login component, which handles user login functionality. It imports necessary components, hooks, and the user store, and it defines state variables for username and password. The component also provides a form for entering login credentials, handles the login button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the 'Logos' component.

// Import the 'userStore' from the 'userStore' module.
import { userStore } from "../stores/userStore"; // Make sure this is correctly imported
// Import the 'useState' and 'useNavigate' hooks from 'react'.
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import BackArrow from "../components/BackArrow";
import "../pages/login.css";

// Define the 'Login' functional component.
export const Login = () => {
  // Create state variables for 'username' and 'password' using 'useState'.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState("");
  const [reminderMessage, setReminderMessage] = useState("");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setReminderMessage(""); // Clear the reminder message when the checkbox is changed
  };
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
    } else if (!isChecked) {
      setReminderMessage(
        "Please read the terms and condition policy before submitting."
      );
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

  // Render the component content.
  return (
    <>
      <nav>
        <BackArrow />
      </nav>
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
          <label>
            <input
              type="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            I agree to terms & policy
          </label>
          <div style={{ color: "red" }}>{reminderMessage}</div>
          {/* Create a button for logging in and attach the 'onLoginClick' event handler. */}
          <button className="login-btn" onClick={onLoginClick}>
            Login
          </button>
          <h3>
            Don't have an account? <a href="/register">Sign up</a>
          </h3>
        </div>
      </div>
    </>
  );
};

// SUMMARY

// This code defines the Login component, which handles user login functionality. It imports necessary components, hooks, and the user store, and it defines state variables for username and password. The component also provides a form for entering login credentials, handles the login button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the 'Logos' component.

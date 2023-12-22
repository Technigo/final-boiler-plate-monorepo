// Import necessary components, hooks, and stores.
import LogoText from "../components/LogoText";
import { userStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
import { Button } from "../components/Buttons/Button";

// Define the 'Register' functional component.
export const Register = () => {
  // Initialize state variables for 'username', and 'password' using 'useState'.
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();

  // Access the 'handleSignup' function from the 'userStore'.
  const storeHandleSignup = userStore((state) => state.handleSignup);

  // Function to handle the click event of the signup button.
  const onSignupClick = async () => {
    if (!username || !password) {
      // Display an alert if any of the required fields are empty.
      alert("Please enter username and password");
      return;
    }
    try {
      // Call the 'handleSignup' function from 'userStore' with 'username' and 'password' parameters.
      await storeHandleSignup(username, password);
      if (username && password) {
        // If the signup is successful, navigate to the task route ("/tasks").
        navigate("/tasks"); // Replace with your desired path
      }
    } catch (error) {
      // Handle any errors that occur during signup and display an alert.
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  };

  // Text content for the heading and paragraphs.
  const text = {
    heading: "Join our compassionate community today!",
    intro:
      "Welcome to a place where kindness matters and connections make a difference. Sign up now to be a part of a community dedicated to spreading compassion and lending a helping hand.",
    p: "Gain access to a network where needs meet willing hearts. Browse requests to offer your support where it matters most.",
  };

  // Render the component content.
  return (
    <>
      {/* Render the 'LogoText' component. */}
      <LogoText />
      <div>
        {/* Display the heading and paragraphs. */}
        <h2>{text.heading}</h2>
        <p>{text.intro}</p>
        <p>{text.p}</p>
        <div className="user-registration">
          {/* Create input fields for 'username' and 'password' and associate them with state variables. */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Create a button for signing up and attach the 'onSignupClick' event handler. */}
          <Button
            onClick={onSignupClick}
            className="signUp-btn"
            buttonName="Create profile"
          />
        </div>
      </div>
    </>
  );
};

// SUMMARY

// This code defines the Register component, which handles user registration functionality. It imports necessary components, hooks, and the user store, and it defines state variables for email, username, and password. The component provides a form for entering registration details, handles the signup button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the 'LogoText' component.

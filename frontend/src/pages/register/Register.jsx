import { userStore } from "../../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/inputs/Input";
import { Button } from "../../components/buttons/Button";
import "./Register.css";

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

  return (
    <div className="register-wrapper">
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
          <div className="user-registration">
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
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ariaLabel="Password input"
              />
            </div>
            {/* Create a button for logging in and attach the 'onLoginClick' event handler. */}
            <Button
              className="signup-btn"
              onClick={onSignupClick}
              btnText="Sign up"
              ariaLabel="Sign up button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
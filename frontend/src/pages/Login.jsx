//import LogoText from "../components/LogoText";
//import { Link } from "react-router-dom";
import { userStore } from "../stores/userStore"; // Make sure this is correctly imported
// Import the 'useState' and 'useNavigate' hooks from 'react'.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Buttons/Button";
import styled from "styled-components";

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 0 30px 30px 30px; */

  p {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 20px;
    max-width: 600px;
  }
`;

const StyledLoginField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;
  border: 1px solid #eeb885;
  border-radius: 20px 0 20px 20px;
  padding: 20px;
  margin: 20px;

  input {
    margin-bottom: 10px; /* Add some space between the input fields */
    height: 30px; /* Set the height of the input fields */
    border-bottom: 2px solid #eeb885; /* Add a bottom border to the input fields */
    width: 100%; /* Set the width of the input fields */
    padding-left: 5px;
  }
`;

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
        // If the user is logged in, navigate to the "/tasks" route.
        navigate("/tasks");
      }
      // Additional logic after successful login can be added here.
    } catch (error) {
      // Handle any errors that occur during login and display an alert.
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  // Text content for the heading and paragraphs.
  const text = {
    heading: "Welcome!",
    intro:
      "Thank you for joining us in our mission to create a world where kindness thrives. Your presence is invaluable in building a more empathetic society.",
    p: "Log in to give a helping hand today!",
  };

  // Render the component content.
  return (
    <>
      {/* <LogoText /> */}
      <StyledIntro>
        {/* Display the heading and paragraphs. */}
        <h2>{text.heading}</h2>
        <p>{text.intro}</p>
        <p>{text.p}</p>
        <StyledLoginField>
          <div className="user-login">
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
            {/* Create a button for logging in and attach the 'onLoginClick' event handler. */}
            <Button
              onClick={onLoginClick}
              className="login-btn"
              buttonName="Log in"
            />
          </div>
        </StyledLoginField>
      </StyledIntro>
    </>
  );
};

// SUMMARY

// This code defines the Login component, which handles user login functionality. It imports necessary components, hooks, and the user store, and it defines state variables for username and password. The component also provides a form for entering login credentials, handles the login button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the 'LogoText' component.

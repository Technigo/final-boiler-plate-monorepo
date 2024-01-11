import { userStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Buttons/Button";
import styled from "styled-components";
//import aHelpinHandLogotype from "../assets/Logo-white.png";

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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
  border: 1px solid var(--button);
  border-radius: 20px 0 20px 20px;
  background-color: #f0f0f0;
  padding: 20px;
  margin: 20px;

  input {
    margin-bottom: 10px;
    height: 30px;
    border-bottom: 1px solid var(--button);
    width: 100%;
    padding-left: 5px;
    background-color: #f0f0f0;
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
    } catch (error) {
      // Handle any errors that occur during login and display an alert.
      alert("An error occurred during login. Please try again.");
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
      {/* Display the introduction. */}
      <StyledIntro>
        <h2>{text.heading}</h2>
        <p>{text.intro}</p>
        <p>{text.p}</p>
        {/* Create the login form */}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // If the user presses the 'Enter' key, call the 'onLoginClick' function.
                  onLoginClick();
                }
              }}
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

import { userStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Buttons/Button";
import styled from "styled-components";

// Styling for the Register component
const StyledRegister = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledIntroReg = styled.div`
  text-align: center;

  h2 {
    text-align: center;
  }

  p {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 20px;
    max-width: 600px;
  }
`;

const StyledRegField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;

  border: 1px solid var(--secondaryColor);
  border-radius: 20px 0 20px 20px;
  background-color: #f0f0f0;
  padding: 20px;
  margin: 20px;

  input {
    margin-bottom: 10px;
    height: 30px;
    border-bottom: 1px solid var(--secondaryColor);
    width: 100%;
    padding-left: 5px;
    background-color: #f0f0f0;
  }
`;

// Define the 'Register' functional component.
export const Register = () => {
  // Initialize state variables for 'username' and 'password' using 'useState'.
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
        navigate("/tasks");
      }
    } catch (error) {
      // Handle any errors that occur during signup and display an alert.
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
    <StyledRegister>
      <StyledIntroReg>
        {/* Display the heading and paragraphs. */}
        <h2>{text.heading}</h2>
        <p>{text.intro}</p>
        <p>{text.p}</p>
      </StyledIntroReg>
      <StyledRegField>
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // Trigger signup on pressing 'Enter' key.
                onSignupClick();
              }
            }}
          />
          {/* Create a button for signing up and attach the 'onSignupClick' event handler. */}
          <Button
            onClick={onSignupClick}
            className="signUp-btn"
            buttonName="Create profile"
          />
        </div>
      </StyledRegField>
    </StyledRegister>
  );
};

// SUMMARY

// The Register component handles user registration functionality. It imports necessary components, hooks, and the user store. State variables manage username and password. The component renders a form for registration details and handles the signup button click event. React Router is used for navigation between routes. Additionally, it renders introductory text.

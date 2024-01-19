import { userStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Buttons/Button";
import { LoaderAnimation } from "../components/Animations/LoaderAnimation";
import { Heading1 } from "../components/Typography/Heading1";
import { BodyText } from "../components/Typography/BodyText";
import styled from "styled-components";

// Styling for the Register component
const StyledRegister = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledIntroReg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledRegField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  border: 1px solid var(--button);
  border-radius: 20px 0 20px 20px;
  background-color: var(--grey);
  padding: 20px;
  margin: 20px;

  input {
    margin-bottom: 10px;
    height: 30px;
    border-bottom: 1px solid var(--button);
    width: 100%;
    padding-left: 5px;
    background-color: var(--grey);
  }
`;

const UserRegistration = styled.div``;

// Define the 'Register' functional component.
export const Register = () => {
  // Initialize state variables for 'username', 'password' and 'email' using 'useState'.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State variable to track loading state

  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();

  // Access the 'handleSignup' function from the 'userStore'.
  const storeHandleSignup = userStore((state) => state.handleSignup);

  // Function to handle the click event of the signup button.
  const onSignupClick = async () => {
    if (!username || !password || !email) {
      // Display an alert if any of the required fields are empty.
      alert("Please enter username, password and email");
      return;
    }
    try {
      setIsLoading(true);
      // Call the 'handleSignup' function from 'userStore' with 'username' and 'password' parameters.
      const registerPromise = storeHandleSignup(username, password, email);

      await Promise.all([
        // Wait for both promises to resolve
        registerPromise,
        new Promise((resolve) => setTimeout(resolve, 2000)), // Wait for 2 seconds
      ]);
      const isLoggedIn = userStore.getState().isLoggedIn;
      if (isLoggedIn) {
        // If the signup is successful, navigate to the task route ("/tasks").
        navigate("/tasks");
      } else {
        // Handle the case where isLoggedIn is false, i.e., signup was not successful.
        alert("Signup was not successful");
      }
    } catch (error) {
      // Handle any errors that occur during signup and display an alert.
      alert("An error occurred during signup");
    } finally {
      setIsLoading(false);
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
        <Heading1 className={"heading1-register"} text={`${text.heading}`} />
        <BodyText className={"bodytext-register"} text={`${text.intro}`} />
        <BodyText className={"bodytext-register"} text={`${text.p}`} />
      </StyledIntroReg>
      <StyledRegField>
        <UserRegistration>
          {/* Create input fields for 'username', 'password' and 'email' and associate them with state variables. */}
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
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Trigger signup on pressing 'Enter' key.
          />

          {/* Create a button for signing up and attach the 'onSignupClick' event handler. */}
          <Button
            onClick={onSignupClick}
            className="signUp-btn"
            buttonName="Create profile"
          />
        </UserRegistration>
      </StyledRegField>
      {/* Show loader if isLoading is true */}
      {isLoading ? <LoaderAnimation /> : ""}
    </StyledRegister>
  );
};

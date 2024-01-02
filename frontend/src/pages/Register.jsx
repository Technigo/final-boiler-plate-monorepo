// Import necessary components, hooks, and stores.
import { userStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BackArrow from "../components/BackArrow";

// Define the "Register" functional component.
export const Register = () => {
  // Initialize state variables for "username", "email", "password" and "consent" using "useState".
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);

  // Initialize the "navigate" function from React Router.
  const navigate = useNavigate();

  // Access the "handleSignup" function from the "userStore".
  const storeHandleSignup = userStore((state) => state.handleSignup);

  // Function to handle the click event of the signup button.
  const onSignupClick = async (e) => {
    e.preventDefault();

    // Call the "handleSignup" function from "userStore" with "username", "password", "email" and "consent" parameters.
    await storeHandleSignup(username, password, email, consent);

    // When the user has signed up successfully, navigate to log in page
    const isSignedup = userStore.getState((state) => state.isSignedup);

    if (isSignedup) {
      // If the signup is successful, navigate to the login route.
      navigate("/login");
    }
  };

  // Render the component content.
  return (
    <div>
        <BackArrow />
    
      <h1>Sign up</h1>
      <div className="user-registration">
        {/* Create input fields for "email", "username", "password", "consent" and associate them with state variables. */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="john@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="checkbox"
          name="consent"
          id="consent"
          checked={consent}
          onChange={() => setConsent(!consent)}
        />
        <label htmlFor="consent">I agree to terms and policy</label>

        {/* Create a button for signing up and attach the "onSignupClick" event handler. */}
        <button onClick={onSignupClick}>Sign Up</button>

        <p>Have an account?</p>
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

// SUMMARY

// This code defines the Register component, which handles user registration functionality. It imports necessary components, hooks, and the user store, and it defines state variables for email, username, and password. The component provides a form for entering registration details, handles the signup button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the "Logos" component.

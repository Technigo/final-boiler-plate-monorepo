// Import necessary components, hooks, and stores.
//import Logos from "../components/Logos";
import { userStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Define the 'Register' functional component.
export const Register = () => {
  // Initialize state variables for 'username', 'email', and 'password' using 'useState'.
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);

  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();

  // Access the 'handleSignup' function from the 'userStore'.
  const storeHandleSignup = userStore((state) => state.handleSignup);

  // Function to handle the click event of the signup button.
  const onSignupClick = async () => {
    try {
      // Call the 'handleSignup' function from 'userStore' with 'username', 'password', 'email' and 'consent' parameters.
      await storeHandleSignup(username, password, email, consent);
      if (username && password && email && (consent===true)) {
        // If the signup is successful, navigate to the login route.
        navigate("/login");
      }
    } catch (error) {
      // Handle any errors that occur during signup and display an alert.
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  };

  // Render the component content.
  return (
    <div>
      <h1>Sign up</h1>
      <div className="user-registration">
        {/* Create input fields for 'email', 'username', 'password', 'consent' and associate them with state variables. */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email">Email address</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="john@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <input 
          type="checkbox" 
          name="consent"
          id="consent"
          value={consent} 
          onChange={(e) => setConsent(!e.target.value)}
          required
        />
        <label htmlFor="consent">I agree to terms and policy</label>

        {/* Create a button for signing up and attach the 'onSignupClick' event handler. */}
        <button onClick={onSignupClick}>Sign Up</button>

        <p>Have an account?</p>
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

// SUMMARY

// This code defines the Register component, which handles user registration functionality. It imports necessary components, hooks, and the user store, and it defines state variables for email, username, and password. The component provides a form for entering registration details, handles the signup button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the 'Logos' component.

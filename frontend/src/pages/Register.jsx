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
    if (!username || !password || !email) {
      // Display an alert if any of the required fields are empty.
      alert("Please enter email, username, and password");
      return;
    }
    try {
      // Call the 'handleSignup' function from 'userStore' with 'username', 'password', and 'email' parameters.
      await storeHandleSignup(username, password, email);
      if (username && password && email) {
        // If the signup is successful, navigate to the login route.
        navigate("/login"); // Replace with your desired path
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
        {/* Create input fields for 'email', 'username', and 'password' and associate them with state variables. */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email address</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <input 
          type="checkbox" 
          name="consent"
          id="consent"
          value={consent} 
          onChange={(e) => setConsent(!e.target.value)}
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

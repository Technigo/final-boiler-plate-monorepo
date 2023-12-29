// Import necessary components, hooks, and stores.
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

  // Text content for the heading and paragraphs.
  const text = {
    heading: "HabitFlow",
    intro: "Start your journey towards a better you: Set goals, track progress, and achieve your best self with us",
    loremIpsum:
      "Sign up here and become a member today!",
  };

  // Render the component content.
  return (
    <>
      <nav>
        {/* Create a navigation menu with links to the login and sign-up routes. */}
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/">Login</Link>
          </li>
          <li className="app-li">
            <Link to="/register">Sign Up</Link>
          </li>
        </ul>
      </nav>
      <div>
        {/* Display the heading and paragraphs. */}
        <h2>{text.heading}</h2>
        <p>{text.intro}</p>
        <p>{text.loremIpsum}</p>
        <div className="user-registration">
          {/* Create input fields for 'email', 'username', and 'password' and associate them with state variables. */}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
          <button onClick={onSignupClick}>Sign Up</button>
        </div>
      </div>
    </>
  );
};

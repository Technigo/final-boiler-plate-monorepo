// Import necessary components, hooks, and stores.
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { userStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      // Make a POST request to the API endpoint
      const response = await fetch("https://authentication-j1oa.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });

      if (response.ok) {
        // If the signup is successful, navigate to the login route ("/").
        navigate("/");
      } else {
        // If the response is not okay, handle the error and display an alert.
        const errorData = await response.json();
        console.error("Signup error:", errorData);
        alert(`An error occurred during signup: ${errorData.message}`);
      }
    } catch (error) {
      // Handle any errors that occur during signup and display an alert.
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  };

  // Text content for the heading and paragraphs.
  const text = {
    heading: "SignUp Page",
    intro: "signup here...",
    loremIpsum:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, vitae fugit ipsam quo accusantium autem officia necessitatibus ullam voluptati",
  };

  // Render the component content.
  return (
    <>
      <Navbar />
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
          <button className="login" onClick={onSignupClick}>Sign Up</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

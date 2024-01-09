import { userStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Import components
import { SubHeadingComponent } from "../components/Reusables/SubHeadingComponent";
import { BtnComponent } from "../components/Reusables/BtnComonent";

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
  // Function to handle the click event of the signup button.
  const onNavigateToLoginClick = async () => {
    navigate("/login")
    return;
  }

  // Render the component content.
  return (
    <>
      <div className="items-center justify-center h-screen bg-backgroundPink">
        <div className="pt-20">

          <SubHeadingComponent className="pb-12 text-center" text="Register Tuanis Surf School" />
          <SubHeadingComponent className="pb-12 text-center" text="In order to retrive booking" />
          {/* Create input fields for 'email', 'username', and 'password' and associate them with state variables. */}
          <div className="flex flex-col items-center">
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
              className="block mt-5"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block mt-5"
            />
          </div>
          {/* Create a button for signing up and attach the 'onSignupClick' event handler. */}

          <div className="flex items-center justify-center p-4">
            <BtnComponent label="Sign Up" onClick={onSignupClick} />
          </div>

          <div className="flex items-center justify-center p-4">
            <BtnComponent label="Login" onClick={onNavigateToLoginClick} />
          </div>
        </div>
      </div>
    </>
  );
};


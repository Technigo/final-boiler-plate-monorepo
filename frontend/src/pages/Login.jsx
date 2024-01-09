//Import relevant library
import { userStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Import relevant comonents
import { SubHeadingComponent } from "../components/Reusables/SubHeadingComponent";
import { BtnComponent } from "../components/Reusables/BtnComonent";

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
        // If the user is logged in, navigate to the "/home" route.
        navigate("/Admin");
      }
      // Additional logic after successful login can be added here.
    } catch (error) {
      // Handle any errors that occur during login and display an alert.
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };


  // Render the component content.
  return (

    <div className="items-center justify-center h-screen bg-backgroundPink">

      {/* Display the heading and paragraphs. */}
      <SubHeadingComponent className="pt-12 text-center" text="Admin for Tuanis Surf School" />
      <SubHeadingComponent className="pb-12 text-center" text="Login for bookings:" />

      {/* Create input fields for 'username' and 'password' and associate them with state variables. */}
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block mb-5"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block mb-5"
        />
      </div>

      {/* Create a button for logging in and attach the 'onLoginClick' event handler. */}
      <div className="flex items-center justify-center p-4">
        <BtnComponent label="Login" onClick={onLoginClick} />
      </div>

    </div>

  );
}
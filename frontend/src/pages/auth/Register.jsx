import { userStore } from "../../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/inputs/Input";
import { Button } from "../../components/buttons/Button";

// Define the 'Register' functional component.
export const Register = () => {
  // Initialize state variables for 'username', 'email', and 'password' using 'useState'.
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");


  const { username, setUsername, password, setPassword, email, setEmail } = userStore();
  // // Initialize the 'navigate' function from React Router.
  // const navigate = useNavigate();

  // // Access the 'handleSignup' function from the 'userStore'.
  // const storeHandleSignup = userStore((state) => state.handleSignup);

  // // Function to handle the click event of the signup button.
  // const onSignupClick = async () => {
  //   if (!username || !password || !email) {
  //     // Display an alert if any of the required fields are empty.
  //     alert("Please enter email, username, and password");
  //     return;
  //   }
  //   try {
  //     // Call the 'handleSignup' function from 'userStore' with 'username', 'password', and 'email' parameters.
  //     await storeHandleSignup(username, password, email);
  //     if (username && password) {
  //       // If the signup is successful, navigate to the login route ("/").
  //       navigate("/"); // Replace with your desired path
  //     }
  //   } catch (error) {
  //     // Handle any errors that occur during signup and display an alert.
  //     console.error("Signup error:", error);
  //     alert("An error occurred during signup");
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="input-container">
        <label htmlFor="username" className="visually-hidden">
          Username
        </label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ariaLabel="Username input"
        />
      </div>
      <div className="input-container">
        <label htmlFor="password" className="visually-hidden">
          Password
        </label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          ariaLabel="Password input"
        />
      </div>
      <div className="input-container">
        <label htmlFor="email" className="visually-hidden">
          Email
        </label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ariaLabel="Email input"
        />
      </div>
      <Button
        className="signup-btn"
        type="submit"
        // onClick={onSignupClick}
        btnText="Sign up"
        ariaLabel="Sign up button"
      />
    </form>
  );
};

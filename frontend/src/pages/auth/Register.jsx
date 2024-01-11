import { userStore } from "../../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/inputs/Input";
import { Button } from "../../components/buttons/Button";

export const Register = () => {
  const { register, username, setUsername, email, setEmail, password, setPassword, errorMessage, setErrorMessage, successfullFetch, isLoading } = userStore();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, password, email);
      if (successfullFetch) {
        navigate("/");
        return;
      } else {
        errorMessage;
      }
      // const response = await register(username, password, email);
      // console.log("Register result:", response);
      // if (response) {
      //   // If the registration is successful, navigate to the login route ("/login").
      //   navigate("/"); // Replace with your desired path
      // }
    } catch (error) {
      // Handle any errors that occur during registration and display an alert.
      console.error("Registration error:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <form>
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
      <p className="error-message disclaimer">{errorMessage}</p>
      {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>) : "" }
      <Button
        className="signup-btn"
        type="submit"
        onClick={handleRegister}
        btnText="Sign up"
        ariaLabel="Sign up button"
      />
    </form>
  );
};

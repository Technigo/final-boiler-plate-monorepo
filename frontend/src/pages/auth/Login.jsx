import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import "./Auth.css";
import { InputField } from "../../components/inputs/InputField";
import { Button } from "../../components/buttons/Button";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      alert("User logged in successfully");
    } catch (error) {
      setErrorMessage("Invalid username or password");
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="auth-wrapper">
      <div className="bg-wrapper">
        <img
          src="./login-register-bg.png"
          className="bg-img"
          alt="Background image of plant leaves"
        />
        <div className="overlay">
          <div className="big-logo">
            <img
              src="./big-logo-sand.svg"
              alt="Plants by Holm and Witting logo"
            />
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username" className="visually-hidden">
                Username
              </label>
              <InputField
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                ariaLabel="Put you username here"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="visually-hidden">
                Password
              </label>
              <InputField
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                ariaLabel="Put you password here"
              />
            </div>
            {errorMessage && (
              <p className="error-message disclaimer">{errorMessage}</p>
            )}
            <Button
              type="submit"
              className="login-btn"
              btnText="Login"
              ariaLabel="To login click on this button"
            />
          </form>
          <nav className="register-link-container">
            {/* Create a navigation menu with links to the login and sign-up routes. */}
            <ul className="app-ul">
              <li className="app-li">
                <span>Don't have an account?</span>
                <Link to="/register">
                  Become a <b>member</b>!
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

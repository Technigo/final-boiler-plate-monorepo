import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import "./Auth.css";
import { InputField } from "../../components/inputs/InputField";
import { Button } from "../../components/buttons/Button";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password });
      alert("User registered successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage("Registration failed");
    }
  };

  const content = {
    srcLogoImg: "./big-logo-sand.svg",
    altLogoImg: "Plants by Holm and Witting logo",
    srcBackgroundImg: "./login-register-bg.png",
    altBackgroundImg: "Background image of plant leaves",
    headingP: "Become a memeber today!",
    labelUsername: "Username",
    labelPassword: "Password",
    labelEmail: "Email",
    inputUsernameAriaLabel: "Put you username here",
    inputPasswordAriaLabel: "Put you password here",
    inputEmailAriaLabel: "Put you email address here",
    btnText: "Register",
    btnAriaLabel: "To register click on this button",
    spanText: "Already have an account?",
    linkTo: "/login",
    linkB: "Login here!",
  };

  return (
    <div className="auth-wrapper">
      <div className="bg-wrapper">
        <img
          src={content.srcBackgroundImg}
          className="bg-img"
          alt={content.altBackgroundImg}
        />
        <div className="overlay">
          <div className="big-logo">
            <img src={content.srcLogoImg} alt={content.altLogoImg} />
          </div>
          <p className="member-text">{content.headingP}</p>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username" className="visually-hidden">
                {content.labelUsername}
              </label>
              <InputField
                type="text"
                name="username"
                value={username}
                placeholder={content.labelUsername}
                onChange={(e) => setUsername(e.target.value)}
                ariaLabel={content.inputUsernameAriaLabel}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="visually-hidden">
                {content.labelPassword}
              </label>
              <InputField
                type="password"
                name="password"
                value={password}
                placeholder={content.labelPassword}
                onChange={(e) => setPassword(e.target.value)}
                ariaLabel={content.inputPasswordAriaLabel}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="visually-hidden">
                {content.labelEmail}
              </label>
              <InputField
                type="email"
                name="email"
                value={email}
                placeholder={content.labelEmail}
                onChange={(e) => setEmail(e.target.value)}
                ariaLabel={content.inputEmailAriaLabel}
              />
            </div>
            {errorMessage && (
              <p className="error-message disclaimer">{errorMessage}</p>
            )}
            <Button
              type="submit"
              className="signup-btn"
              btnText={content.btnText}
              ariaLabel={content.btnAriaLabel}
            />
          </form>
          <nav className="register-link-container">
            {/* Create a navigation menu with links to the login and sign-up routes. */}
            <ul className="app-ul">
              <li className="app-li">
                <span>{content.spanText}</span>
                <Link to={content.linkTo}>
                  <b>{content.linkB}</b>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
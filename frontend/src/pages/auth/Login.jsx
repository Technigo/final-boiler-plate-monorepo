import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { InputField } from "../../components/inputs/InputField";
import { Button } from "../../components/buttons/Button";
import "./Auth.css";

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

  const content = {
    srcLogoImg: "./big-logo-sand.svg",
    altLogoImg: "Plants by Holm and Witting logo",
    srcBackgroundImg: "./login-register-bg.jpg",
    altBackgroundImg: "Background image of plant leaves",
    labelUsername: "Username",
    labelPassword: "Password",
    inputUsernameAriaLabel: "Put you username here",
    inputPasswordAriaLabel: "Put you password here",
    btnText: "Login",
    btnAriaLabel: "To login click on this button",
    spanText: "Don't have an account?",
    linkTo: "/register",
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
          <form onSubmit={handleLogin}>
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
            {errorMessage && (
              <p className="error-message disclaimer">{errorMessage}</p>
            )}
            <Button
              type="submit"
              className="login-btn"
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

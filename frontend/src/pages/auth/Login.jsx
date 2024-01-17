import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";

import { InputField } from "../../components/inputs/InputField";
import { Button } from "../../components/buttons/Button";

import "./Auth.css";

const API_URL = import.meta.env.VITE_BACKEND_API;
const withEndpoint = (endpoint) => `${API_URL}/api/auth/${endpoint}`;

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  // TOASTIFY THINGY ----
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });
  // TOASTIFY THINGY END ----

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        withEndpoint("login"),
        {
          ...inputValue,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      ...inputValue,
      username: "",
      password: "",
    });
  };

  return (
    <>
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

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="visually-hidden">
                  Username
                </label>
                <InputField
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={handleOnChange}
                  ariaLabel="Username text input"
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
                  onChange={handleOnChange}
                  ariaLabel="Password input"
                />
              </div>
              {isLoading ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                ""
              )}
              {errorMessage && (
                <p className="error-message disclaimer">{errorMessage}</p>
              )}
              <Button
                type="submit"
                className="login-btn"
                btnText="Login"
                ariaLabel="login button"
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
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

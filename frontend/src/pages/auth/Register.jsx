import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { InputField } from "../../inputs/inputField";
import { Button } from "../../buttons/Button";

const API_URL = import.meta.env.VITE_BACKEND_API;
const withEndpoint = (endpoint) => `${API_URL}/${endpoint}`;

export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { username, password, email } = inputValue;

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
      position: "bottom-right",
    });
  // TOASTIFY THINGY END ----

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        withEndpoint("register"),
        {
          ...inputValue,
        },
        {
          withCredentials: true,
        }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
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
      email: "",
    });
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="bg-wrapper">
          <img
            src="./login-register-bg.png"
            className="bg-imgage"
            alt="Background image of plant leaves"
          />
          <div className="overlay">
            <div className="big-logo">
              <img
                src="./big-logo-sand.svg"
                alt="Plants by Holm and Witting logo"
              />
            </div>
            <div className="user-auth-form">
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
                <div className="form-group">
                  <label htmlFor="email" className="visually-hidden">
                    Email
                  </label>
                  <InputField
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleOnChange}
                    ariaLabel="Email input"
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
                  className="signup-btn"
                  type="submit"
                  btnText="Sign up"
                  ariaLabel="Sign up button"
                />
              </form>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
    // <div>
    //   <h2>Register</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="username">Username</label>
    //       <input
    //         type="text"
    //         name="username"
    //         value={username}
    //         placeholder="Enter your username"
    //         onChange={handleOnChange}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         name="password"
    //         value={password}
    //         placeholder="Enter your password"
    //         onChange={handleOnChange}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="email">Email</label>
    //       <input
    //         type="email"
    //         name="email"
    //         value={email}
    //         placeholder="Enter your email"
    //         onChange={handleOnChange}
    //       />
    //     </div>
    //     <button type="submit">Register</button>
    //     <span>
    //       Already have an account? <Link to={"/login"}>Login</Link>
    //     </span>
    //   </form>
    //   <ToastContainer />
    // </div>
  );
};

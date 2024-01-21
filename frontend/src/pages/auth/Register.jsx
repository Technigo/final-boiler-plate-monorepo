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
  const navigate = useNavigate()

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
          <p className="member-text">Become a memeber today!</p>
          <form onSubmit={handleRegister}>
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
            <div className="form-group">
              <label htmlFor="email" className="visually-hidden">
                Email
              </label>
              <InputField
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                ariaLabel="Put you email address here"
              />
            </div>
            {errorMessage && (
              <p className="error-message disclaimer">{errorMessage}</p>
            )}
            <Button
              type="submit"
              className="signup-btn"
              btnText="Register"
              ariaLabel="To register click on this button"
            />
          </form>
          <nav className="register-link-container">
            {/* Create a navigation menu with links to the login and sign-up routes. */}
            <ul className="app-ul">
              <li className="app-li">
                <span>Already have an account?</span>
                <Link to="/login">
                  <b>Login here!</b>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    // <div>
    //   <h2>Register</h2>
    //   <label>
    //     Username:
    //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    //   </label>
    //   <br />
    //   <label>
    //     Password:
    //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   </label>
    //   <br />
    //   <button onClick={handleRegister}>Register</button>
    // </div>
  );
};

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "username") setUsername(value);
//     else if (name === "password") setPassword(value);
//     else if (name === "email") setEmail(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     userStore.getState().setIsLoading(true);
//     userStore.getState().setErrorMessage(""); // Clear the error message
//     try {
//       await register(username, password, email);
//       setTimeout(() => {
//         navigate("/login");
//       }, 1000);
//     } catch (error) {
//       userStore
//         .getState()
//         .setErrorMessage("An error occurred during registration");
//       userStore.getState().setIsLoading(false); // Set loading to false in case of error
//     } finally {
//       userStore.getState().setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="auth-wrapper">
//         <div className="bg-wrapper">
//           <img
//             src="./login-register-bg.png"
//             className="bg-img"
//             alt="Background image of plant leaves"
//           />
//           <div className="overlay">
//             <div className="big-logo">
//               <img
//                 src="./big-logo-sand.svg"
//                 alt="Plants by Holm and Witting logo"
//               />
//             </div>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="username" className="visually-hidden">
//                   Username
//                 </label>
//                 <InputField
//                   type="text"
//                   name="username"
//                   value={username}
//                   placeholder="Username"
//                   onChange={handleOnChange}
//                   ariaLabel="Username text input"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password" className="visually-hidden">
//                   Password
//                 </label>
//                 <InputField
//                   type="password"
//                   name="password"
//                   value={password}
//                   placeholder="Password"
//                   onChange={handleOnChange}
//                   ariaLabel="Password input"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email" className="visually-hidden">
//                   Email
//                 </label>
//                 <InputField
//                   type="email"
//                   name="email"
//                   value={email}
//                   placeholder="Email"
//                   onChange={handleOnChange}
//                   ariaLabel="Email input"
//                 />
//               </div>
//               {isLoading ? (
//                 <Box sx={{ display: "flex" }}>
//                   <CircularProgress />
//                 </Box>
//               ) : (
//                 ""
//               )}
//               {errorMessage && (
//                 <p className="error-message disclaimer">{errorMessage}</p>
//               )}
//               <Button
//                 className="signup-btn"
//                 type="submit"
//                 btnText="Sign up"
//                 ariaLabel="Sign up button"
//               />
//             </form>
//             <nav className="register-link-container">
//               {/* Create a navigation menu with links to the login and sign-up routes. */}
//               <ul className="app-ul">
//                 <li className="app-li">
//                   <span>Already have an account?</span>
//                   <Link to="/login">
//                     <b>Login here!</b>
//                   </Link>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

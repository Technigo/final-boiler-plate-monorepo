import { userStore } from "../../stores/userStore";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { Input } from "../../components/inputs/Input";
import { Button } from "../../components/buttons/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./UserAuthPage.css";

export const Login = () => {
  const {
    login,
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    isLoading,
  } = userStore();

  // Use the 'useNavigate' hook to programmatically navigate between routes.
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      const loggedInValue = localStorage.getItem("isLoggedIn");
      const isLoggedIn = loggedInValue === "true";
      // const response = await login(username, password);
      // console.log("Login result:", response);
      // if (response) {
      //   // If the login is successful, navigate to the login route ("/").
      //   navigate("/"); // Replace with your desired path
      // }
      if (isLoggedIn) {
        navigate("/");
        setErrorMessage("");
        return;
      } else {
        errorMessage;
      }
    } catch (error) {
      // Handle any errors that occur during signup and display an alert.
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  // // Function to handle the click event of the login button.
  // const onLoginClick = async () => {
  //   if (!username || !password) {
  //     // Display an alert if either 'username' or 'password' is empty.
  //     alert("Please enter both username and password");
  //     return;
  //   }
  //   try {
  //     // Call the 'handleLogin' function from 'userStore' with 'username' and 'password' parameters.
  //     await storeHandleLogin(username, password);
  //     // Get the 'isLoggedIn' state from 'userStore'.
  //     const isLoggedIn = userStore.getState().isLoggedIn;
  //     if (isLoggedIn) {
  //       // If the user is logged in, navigate to the "/home" route.
  //       navigate("/");
  //     }
  //     // Additional logic after successful login can be added here.
  //   } catch (error) {
  //     // Handle any errors that occur during login and display an alert.
  //     console.error("Login error:", error);
  //     alert("An error occurred during login");
  //   }
  // };

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
            <div className="user-auth-container">
              <form>
                <div className="form-group">
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
                <div className="form-group">
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
                {isLoading ? (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  ""
                )}
                
                {errorMessage && <p className="error-message disclaimer">{errorMessage}</p>}
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="login-btn"
                    btnText="Login"
                    ariaLabel="login button"
                  />

              </form>
            </div>
            <nav className="register-link-container">
              {/* Create a navigation menu with links to the login and sign-up routes. */}
              <ul className="app-ul">
                <li className="app-li">
                  <span>Don't have an account?</span>
                  <Link to="/register">
                    Become a <b>member</b>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
    // <div className="login-wrapper">
    //   <div className="bg-wrapper">
    //     <img src="./login-register-bg.png" alt="" className="bg-img" />
    //     <div className="overlay">
    //       {/* Display the heading and paragraphs. */}
    //       <div className="big-logo">
    //         <img
    //           src="./big-logo-sand.svg"
    //           alt="Plants by Holm and Witting logo"
    //         />
    //       </div>
    //       <div className="user-login">
    //         {/* Create input fields for 'username' and 'password' and associate them with state variables. */}
    //         <div className="input-container">
    //           <Input
    //             type="text"
    //             placeholder="Username"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //             ariaLabel="Username input"
    //           />
    //           <Input
    //             type="password"
    //             placeholder="Password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             ariaLabel="Password input"
    //           />
    //         </div>
    //         <a className="forgot-password">Forgot Password?</a>
    //         {/* Create a button for logging in and attach the 'onLoginClick' event handler. */}
    //         <Button
    //           className="login-btn"
    //           onClick={onLoginClick}
    //           btnText="Login"
    //           ariaLabel="login button"
    //         />
    //       </div>
    //       <nav className="register-link-container">
    //         {/* Create a navigation menu with links to the login and sign-up routes. */}
    //         <ul className="app-ul">
    //           <li className="app-li">
    //             <span>Don't have an account?</span>
    //             <Link to="/register">
    //               Become a <b>member</b>
    //             </Link>
    //           </li>
    //         </ul>
    //       </nav>
    //     </div>
    //   </div>
    // </div>
  );
};

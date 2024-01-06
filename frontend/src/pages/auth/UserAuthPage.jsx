import { Register } from "./Register"; // Import the 'Register' component.
import { Login } from "./Login"; // Import the 'Login' component.
import "./UserAuthPage.css";

export const UserAuthPage = () => {
  return (
    <div className="auth-wrapper">
      <div className="bg-wrapper">
        <img
          src="./login-register-bg.png"
          className="bg-img"
          alt="Background image of leaves"
        />
        <div className="overlay">
          <div className="big-logo">
            <img
              src="./big-logo-sand.svg"
              alt="Plants by Holm and Witting logo"
            />
          </div>
          <div className="user-auth-container"></div>
          <Register />
          <Login />
        </div>
      </div>
    </div>
  );
};

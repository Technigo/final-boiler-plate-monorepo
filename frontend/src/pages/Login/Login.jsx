import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import "../../pages/form.css";

export const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useUserStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading indicator

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts
    try {
      await loginUser(username, password);
      if (useUserStore.getState().isLoggedIn) {
        navigate("/secretpage");
      }
    } finally {
      setLoading(false); // Set loading to false when login completes (success or failure)
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="form">
        <div className="form-group">
        <h1>Sign in</h1>
          <label htmlFor="username">Username:</label>
          <input
            className="input-field"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            className="input-field"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="loginAndRegisterBtns">
          <Button
            className={"button"}
            handleOnClick={handleLogin}
            btnText={"Login"}
          />
          <Link to="/register">
            <Button className={"button"} btnText={"Register"} />
          </Link>
        </div>
      </form>
      {loading && <Loader />} {/* Display loader when loading is true */}
    </div>
  );
};
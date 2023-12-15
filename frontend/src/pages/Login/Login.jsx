import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { useTranslation } from "react-i18next"
import "../../pages/form.css";

export const Login = () => {
  const { t } = useTranslation()
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
         <h1 className="form-header">{t("Form.greeting")}</h1>
        <div className="form-group">
          <label htmlFor="username"></label>
          <input
            className="input-field"
            type="text"
            id="username"
            placeholder={t("Form.username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            className="input-field"
            type="password"
            id="password"
            placeholder={t("Form.password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Button
            className={"form-button"}
            handleOnClick={handleLogin}
            btnText={t("Form.login")}
          />
        </div>
         <div>
          <h2 className="form-header">{t("Form.new")}</h2>
          <Link to="/register">
            <Button className={"form-button"} btnText={t("Form.newregister")} />
          </Link>
        </div>
        </form>
       
      
      {loading && <Loader />} {/* Display loader when loading is true */}
    </div>
  );
};
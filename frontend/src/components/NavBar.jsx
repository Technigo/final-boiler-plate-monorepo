//Satte in ny kod för att bara visa "my pages" om man är inloggad. 


import { Button } from "./Button";
import { Link } from "react-router-dom";
import { Translations } from "../Translations/Translations";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../stores/useUserStore";
import "./navbar.css";

export const NavBar = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useUserStore(); 

  return (
    <div className="navbar">
      <div className="left-section">
        
        <Translations />
      </div>
      <Link to="/">
        <img className="site-logo" src="./playground-svgrepo-com.svg" alt="" />
      </Link>
      <div className="right-section">
        {isLoggedIn ? (
          // If user is logged in, show "My Pages"
          <Link to="/secretpage">
            <Button className={"my-favorites"} btnText={t("Navbar.myPages")} />
          </Link>
        ) : (
          // If user is not logged in, show "Log In"
          <Link to="/login">
            <Button className={"my-favorites"} btnText={t("Form.login")} />
          </Link>
        )}
      </div>
    </div>
  );
};


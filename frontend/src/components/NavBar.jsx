import { IoIosGlobe } from "react-icons/io";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { Translations } from "../Translations/Translations";
import { useTranslation } from "react-i18next"
import "./navbar.css"

export const NavBar = () => {
  const { t } = useTranslation()

  return (
    <div className="navbar">
      <div className="left-section">
        <IoIosGlobe color="white" style={{ fontSize: '30px' }} > </IoIosGlobe>
        <Translations />
      </div>
      <Link to="/">
      <img 
      className="site-logo"
       src="./playground-svgrepo-com.svg" alt="" />
      </Link>
      <div className="right-section">
        {/* <Link to="/">
        <a href="#">{t("Navbar.home")}</a>
        </Link> */}
        <Link to="/login">
          <Button className={"my-favorites"} btnText={t("Navbar.myPages")} />
        </Link>
        {/* <a href="#">Mina Sidor</a> */}
      </div>
    </div>
  );
};


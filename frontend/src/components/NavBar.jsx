import { IoIosGlobe } from "react-icons/io";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { Translations } from "../Translations/Translations";
import { useTranslation } from "react-i18next"

export const NavBar = () => {
  const { t } = useTranslation()

  return (
    <div className="navbar">
      <div className="left-section">
        <IoIosGlobe color="white" style={{ fontSize: '30px' }} > </IoIosGlobe>
        <Translations />
      </div>
      <div className="right-section">
        <a href="#">{t("Navbar.home")}</a>
        <Link to="/login">
          <Button className={"my-favorites"} btnText={t("Navbar.myPages")} />
        </Link>
        {/* <a href="#">Mina Sidor</a> */}
      </div>
    </div>
  );
};


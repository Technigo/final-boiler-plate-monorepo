// import { IoIosGlobe } from "react-icons/io";
// import { Button } from "./Button";
// import { Link } from "react-router-dom";
// import { Translations } from "../Translations/Translations";
// import { useTranslation } from "react-i18next"
// import "./navbar.css"

// export const NavBar = () => {
//   const { t } = useTranslation()

//   return (
//     <div className="navbar">
//       <div className="left-section">
//         <IoIosGlobe color="white" style={{ fontSize: '30px' }} > </IoIosGlobe>
//         <Translations />
//       </div>
//       <Link to="/">
//       <img 
//       className="site-logo"
//        src="./playground-svgrepo-com.svg" alt="" />
//       </Link>
//       <div className="right-section">
//         {/* <Link to="/">
//         <a href="#">{t("Navbar.home")}</a>
//         </Link> */}
//         <Link to="/login">
//           <Button className={"my-favorites"} btnText={t("Navbar.myPages")} />
//         </Link>
//         {/* <a href="#">Mina Sidor</a> */}
//       </div>
//     </div>
//   );
// };

//Satte in ny kod för att bara visa "my pages" om man är inloggad. Behöver lösa hur man fixar den översatta texten..

import { IoIosGlobe } from "react-icons/io";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { Translations } from "../Translations/Translations";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../stores/useUserStore";
import "./navbar.css";

export const NavBar = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useUserStore(); // Assuming your user store has a state for login status

  return (
    <div className="navbar">
      <div className="left-section">
        <IoIosGlobe color="white" style={{ fontSize: '30px' }} > </IoIosGlobe>
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
            <Button className={"my-favorites"} btnText={t("Navbar.logIn")} />
          </Link>
        )}
      </div>
    </div>
  );
};


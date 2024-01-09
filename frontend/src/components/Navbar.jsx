import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import { Logo } from "../components/reusableComponents/Logo";
import { Icon } from "../components/reusableComponents/Icon";
import logoutIcon from "../assets/logout.svg";

export const Navbar = ({ menuItems, menuDesks }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav>
        <ul className="app-ul">
          <div className="navbar-logo">
            <Logo color="white"/>
          </div>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className={`bar ${isMenuOpen ? "open" : ""}`} />
            <div className={`bar ${isMenuOpen ? "open" : ""}`} />
            <div className={`bar ${isMenuOpen ? "open" : ""}`} />
          </div>

          {menuDesks.map((menuDesk, index) => (
            <li key={menuDesk.path || `desk-${index}`} className="app-li">
              {menuDesk.path ? (
                <Link to={menuDesk.path}>{menuDesk.name}</Link>
              ) : (
                <div className="logout-container" onClick={menuDesk.onClick}>
                  <Icon src={logoutIcon} size="small" invert />
                  <span className="sign-out-text">Sign Out</span>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          {isMenuOpen && (
            <div className="close-button" onClick={toggleMenu}>
              &times;
            </div>
          )}
          <ul className="nav-list">
            {menuItems.map((menuItem, index) => (
              <li key={menuItem.path || `item-${index}`} className="app-li">
                {menuItem.path ? (
                  <Link to={menuItem.path}>{menuItem.name}</Link>
                ) : (
                  <div className="logout-container" onClick={menuItem.onClick}>
                    <Icon src={logoutIcon} size="small" invert />
                    <span className="sign-out-text">Sign Out</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

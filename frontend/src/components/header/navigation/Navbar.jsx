import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Navigation } from "./Navigation";

// ICONS
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { CgSearch } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi2";

// NAVBAR COMPONENT
export const Navbar = () => {
  const [hiddenMenu, setHiddenMenu] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const toggleHiddenMenu = () => {
    setHiddenMenu(!hiddenMenu);
  };

  return isMobile ? (
    <div className="header-wrapper">
      <nav className="nav-container">
        <div className="nav-sections">
          <IoIosMenu className="menu-icon" onClick={toggleHiddenMenu} />
          <div className="search-container">
            <CgSearch className="search-icon" />
          </div>
          <div className="logo-container">
            <Link to="/">
              <img
                src="./logo-sand.svg"
                alt="Plants by Holm and Witting logotype"
              />
            </Link>
          </div>
        </div>
        <div className="nav-sections">
          <div className="wishlist-container">
            <IoHeart className="heart-icon" />
          </div>
          <Link to="/cart">
            <div className="bag-container">
              <HiShoppingBag className="bag-icon" />
            </div>
          </Link>
        </div>
      </nav>
      {hiddenMenu && (
        <div className="hidden-menu">
          <IoClose className="close-icon" onClick={toggleHiddenMenu} />
          <Navigation />
        </div>
      )}
    </div>
  ) : (
    <div className="header-wrapper">
      <nav className="nav-container">
        <div className="nav-sections">
          <div className="shop-menu" onClick={toggleHiddenMenu}>
            <IoIosMenu className="menu-icon" />
            <span>shop</span>
          </div>
          <div className="search-container">
            <CgSearch className="search-icon" />
          </div>
        </div>
        <div className="logo-container">
          <Link to="/">
            <img
              src="./logo-sand.svg"
              alt="Plants by Holm and Witting logotype"
            />
          </Link>
        </div>
        <div className="nav-sections">
          <Link to="/login">Login</Link>
          <Link to="/">
            <IoHeart className="heart-icon" />
          </Link>
          <Link to="/cart">
            <div className="bag-container">
              <HiShoppingBag className="bag-icon" />
            </div>
          </Link>
        </div>
      </nav>
      {hiddenMenu && (
        <div className="hidden-menu">
          <IoClose className="close-icon" onClick={toggleHiddenMenu} />
          <Navigation />
        </div>
      )}
    </div>
  );
};

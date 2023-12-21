import { useState } from "react";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import { CgSearch } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi2";

import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import "./Nav.css";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return isMobile ? (
    <div className="header-container">
      <div className="left-side">
        <div className="nav-toggle" onClick={handleMenuToggle}>
          {isMenuOpen ? (
            <IoIosClose className="close-icon" />
          ) : (
            <IoIosMenu className="open-icon" />
          )}
        </div>
        <div className="search-container">
          <CgSearch className="search-icon" />
        </div>
      </div>
      <div className="logo-container">
        <img src="./logo-sand.svg" alt="Plants by Holm and Witting logotype" />
      </div>
      <div className="right-side">
        <IoHeart className="heart-icon" />
        <Link to="/cart">
          <HiShoppingBag className="bag-icon" />
        </Link>
      </div>
    </div>
  ) : (
    <div className="header-container">
      <div className="left-side">
        <IoIosMenu className="menu-icon" />
        <span>shop</span>
        <div className="search-icon-container">
          <CgSearch className="search-icon" />
        </div>
      </div>
      <div className="logo-container">
        <img src="./logo-sand.svg" alt="Plants by Holm and Witting logotype" />
      </div>
      <div className="right-side">
        <Link to="/login">
          <div className="login-container">
            <span className="login-nav">login</span>
          </div>
        </Link>
        <div className="wishlist-container">
          <IoHeart className="heart-icon" />
        </div>
        <Link to="/cart">
          <div className="bag-container">
            <HiShoppingBag className="bag-icon" />
          </div>
        </Link>
      </div>
    </div>
  );
};

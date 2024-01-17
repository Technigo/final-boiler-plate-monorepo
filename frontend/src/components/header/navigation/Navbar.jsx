import { useState, useEffect } from "react";
import { cartStore } from "../../../stores/cartStore";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Navigation } from "./Navigation";

// ICONS
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";

// NAVBAR COMPONENT
export const Navbar = () => {
  const { numberOfProducts } = cartStore();

  const [hiddenMenu, setHiddenMenu] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const toggleHiddenMenu = () => {
    setHiddenMenu(!hiddenMenu);
  };

  // Add or remove the 'no-scroll' class on the body when hiddenMenu changes
  useEffect(() => {
    if (hiddenMenu) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [hiddenMenu]);

  return isMobile ? (
    <div className="header-wrapper">
      <nav className="nav-container">
        <div className="nav-sections">
          <IoIosMenu className="menu-icon" onClick={toggleHiddenMenu} />
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
          <Link to="/login">
            <FaUser className="user-icon" />
          </Link>
          <Link to="/wishlist">
            <IoHeart className="heart-icon" />
          </Link>
            <Link to="/cart" className="cart-badge-container">
              <HiShoppingBag className="cart-icon" />
              <div className="cart-count">{numberOfProducts}</div>
            </Link>
        </div>
      </nav>
      {hiddenMenu && (
        <div className="overlay-background">
          <div className="hidden-menu">
            <div className="menu-header">
              <IoClose className="close-icon" onClick={toggleHiddenMenu} />
            </div>
            <Navigation />
          </div>
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
          <Link to="/wishlist">
            <IoHeart className="heart-icon" />
          </Link>
          <Link to="/cart" className="cart-badge-container">
              <HiShoppingBag className="cart-icon" />
              <div className="cart-count" badgeContent={numberOfProducts}>{numberOfProducts}</div>
            </Link>
        </div>
      </nav>
      {hiddenMenu && (
        <div className="overlay-background">
          <div className="hidden-menu">
            <div className="menu-header">
              <IoClose className="close-icon" onClick={toggleHiddenMenu} />
            </div>

            <Navigation />
          </div>
        </div>
      )}
    </div>
  );
};

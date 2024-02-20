import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { cartStore } from "../../../stores/useCartStore";
import { Navigation } from "./Navigation";

// ICONS
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi2";
import { RiUserLine } from "react-icons/ri";


// NAVBAR COMPONENT
export const Navbar = () => {
  // Get the number of products in the cart
  const { numberOfProducts } = cartStore();

  // State for the hidden menu
  const [hiddenMenu, setHiddenMenu] = useState(false);

  // Check if the screen is mobile
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const toggleHiddenMenu = (event) => {
    // stop propagation to prevent triggering handleOutsideClick
    if ( event ) {
      event.stopPropagation();
    }
    setHiddenMenu(!hiddenMenu);
  };

  // useRef for handling outside click of the hamburger menu
  const menuRef = useRef(null);
  // Close the menu when clicking outside of it
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      // Click outside the menu, close it
      setHiddenMenu(false);
    }
  };

  // Add or remove the 'no-scroll' class on the body when hiddenMenu changes
  // also listen for outside clicks when menu is open.
  useEffect(() => {
    if (hiddenMenu) {
      document.body.classList.add("no-scroll");
      document.addEventListener("click", handleClickOutside);
    } else {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [hiddenMenu]);

  return isMobile ? (
    <div className="header-wrapper">
      <nav className="nav-container">
        <div className="nav-sections">
          <IoIosMenu className="menu-icon" onClick={toggleHiddenMenu} />
        </div>
        <div className="logo-container">
          <Link to="/" aria-label="Go to home page">
            <img
              src="../../logo-sand.svg"
              alt="Plants by Holm and Witting logotype"
            />
          </Link>
        </div>
        <div className="nav-sections">
          <Link to="/dashboard" aria-label="Go to account dashboard">
            <RiUserLine className="user-icon" />
          </Link>
          <Link to="/cart" className="cart-badge-container" aria-label="Go to your cart">
            <HiShoppingBag className="cart-icon" />
            <div className="cart-count">{numberOfProducts}</div>
          </Link>
        </div>
      </nav>
      {hiddenMenu && (
        <div className="overlay-background">
          <div className="hidden-menu" ref={menuRef}>
            <div className="menu-header">
              <IoClose className="close-icon" onClick={toggleHiddenMenu} />
            </div>
            <Navigation closeMenu={toggleHiddenMenu}/>
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
          <Link to="/" aria-label="Go to home page">
            <img
              src="../../logo-sand.svg"
              alt="Plants by Holm and Witting logotype"
            />
          </Link>
        </div>
        <div className="nav-sections">
          <Link to="/dashboard" aria-label="Go to account dashboard">Account</Link>
          <Link to="/cart" className="cart-badge-container" aria-label="Go to your cart">
            <HiShoppingBag className="cart-icon" />
            <div className="cart-count">
              {numberOfProducts}
            </div>
          </Link>
        </div>
      </nav>
      {hiddenMenu && (
        <div className="overlay-background">
          <div className="hidden-menu" ref={menuRef}>
            <div className="menu-header">
              <IoClose className="close-icon" onClick={toggleHiddenMenu} />
            </div>
            <Navigation closeMenu={toggleHiddenMenu}/>
          </div>
        </div>
      )}
    </div>
  );
};

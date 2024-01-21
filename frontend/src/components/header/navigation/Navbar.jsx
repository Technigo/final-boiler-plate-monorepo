import { useState, useEffect, useRef } from "react";
import { cartStore } from "../../../stores/useCartStore";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Navigation } from "./Navigation";

// ICONS
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi2";
import { RiUserLine } from "react-icons/ri";


// NAVBAR COMPONENT
export const Navbar = () => {
  const { numberOfProducts } = cartStore();

  const [hiddenMenu, setHiddenMenu] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const toggleHiddenMenu = (event) => {
    event.stopPropagation();
    setHiddenMenu(!hiddenMenu);
  };

  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      // Click outside the menu, close it
      setHiddenMenu(false);
    }
  };

  // Add or remove the 'no-scroll' class on the body when hiddenMenu changes
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
          <IoIosMenu className="menu-icon" onClick={(e) => toggleHiddenMenu(e)} />
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
          <Link to="/dashboard">
            <RiUserLine className="user-icon" />
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
          <div className="hidden-menu" ref={menuRef}>
            <div className="menu-header">
              <IoClose className="close-icon" onClick={toggleHiddenMenu} />
            </div>
            <Navigation onClick={toggleHiddenMenu} />
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
          <Link to="/dashboard">Account</Link>
          <Link to="/wishlist">
            <IoHeart className="heart-icon" />
          </Link>
          <Link to="/cart" className="cart-badge-container">
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

            <Navigation  onClick={toggleHiddenMenu}/>
          </div>
        </div>
      )}
    </div>
  );
};
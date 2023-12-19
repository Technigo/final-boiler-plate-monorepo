import "./Nav.css";
import { IoHeart } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi2";

export const NavRight = () => {
  return (
    <div className="nav-right-wrapper">
      <div className="login-container">
        <p className="login-nav">login</p>
      </div>
      <div className="wishlist-container">
        <IoHeart className="heart-icon" />
      </div>
      <div className="bag-container">
        <HiShoppingBag className="bag-icon" />
      </div>
    </div>
  );
};

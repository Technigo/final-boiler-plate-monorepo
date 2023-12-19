import "./Nav.css";
import { IoIosMenu } from "react-icons/io";
import { CgSearch } from "react-icons/cg";

export const NavLeft = () => {
  return (
    <div className="nav-left-wrapper">
      <div className="menu-icon-container">
        <IoIosMenu className="menu-icon" />
      </div>
      <p className="shop-nav">shop</p>
      <div className="search-icon-container">
        <CgSearch className="search-icon" />
      </div>
    </div>
  );
};

import { useState } from "react"
import { IoIosClose, IoIosMenu } from "react-icons/io";
import { CgSearch } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
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
        {/* <Link to="/login"> */}
          <div className="login-container">
            <span className="login-nav">login</span>
          </div>
        {/* </Link> */}
        <div className="wishlist-container">
          <IoHeart className="heart-icon" />
        </div>
        {/* <Link to="/cart"> */}
          <div className="bag-container">
            <HiShoppingBag className="bag-icon" />
          </div>
        {/* </Link> */}
      </div>
    </div>
  )
}

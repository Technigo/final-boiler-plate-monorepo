import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import "./UserDashboard.css";
import { Button } from "../../components/buttons/Button";

import { IoHeart } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";


export const UserDashboard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="title-container">
          <h2 className="section-title">Dashboard</h2>
        </div>
        <h3>Welcome, {user.username}!</h3>
        <p className="dashboard-text">
          From your account dashboard you can found your wishlist, recent orders
          and edit your account details.
        </p>
        <ul className="dashboard-links-wrapper">
          <li className="dashboard-links">
            <IoHeart size={24} />
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li className="dashboard-links">
            <HiShoppingBag size={24} />
            <Link to="/">Orders (0)</Link>
          </li>
          <li className="dashboard-links">
            <RiUserSettingsFill size={24} />
            <Link to="/">Account Details</Link>
          </li>
        </ul>
        <Button
          className="logout-btn"
          type="button"
          onClick={logout}
          aria-label="To logout click on this button"
          btnText="Logout"
        />
      </div>
    </div>
  );
};

import BackArrow from "../components/reusableComponents/BackArrow";
import { Button } from "../components/reusableComponents/Button";
import { UserAds } from "../components/UserAds";
import { userStore } from "../stores/userStore";
import { SavedAds } from "../components/UsersSavedAds";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import Swal from "sweetalert2";
import "./manageYourAds.css";

export const ManageYourAds = () => {
  const navigate = useNavigate();

  const handleCreateAd = () => {
    navigate("/create-ad");
  };

  // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
  const isLoggedin = userStore((state) => state.isLoggedin);
  const handleLogout = userStore((state) => state.handleLogout);
  // useEffect hook to check user authentication status.
  useEffect(() => {
    if (!isLoggedin) {
      // If the user is not logged in, show an alert and navigate to the login route.
      Swal.fire({
        title: "Error!",
        text: "Please log in to see the content",
        icon: "error",
      });
      navigate("/login");
    }
  }, [isLoggedin, navigate]);

  return (
    <>
      <Navbar
        menuItems={[
          { path: "/home", name: "Home" },
          { path: "/search", name: "Search" },
          { path: "/settings", name: "My Settings" },
          { path: "/manage-your-ads", name: "My Products" },
          { path: "/about", name: "About" },
          { path: "/terms", name: "Terms" },
          {
            name: "Logout",
            onClick: () => {
              handleLogout();
              navigate("/login");
            },
          },
        ]}
        menuDesks={[
          { path: "/home", name: "Home" },
          { path: "/search", name: "Search" },
          { path: "/settings", name: "My Settings" },

          {
            name: "Logout",
            onClick: () => {
              handleLogout();
              navigate("/login");
            },
          },
        ]}
      />
      <div className="main-container">
        <div className="main-wrapper">
          <div className="your-ads-container">
            <div className="manage-nav">
              <BackArrow />
              <Button
                iconSize="small"
                label="Create ad"
                onClick={handleCreateAd}
                invertIcon={true}
              />
              <h2>My Products</h2>
              <UserAds />
              <h2>Saved Products</h2>
              <SavedAds />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

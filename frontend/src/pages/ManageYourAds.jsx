import BackArrow from '../components/reusableComponents/BackArrow';
import { userStore } from "../stores/userStore";
import { UserAds } from '../components/UserAds';
import { SavedAds } from '../components/UsersSavedAds';
import { useNavigate, Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import "./manageYourAds.css";
import { Navbar } from '../components/Navbar';

export const ManageYourAds = () => {
  const navigate = useNavigate();

  const handleLogout = userStore((state) => state.handleLogout);

  return (
    <>
      <Navbar
        menuItems={[
          { path: "/search", name: "Search" },
          { path: "/settings", name: "My Setting" },
          {
            name: "Logout",
            onClick: () => {
              handleLogout();
              navigate("/login");
            },
          },
        ]}
        menuDesks={[
          { path: "/search", name: "Search" },
          { path: "/settings", name: "Settings" },
          {
            name: "Logout",
            onClick: () => {
              handleLogout();
              navigate("/login");
            },
          },
        ]}
        logoRedirectPath="/home"
      />
      <div className="main-container">
        <div className="main-wrapper">
          <div className="your-ads-container">
            <div className="manage-nav">
              <BackArrow />
            </div>
              <div className="manage-content">
                <h1>Your Products</h1>
                <div className="add-btn">
                  <Link to="/create-ad">+ Add a product</Link>
                </div>
                <UserAds />
              </div>
              <div>
                <h2>Your Saved Products</h2>
                <SavedAds />
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


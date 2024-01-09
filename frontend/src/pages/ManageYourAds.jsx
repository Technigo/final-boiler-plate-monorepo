import BackArrow from '../components/reusableComponents/BackArrow';
import { userStore } from "../stores/userStore";
import { Button } from '../components/reusableComponents/Button';
import { UserAds } from '../components/UserAds';
import { SavedAds } from '../components/UsersSavedAds';
import { useNavigate } from 'react-router-dom';
import { Footer } from "../components/Footer";
import "./manageYourAds.css";
import { Navbar } from '../components/Navbar';

export const ManageYourAds = () => {
  const navigate = useNavigate();

  const handleLogout = userStore((state) => state.handleLogout);

  const handleCreateAd = () => {
    navigate('/create-ad');
  };

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
          { path: "/settings", name: "Settings" },
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
              <Button
                iconSize="small"
                label="Create ad"
                onClick={handleCreateAd}
                invertIcon={true}
              />
              <h2>Your Products</h2>
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


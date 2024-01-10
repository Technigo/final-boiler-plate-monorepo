import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";
import BackArrow from "../components/reusableComponents/BackArrow";
import { Button } from "../components/reusableComponents/Button";
import defaultProfileImage from "../assets/images/profile_icon.png";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import "./profileSettings.css";

export const ProfileSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // To track if the data fetching was successful

  const isLoggedin = userStore((state) => state.isLoggedin);
  const handleLogout = userStore((state) => state.handleLogout);
  const userId = userStore((state) => state.userId);
  const username = userStore((state) => state.username);
  const storeHandleProfileDisplay = userStore(
    (state) => state.handleProfileDisplay
  );
  const storeHandleAccountDeletion = userStore(
    (state) => state.handleAccountDeletion
  );

  // Use the 'useNavigate' hook to programmatically navigate between routes.
  const navigate = useNavigate();

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

  const [profileData, setProfileData] = useState({
    email: "",
    password: "",
    introduction: "",
    location: "",
    image: null,
  });

  useEffect(() => {
    const getProfileData = async () => {
      setIsLoading(true);
      try {
        const profileData = await storeHandleProfileDisplay(isLoggedin, userId);
        if (profileData) {
          setProfileData({
            email: profileData.email,
            password: profileData.password,
            introduction: profileData.introduction,
            location: profileData.location,
            image: profileData.image,
          });
          setIsLoading(false);
          setIsSuccess(true);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsLoading(false);
        setIsSuccess(false);
      }
    };
    getProfileData();
  }, [storeHandleProfileDisplay, isLoggedin, userId]);

  const handleUpdateClick = () => {
    navigate("/update-settings");
  };

  const handleDeleteClick = () => {
    storeHandleAccountDeletion();
  };

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
          { path: "/manage-your-ads", name: "My Products" },

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
          <div className="arrow-wrapper">
            <BackArrow />
          </div>
          <div className="profile-settings">
            <h1>My settings</h1>
            {isLoading ? (
            <div className="loading-container">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: loadingAnimation,
                }}
              />
            </div>
            ) : (
              <>
                {profileData.image ? (
                  <img
                    src={profileData.image}
                    alt={username}
                    className="profile-img"
                  />
                ) : (
                  <img
                    src={defaultProfileImage}
                    alt={username}
                    className="profile-img"
                  />
                )}
                <div className="profile-text">
                  <p>Username: {username}</p>
                  <div className="password-wrapper">
                    <p>Password: </p>
                    <p className="current-password">{profileData.password}</p>
                  </div>
                  <p>Email: {profileData.email}</p>
                  <p>Location: {profileData.location}</p>
                  <p>Introduction: {profileData.introduction}</p>
                </div>

                <div className="settings-actions">
                  <Button
                    icon="./src/assets/edit.svg"
                    iconSize="button"
                    label="Edit settings"
                    onClick={handleUpdateClick}
                    invertIcon={true}
                  />
                  <Button
                    icon="./src/assets/trash.svg"
                    iconSize="button"
                    label="Delete account"
                    onClick={handleDeleteClick}
                    invertIcon={true}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

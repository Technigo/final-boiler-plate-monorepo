import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";
import BackArrow from "../components/reusableComponents/BackArrow";
import { Button } from "../components/reusableComponents/Button";
import defaultProfileImage from "../assets/images/profile_icon.png";
import "./profileSettings.css";

export const ProfileSettings = () => {
  // const [isEditing, setIsEditing] = useState(false);
  const isLoggedin = userStore((state) => state.isLoggedin);
  const userId = userStore((state) => state.userId);
  const username = userStore((state) => state.username);
  const storeHandleProfileDisplay = userStore((state) => state.handleProfileDisplay);
  const storeHandleAccountDeletion = userStore((state) => state.handleAccountDeletion);

  // Use the 'useNavigate' hook to programmatically navigate between routes.
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    email: "", 
    password: "",
    introduction: "",
    location: "",
    image: null,
  });
  
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const profileData = await storeHandleProfileDisplay(isLoggedin, userId);
        if (profileData) {
          setProfileData({
            email: profileData.email,
            password: profileData.password,
            introduction: profileData.introduction,
            location: profileData.location,
            image: profileData.image
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
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
    <div className="main-container">
      <div className="main-wrapper">
        <div className="arrow-wrapper">
          <BackArrow />          
        </div>
        <div className="profile-settings">
          <h1>Your settings</h1>
          {profileData.image ? (
            <img src={profileData.image} alt={username} className="profile-img" />
          ) : (
            <img src={defaultProfileImage} alt={username} className="profile-img" />
          )}
          <div className="profile-text">
            <p>Username: {username}</p>
            <div className="password-wrapper">
              <p>Password: </p><p className="current-password">{profileData.password}</p>
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
        </div>
      </div>
    </div>
  );
}

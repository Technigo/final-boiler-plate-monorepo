import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";
import BackArrow from "../components/reusableComponents/BackArrow";
import { Button } from "../components/reusableComponents/Button";
import defaultProfileImage from "../assets/images/profile_icon.png";

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
    <>
      <BackArrow />
      <div>
        <h1>Your settings</h1>
        {profileData.image ? (
          <img src={profileData.image} alt={username} />
        ) : (
          <img src={defaultProfileImage} alt={username} />
        )}
        <p>Username: {username}</p>
        <p>Password: {profileData.password}</p>
        <p>Email: {profileData.email}</p>
        <p>Location: {profileData.location}</p>
        <p>Introduction: {profileData.introduction}</p>
      </div>
      <div className="settings-actions">
        <Button
          icon="./src/assets/icons/edit.svg"
          iconSize="button" 
          label="Edit settings"
          onClick={handleUpdateClick}
          invertIcon={true}
        />
        <Button
          icon="./src/assets/icons/trash.svg"
          iconSize="button" 
          label="Delete account"
          onClick={handleDeleteClick}
          invertIcon={true}
        />
      </div>
    </>
  );
}

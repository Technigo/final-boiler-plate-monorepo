import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";
import BackArrow from "../components/reusableComponents/BackArrow";
import defaultProfileImage from "../assets/images/profile_icon.png";

export const ProfileSettings = () => {
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
    products: [],
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
            products: profileData.products,
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
        <p>Introduction: {profileData.introduction}</p>
        <p>Location: {profileData.location}</p>
        <p>Products: {profileData.products.join(", ")}</p>
      </div>
      <button type="submit" onClick={handleUpdateClick}>Update settings</button>
      <button type="submit" onClick={handleDeleteClick}>Delete account</button>
    </>
  );
}

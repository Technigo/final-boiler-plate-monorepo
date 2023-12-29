import { useEffect, useState } from "react";
import { userStore } from "../stores/userStore";
import BackArrow from "../components/BackArrow";

export const Profile = () => {
  const isLoggedin = userStore((state) => state.isLoggedin);
  const userId = userStore((state) => state.userId);
  const username = userStore((state) => state.username);
  const storeHandleProfileDisplay = userStore((state) => state.handleProfileDisplay);
  
  console.log(isLoggedin, username, userId);

  const [profileData, setProfileData] = useState({
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
            introduction: profileData.introduction,
            location: profileData.location,
            products: profileData.products,
            image: profileData.image
          })
        console.log(profileData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getProfileData();
  }, [storeHandleProfileDisplay, isLoggedin, userId]);

  return (
    <>
      <BackArrow />
      <div>
        <div>User: {username}</div>
        <img src={profileData.image} alt={username} />
        <p>Introduction: {profileData.introduction}</p>
        <p>Location: {profileData.location}</p>
        <p>Products: {profileData.products.join(", ")}</p>
      </div>
    </>

  )
}

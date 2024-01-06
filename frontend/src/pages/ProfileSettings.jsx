import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";
import BackArrow from "../components/reusableComponents/BackArrow";
// import { Input } from "../components/reusableComponents/Input";
// import editIcon from "../assets/icons/edit_icon.svg";
import defaultProfileImage from "../assets/images/profile_icon.png";

export const ProfileSettings = () => {
  // const [isEditing, setIsEditing] = useState(false);
  const isLoggedin = userStore((state) => state.isLoggedin);
  const userId = userStore((state) => state.userId);
  const username = userStore((state) => state.username);
  const storeHandleProfileDisplay = userStore((state) => state.handleProfileDisplay);
  // const storeHandleProfileUpdate = userStore((state) => state.handleProfileUpdate);
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

  // const handleInput = (e) => {
  //   setProfileData({ ...profileData, [e.target.name]: e.target.value });
  //   console.log(profileData);
  // };

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   await storeHandleProfileUpdate(
  //     isLoggedin, 
  //     userId, 
  //     profileData,
  //   );
  //   console.log(profileData);
  //   setIsEditing(false);
  // };
  
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
        {/* {isEditing ? (
          <div>
            <label htmlFor="email">Email:</label>
            <Input 
              type="email"
              name="email"
              id="email"
              placeholder="leave blank to keep the same"
              value={profileData.email}
              handleInput={handleInput}
            />
            <button type="submit" onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <p>Email: {profileData.email}</p> 
            <button onClick={() => setIsEditing((prev) => !prev)}>
              {/* <?xml version="1.0" ?> */}
              {/* <svg className="feather feather-edit" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
          </div> */}
        {/* // )} */}
        <p>Location: {profileData.location}</p>
        <p>Introduction: {profileData.introduction}</p>
      </div>
      <button type="submit" onClick={handleUpdateClick}>Update settings</button>
      <button type="submit" onClick={handleDeleteClick}>Delete account</button>
    </>
  );
}

import { useState, useEffect } from "react";
import { userStore } from "../stores/userStore";
import BackArrow from "../components/reusableComponents/BackArrow";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../assets/images/profile_icon.png";

export const UpdateSettings = () => {
    const navigate = useNavigate();

    // For retrieving the updated user profile data later on
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputLocation, setInputLocation] = useState("");
    const [inputIntroduction, setInputIntroduction] = useState("");
    const [selectedImage, setSelectedImage] = useState(defaultProfileImage);
  
    // For fetching the current user profile data
    const isLoggedin = userStore((state) => state.isLoggedin);
    const userId = userStore((state) => state.userId);
    const username = userStore((state) => state.username);
    const storeHandleProfileDisplay = userStore((state) => state.handleProfileDisplay);
    const storeHandleProfileUpdate = userStore((state) => state.handleProfileUpdate);
    const storeHandleImageUpdate = userStore((state) => state.handleImageUpdate);

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [image, setImage] = useState(null);
 
    useEffect(() => {
      const getProfileData = async () => {
        try {
          const profileData = await storeHandleProfileDisplay(isLoggedin, userId);
          if (profileData) {
            setPassword(profileData.password);
            setEmail(profileData.email);
            setLocation(profileData.location);
            setIntroduction(profileData.introduction);
            setImage(profileData.image || defaultProfileImage)
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      getProfileData();
    }, [storeHandleProfileDisplay, isLoggedin, userId]);
  
    // Handle changes in states based on user's inputs
    const handlePasswordUpdate = (e) => {
      e.preventDefault();
      setInputPassword(e.target.value);
    };
  
    const handleEmailUpdate = (e) => {
      e.preventDefault();
      setInputEmail(e.target.value);
    };
  
    const handleLocationUpdate = (e) => {
      e.preventDefault();
      setInputLocation(e.target.value);
    };
   
    const handleIntroductionUpdate = (e) => {
      e.preventDefault();
      setInputIntroduction(e.target.value);
    };
  
    const handleImageUpdate = (e) => {
      e.preventDefault();
      if (e.target.files.length === 0) {
        setSelectedImage(defaultProfileImage);
      } else {
        setSelectedImage(e.target.files[0]);
      }
    };
  
    const handleUpdateSubmit = async (e) => {
      e.preventDefault();

      const updatedImageData = await storeHandleImageUpdate(userId, selectedImage);
  
      await storeHandleProfileUpdate(
        isLoggedin, 
        userId, 
        inputPassword,
        inputEmail,
        inputLocation,
        inputIntroduction,
        updatedImageData
      );

      // Reset the input fields to original state
      setInputPassword("");
      setInputEmail("");
      setInputLocation("");
      setInputIntroduction("");
      setSelectedImage(defaultProfileImage);

      // Navigate to settings when changes are saved
      navigate("/settings");
    };
  
    const handleCancelClick = () => {
      navigate("/settings");
    };
  
    return (
      <div>
        <BackArrow />
        <h1>Update settings</h1>
  
        <form onSubmit={handleUpdateSubmit}>
          {/* Form fields for user details */}
          <div>
            <p>Username &#40;cannot be updated&#41;:</p>
            <p>{username}</p>
          </div>
  
          <div>
            <p>Current password:</p>
            <p>{password}</p>
          </div>
  
          <div>
            <label htmlFor="password">New password:</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="leave blank to keep the same"
              value={inputPassword}
              onChange={handlePasswordUpdate}
            />
          </div>
  
          <div>
            <p>Current email:</p>
            <p>{email}</p>
          </div>
  
          <div>
            <label htmlFor="email">New email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="leave blank to keep the same"
              value={inputEmail}
              onChange={handleEmailUpdate}
            />
          </div>
  
          <div>
            <p>Current location:</p>
            <p>{location}</p>
          </div>
  
          <div>
            <label htmlFor="location">New location:</label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="leave blank to keep the same"
              value={inputLocation}
              onChange={handleLocationUpdate}
            />
          </div>
  
          <div>
            <p>Current introduction:</p>
            <p>{introduction}</p>
          </div>
  
          <div>
            <label htmlFor="introduction">New introduction:</label>
            <textarea
              name="introduction"
              id="introduction"
              placeholder="leave blank to keep the same"
              rows={4}
              cols={50}
              value={inputIntroduction}
              onChange={handleIntroductionUpdate}
            />
          </div>
  
          <div>
            <label htmlFor="image">Current profile image:</label>
            <img src={image} alt={username} />
          </div>
          
          <div>
            <label htmlFor="image">Update profile image:</label>
            <input type="file" onChange={handleImageUpdate} />
          </div>
  
          <button type="submit">Save changes</button>
          <button type="submit" onClick={handleCancelClick}>Cancel</button>
        </form>
      </div>
    )
}

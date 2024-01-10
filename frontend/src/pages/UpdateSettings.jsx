import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";
import BackArrow from "../components/reusableComponents/BackArrow";
import { Button } from "../components/reusableComponents/Button";
import defaultProfileImage from "../assets/images/profile_icon.png";
import {Icon} from "react-icons-kit";
import {eyeOff} from "react-icons-kit/feather/eyeOff";
import {eye} from "react-icons-kit/feather/eye";
import Swal from "sweetalert2"; 
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import "./updateSettings.css";

export const UpdateSettings = () => {
  const navigate = useNavigate();

  // For retrieving the updated user profile data later on
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputLocation, setInputLocation] = useState("");
  const [inputIntroduction, setInputIntroduction] = useState("");
  const [selectedImage, setSelectedImage] = useState(defaultProfileImage);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // To track if the update was successful
  

  // Setting initial state for input type to be password and icon to be eyeOff so that the inputPassword will be hidden
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  // For fetching the current user profile data
  const isLoggedin = userStore((state) => state.isLoggedin);
  const userId = userStore((state) => state.userId);
  const storeHandleProfileUpdate = userStore((state) => state.handleProfileUpdate);
  const storeHandleImageUpdate = userStore((state) => state.handleImageUpdate);

  // Handle changes in states based on user's inputs
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setInputPassword(e.target.value);
  };

  // Function to handle the toggle between the hide password (eyeOff icon) and the show password (eye icon)
  const handleToggle = () => {
    if (type ==="password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
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
    setIsLoading(true);
    
    if (!inputPassword && !inputEmail && !inputLocation && !inputIntroduction && selectedImage === defaultProfileImage) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in at least one field",
        icon: "error"
      });
      return;
    }

    let updatedImageData;

    // Handle profile update when no new image is uploaded
    try {
      if (selectedImage === defaultProfileImage) {
        await storeHandleProfileUpdate(
          isLoggedin, 
          userId, 
          inputPassword,
          inputEmail,
          inputLocation,
          inputIntroduction,
        );
      } else {
        // Handle profile update when new image is uploaded
        updatedImageData = await storeHandleImageUpdate(userId, selectedImage);
        await storeHandleProfileUpdate(
          isLoggedin, 
          userId, 
          inputPassword,
          inputEmail,
          inputLocation,
          inputIntroduction,
          updatedImageData
        );
      }
      setIsSuccess(true);

      // Reset the input fields to original state
      setInputPassword("");
      setInputEmail("");
      setInputLocation("");
      setInputIntroduction("");
      setSelectedImage(defaultProfileImage);

      // Navigate back to "My settings" if update is successful
      navigate("/settings");
    } catch (error) {
      setIsLoading(false); // Stop loading
      setIsSuccess(false); // Set update success flag to false
    }
  };

  const handleCancelClick = () => {
    navigate("/settings");
  };

  return (
    <div className="main-container">
      <div className="main-wrapper">
        <div className="arrow-wrapper">
          <BackArrow />          
        </div>
        <div className="update-settings">
          <h1>Update settings</h1>
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
            <form onSubmit={handleUpdateSubmit} className="settings-form">
              {/* Form fields for user details */}
              <div className="password">
                <label htmlFor="password">New password:</label>
                <div className="password-input">
                  <input
                    type={type}
                    name="password"
                    id="password"
                    placeholder="leave blank if no change"
                    value={inputPassword}
                    onChange={handlePasswordUpdate}
                  />
                  <span onClick={handleToggle}>
                    <Icon icon={icon} size={22}/>
                  </span>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="email">New email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="leave blank if no change"
                  value={inputEmail}
                  onChange={handleEmailUpdate}
                />
              </div>

              <div className="form-field">
                <label htmlFor="location">New location:</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="leave blank if no change"
                  value={inputLocation}
                  onChange={handleLocationUpdate}
                />
              </div>

              <div className="form-field">
                <label htmlFor="introduction">New introduction:</label>
                <textarea
                  name="introduction"
                  id="introduction"
                  placeholder="leave blank if no change"
                  rows={4}
                  cols={50}
                  value={inputIntroduction}
                  onChange={handleIntroductionUpdate}
                />
              </div>

              <div className="form-field">
                <label htmlFor="image">Update profile image:</label>
                <input type="file" onChange={handleImageUpdate} />
              </div>

              <div className="settings-actions">
                <Button
                  icon="./src/assets/save2.svg"
                  iconSize="button" 
                  label="Save changes"
                  invertIcon={true}
                />
                <Button
                  icon="./src/assets/trash.svg"
                  iconSize="button" 
                  label="Cancel"
                  onClick={handleCancelClick}
                  invertIcon={true}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

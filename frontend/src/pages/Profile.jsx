import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userStore } from "../stores/userStore";
import BackArrow from "../components/reusableComponents/BackArrow";
import { AdsList } from "../components/AdsList";
import { Button } from "../components/reusableComponents/Button";
import { Modal } from "react-bootstrap";
// Import Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
import { ContactForm } from "../components/ContactForm";
import defaultProfileImage from "../assets/images/profile_icon.png";
import "./profile.css";

// This component renders the advertiser's profile
export const Profile = () => {
  const { userId } = useParams();
  const username = userStore((state) => state.username);
  const storeHandleAdvertiserProfile = userStore((state) => state.handleAdvertiserProfileDisplay);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [profileData, setProfileData] = useState({
    introduction: "",
    location: "",
    image: null,
  });
  
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const profileData = await storeHandleAdvertiserProfile(userId);
        if (profileData) {
          setProfileData({
            introduction: profileData.introduction,
            location: profileData.location,
            image: profileData.image
          })
        console.log(profileData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getProfileData();
  }, [storeHandleAdvertiserProfile, userId]);

  return (
    <div className="main-container">
      <div className="main-wrapper">
        <div className="arrow-wrapper">
          <BackArrow />
        </div>

        <div className="profile-container">
          <div className="profile-data">
            {profileData.image ? (
              <img src={profileData.image} alt={username} className="profile-img"/>
            ) : (
              <img src={defaultProfileImage} alt={username} className="profile-img" />
            )}

            <div className="profile-info">
              <h1>{username}</h1>
              <p>{profileData.introduction}</p>
              {profileData.location ? (
                <p>Location: {profileData.location}</p>
              ) : (
                <p>Location: Sweden</p>
              )}
            </div>
          </div>

          <div className="recent-ads">
            <h2>Recent ads</h2>
            <AdsList fetchType="user" userId={userId} displayGrid={true} />
          </div>

          <Button label="Contact Advertiser" onClick={handleShow} />
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <ContactForm
                advertiserName={username}
                handleClose={handleClose}
              />
            </Modal.Body>
          </Modal>
        </div>
      </div>
      
    </div>
  );
}

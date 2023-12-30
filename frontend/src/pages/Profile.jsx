import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userStore } from "../stores/userStore";
import BackArrow from "../components/BackArrow";
import { AdsList } from "../components/AdsList";
import { Modal, Button } from "react-bootstrap";
// Import Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
import { ContactForm } from "../components/ContactForm";

// How to make sure that this is advertiser's profile???
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
    products: [],
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
  }, [storeHandleAdvertiserProfile, userId]);

  return (
    <>
      <BackArrow />
      <div>
        <h1>{username}</h1>
        <img src={profileData.image} alt={username} />
        <p>Introduction: {profileData.introduction}</p>
        <p>Location: {profileData.location}</p>
        <p>Products: {profileData.products.join(", ")}</p>
      </div>
      <h2>Recent ads</h2>
      <AdsList fetchType="user" />
      <Button onClick={handleShow}>Contact Advertiser</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <ContactForm
            advertiserName={username}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { userStore } from "../stores/userStore";
import BackArrow from "../components/reusableComponents/BackArrow";
import { AdsList } from "../components/AdsList";
import { Button } from "../components/reusableComponents/Button";
import { Modal } from "react-bootstrap";
// Import Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
import { ContactForm } from "../components/ContactForm";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import defaultProfileImage from "../assets/images/profile_icon.png";
import "./profile.css";
import { Heading } from "../components/reusableComponents/Heading";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Swal from "sweetalert2";

// This component renders the advertiser's profile
export const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // To track if the data fetching was successful
  const { userId } = useParams();
  const username = userStore((state) => state.username);
  const storeHandleAdvertiserProfile = userStore(
    (state) => state.handleAdvertiserProfileDisplay
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [profileData, setProfileData] = useState({
    introduction: "",
    location: "",
    image: null,
  });

  // Get "accessToken" from the "userStore".
  const accessToken = userStore.getState().accessToken;
  const handleLogout = userStore((state) => state.handleLogout);
  // useEffect hook to check user authentication status.
  useEffect(() => {
    if (!accessToken) {
      // If the user is not logged in, show an alert and navigate to the login route.
      Swal.fire({
        title: "Error!",
        text: "Please log in to see the content",
        icon: "error",
      });
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const getProfileData = async () => {
      setIsLoading(true);

      try {
        const profileData = await storeHandleAdvertiserProfile(userId);
        if (profileData) {
          setProfileData({
            introduction: profileData.introduction,
            location: profileData.location,
            image: profileData.image,
          });
          setIsLoading(false);
          setIsSuccess(true);
          console.log(profileData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsLoading(false);
        setIsSuccess(false);
      }
    };
    getProfileData();
  }, [storeHandleAdvertiserProfile, userId]);

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
              navigate("/");
            },
          },
        ]}
        menuDesks={[
          { path: "/home", name: "Home" },
          { path: "/search", name: "Search" },
          { path: "/settings", name: "My Settings" },
          { path: "/manage-your-ads", name: "My Products" },

          {
            name: "Logout",
            onClick: () => {
              handleLogout();
              navigate("/");
            },
          },
        ]}
        logoRedirectPath="/home"
      />
      <div className="main-container">
        <div className="main-wrapper">
          <div className="arrow-wrapper">
            <BackArrow />
          </div>

          <div className="profile-container">
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
                <div className="profile-data">
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

                  <div className="profile-info">
                    <Heading level={1} text={username} aria-label={username}>
                      {username}
                    </Heading>
                    <p>{profileData.introduction}</p>
                    {profileData.location ? (
                      <p>Location: {profileData.location}</p>
                    ) : (
                      <p>Location: Sweden</p>
                    )}
                  </div>
                </div>

                <div className="recent-ads">
                  <Heading level={2} text="Recent ads" aria-label="Recent ads">
                    Recent ads
                  </Heading>
                  <AdsList
                    fetchType="user"
                    userId={userId}
                    displayGrid={true}
                  />
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
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

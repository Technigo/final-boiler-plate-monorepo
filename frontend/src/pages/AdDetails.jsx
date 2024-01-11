import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { adStore } from "../stores/adStore";
import { userStore } from "../stores/userStore";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContactForm } from "../components/ContactForm";
import BackArrow from "../components/reusableComponents/BackArrow";
import { Button } from "../components/reusableComponents/Button"; // Import the Button component
import { Image } from "../components/reusableComponents/Image"; // Import the Image component
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Swal from "sweetalert2";

const AdDetails = () => {
  // Use the 'useNavigate' hook to programmatically navigate between routes.
  const navigate = useNavigate();
  const [ad, setAd] = useState({});
  const { getAdById } = adStore();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
  const isLoggedin = userStore((state) => state.isLoggedin);
  const handleLogout = userStore((state) => state.handleLogout);
  // useEffect hook to check user authentication status.
  useEffect(() => {
    if (!isLoggedin) {
      // If the user is not logged in, show an alert and navigate to the login route.
      Swal.fire({
        title: "Error!",
        text: "Please log in to see the content",
        icon: "error",
      });
      navigate("/login");
    }
  }, [isLoggedin, navigate]);

  useEffect(() => {
    const fetchAd = async () => {
      const adDetails = await getAdById(id);
      if (adDetails) {
        setAd(adDetails);
      }
    };

    fetchAd();
  }, [id, getAdById]);

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
          <div className="ad-details-container">
            <BackArrow />
            <div>
              <h1>{ad.title}</h1>
              <Image src={ad.image} alt={ad.title} size="large" />
              <div className="details-wrapper">
                <div>
                  <h4>Description:</h4>
                  <p>{ad.description}</p>
                </div>
                <div>
                  <h4>Product:</h4>
                  <p>{ad.product}</p>
                </div>
                <div>
                  <h4>Quantity:</h4>
                  <p>
                    {ad.quantity} {ad.unit}
                  </p>
                </div>
                <div>
                  <h4>Pickup Date:</h4>
                  <p>{new Date(ad.pickupDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4>Observation:</h4>
                  <p>{ad.observation}</p>
                </div>
                <div>
                  <h4>
                    Posted by:{" "}
                    <Link to={`/profile/${ad.user?._id}`}>
                      {ad.user?.username}
                    </Link>
                  </h4>
                </div>
              </div>
              <Button label="Contact Advertiser" onClick={handleShow} />{" "}
              {/* Use Button component */}
              <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                  <ContactForm
                    advertiserName={ad.user?.username}
                    productName={ad.product}
                    adTitle={ad.title}
                    handleClose={handleClose}
                  />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdDetails;

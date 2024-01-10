import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { adStore } from "../stores/adStore";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContactForm } from "../components/ContactForm";
import BackArrow from "../components/reusableComponents/BackArrow";
import { Button } from "../components/reusableComponents/Button"; // Import the Button component
import { Image } from "../components/reusableComponents/Image"; // Import the Image component

const AdDetails = () => {
  const [ad, setAd] = useState({});
  const { getAdById } = adStore();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <div className="main-container">
        <div className="main-wrapper">
          <div className="ad-details-container">
            <BackArrow />
            <div>
              <h1>{ad.title}</h1>
              <Image src={ad.image} alt={ad.title} size="large" />
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
                <p>{ad.quantity} {ad.unit}</p>
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
                  <Link to={`/profile/${ad.user?._id}`}>{ad.user?.username}</Link>
                </h4>
              </div>
              <Button
                label="Contact Advertiser"
                onClick={handleShow}
              /> {/* Use Button component */}
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
    </>
  );
};

export default AdDetails;

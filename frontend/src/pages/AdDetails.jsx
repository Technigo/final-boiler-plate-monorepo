import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { adStore } from "../stores/adStore";
import { Modal, Button } from "react-bootstrap";
// Import Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
import { ContactForm } from "../components/ContactForm";
import BackArrow from "../components/reusableComponents/BackArrow";

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
      <BackArrow />
      <div>
        <h2>{ad.title}</h2>
        <img src={ad.image} alt={ad.title} />
        <p>Description: {ad.description}</p>
        <p>Product: {ad.product}</p>
        <p>
          Quantity: {ad.quantity} {ad.unit}
        </p>
        <p>Pickup Date: {new Date(ad.pickupDate).toLocaleDateString()}</p>
        <p>Observation: {ad.observation}</p>
        <p>Posted by: <Link to={`/profile/${ad.user?._id}`}>{ad.user?.username}</Link></p>
        <Button onClick={handleShow}>Contact Advertiser</Button>
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
    </>
  );
};

export default AdDetails;

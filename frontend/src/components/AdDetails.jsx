import { useState, useEffect } from 'react';
import { adStore } from "../stores/adStore";

const AdDetails = ({ match }) => {
  const [ad, setAd] = useState({});
  const { getAdById } = adStore();

  useEffect(() => {
    const fetchAd = async () => {
      const adDetails = await getAdById(match.params.id);
      if (adDetails) {
        setAd(adDetails);
      }
    };

    fetchAd();
  }, [match.params.id, getAdById]);

  return (
    <div>
      <h2>{ad.title}</h2>
      <img src={ad.image} alt={ad.title} />
      <p>Description: {ad.description}</p>
      <p>Product: {ad.product}</p>
      <p>Quantity: {ad.quantity} {ad.unit}</p>
      <p>Pickup Date: {new Date(ad.pickupDate).toLocaleDateString()}</p>
      <p>Observation: {ad.observation}</p>
      <p>Posted by: {ad.user?.username}</p>
      <button onClick={() => {/* logic to send message */}}>
        Contact Advertiser
      </button>
    </div>
  );
};

export default AdDetails;

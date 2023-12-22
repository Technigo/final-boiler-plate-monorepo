import { useState, useEffect } from 'react';
import { adStore } from "../stores/adStore";

export const UpdateAd = ({ adId }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [address, setAddress] = useState('');
  const [observation, setObservation] = useState('');
  const [pickupDate, setPickupDate] = useState('');

  const { getAdById, handleEdit } = adStore();

  useEffect(() => {
    const fetchAdData = async () => {
      const adData = await getAdById(adId);
      if (adData) {
        setTitle(adData.title);
        setDescription(adData.description);
        setProduct(adData.product);
        setQuantity(adData.quantity.toString());
        setUnit(adData.unit);
        setAddress(adData.address);
        setObservation(adData.observation);
        setPickupDate(adData.pickupDate.split('T')[0]); // Adjust date format if necessary
      }
    };

    fetchAdData();
  }, [adId, getAdById]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAdData = {
      title, description, product, quantity, unit, address, observation, pickupDate
    };

    await handleEdit(adId, updatedAdData, image);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for ad details */}
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      {/* ... Other form fields ... */}
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Update Ad</button>
    </form>
  );
};

import { useState, useEffect } from 'react';
import { adStore } from "../stores/adStore";
import BackArrow from '../components/reusableComponents/BackArrow';
import { useParams } from 'react-router-dom';

export const EditAd = () => {
  const { id: adId } = useParams(); // Extract the ad ID from the URL

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
        setQuantity(adData.quantity ? adData.quantity.toString() : '');
        setUnit(adData.unit);
        setAddress(adData.address);
        setObservation(adData.observation);
        setPickupDate(adData.pickupDate ? adData.pickupDate.split('T')[0] : ''); // Adjust date format if necessary
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
    <>
      <BackArrow />
      <form onSubmit={handleSubmit}>
        {/* Form fields for ad details */}
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
        {/* ... Add other form fields for product, quantity, unit, etc. ... */}
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Update Ad</button>
      </form>
    </>
  );
};

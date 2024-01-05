import { useState } from 'react';
import { adStore } from "../stores/adStore";
import BackArrow from '../components/reusableComponents/BackArrow';

export const CreateAd = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [address, setAddress] = useState('');
  const [observation, setObservation] = useState('');
  const [pickupDate, setPickupDate] = useState('');

  const { createAd } = adStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!image || !title || !description || !product || !quantity || !unit || !address || !pickupDate) {
      alert("All fields are required");
      return;
    }

    await createAd({ title, description, product, quantity, unit, address, observation, pickupDate }, image);

    // Reset form fields after submission
    setImage(null);
    setTitle("");
    setDescription("");
    setProduct("");
    setQuantity("");
    setUnit("");
    setAddress("");
    setObservation("");
    setPickupDate("");
  };

  return (
    <>
      <BackArrow />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Product:</label>
          <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div>
          <label>Unit:</label>
          <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Pickup Time:</label>
          <input type="datetime-local" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
        </div>
        <div>
          <label>Observation:</label>
          <input type="text" value={address} onChange={(e) => setObservation(e.target.value)} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Create Ad</button>
      </form>
    </>
  );
};


//Component to create an Ad
import { useState, useEffect } from 'react';
import { adStore } from "../stores/adStore";
import BackArrow from '../components/reusableComponents/BackArrow';
import { useParams } from 'react-router-dom';
import { Image } from '../components/reusableComponents/Image'; // Import the Image component
import { Button } from "../components/reusableComponents/Button";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import "./editAd.css";
import { useSession } from "../context/SessionContext";
import { Dropdown } from '../components/reusableComponents/Dropdown';
import { useNavigate } from 'react-router-dom';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // To track if the update was successful

  const { getAdById, handleEdit } = adStore();
  const { isSessionExpired } = useSession();

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
        setImage(adData.image); // Set the current image
      }
    };

    fetchAdData();
  }, [adId, getAdById]);

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const navigate = useNavigate(); // Add this line to get the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const updatedAdData = {
        title, description, product, quantity, unit, address, observation, pickupDate
      };

      await handleEdit(adId, updatedAdData, image);
      setIsSuccess(true); // Set update success flag

      // Reset form fields after submission (except image)
      setTitle('');
      setDescription('');
      setProduct('');
      setQuantity('');
      setUnit('');
      setAddress('');
      setObservation('');
      setPickupDate('');

      // Redirect to the previous page
      navigate(-1); // This navigates back one step in the history stack
    } catch (error) {
      setIsLoading(false); // Stop loading
      setIsSuccess(false); // Set update success flag to false
    }
  };

  return (
    <div className="main-container">
      <div className="main-wrapper">
        {isSessionExpired && (
          <div className="session-expired-message">
            Your session has expired. Please log in again.
          </div>
        )}
        <div className="create-ad-container">
          <BackArrow />
          {isLoading ? (
            <div className="loading-container">
              <Lottie options={{ loop: true, autoplay: true, animationData: loadingAnimation }} />
            </div>
          ) : (
            <form className="create-ad-form" onSubmit={handleSubmit}>
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
                <Dropdown
                  options={[
                    { label: "Kilogram (kg)", value: "kg" },
                    { label: "Meter (m)", value: "m" },
                    { label: "Square Meter (m²)", value: "m2" },
                    { label: "Liter (L)", value: "l" },
                    { label: "Milliliter (mL)", value: "ml" },
                  ]}
                  value={unit}
                  onChange={handleUnitChange}
                  defaultOption="Select Unit"
                />
              </div>
              <div>
                <label>Location:</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div>
                <label>Pickup Time:</label>
                <input type="datetime-local" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
              </div>
              <div>
                <label>Observation:</label>
                <input type="text" value={observation} onChange={(e) => setObservation(e.target.value)} />
              </div>
              <div>
                <label>Current Image:</label>
                {image && <Image src={image} alt="Current Ad Image" size="medium" />}
              </div>
              <div>
                <label>New Image:</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
              </div>
              {isSuccess && (
                <div className="success-message">
                  Update successful! Redirecting...
                </div>
              )}
              <Button
                label="Update Ad"
                className="button"
                onClick={(e) => handleSubmit(e)}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

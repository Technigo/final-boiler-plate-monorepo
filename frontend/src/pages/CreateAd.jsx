import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { adStore } from "../stores/adStore";
import Swal from 'sweetalert2';
import BackArrow from "../components/reusableComponents/BackArrow";
import "./createAd.css"
import { Dropdown } from "../components/reusableComponents/Dropdown";
import { Button } from "../components/reusableComponents/Button";

export const CreateAd = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [address, setAddress] = useState("");
  const [observation, setObservation] = useState("");
  const [pickupDate, setPickupDate] = useState("");

  const { createAd } = adStore();

  // Define units for dropdown
  const unitOptions = [
    { label: "Kilogram (kg)", value: "kg" },
    { label: "Meter (m)", value: "m" },
    { label: "Square Meter (m²)", value: "m2" },
    { label: "Liter (L)", value: "l" },
    { label: "Milliliter (mL)", value: "ml" },
  ];

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !title || !description || !product || !quantity || !unit || !address || !pickupDate) {
      console.log("Validation failed. Here are the values:", { image, title, description, product, quantity, unit, address, pickupDate });
      Swal.fire({
        title: "Oops!",
        text: "All fields are required",
        icon: "error",
      });
      return;
    }

    try {
      await createAd({ title, description, product, quantity, unit, address, observation, pickupDate }, image);
      Swal.fire({
        title: "Success!",
        text: "Your ad has been created.",
        icon: "success",
      }).then(() => {
        navigate(-1);
      });

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
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: "There was a problem creating your ad.",
        icon: "error",
      });
    }
  };


  return (
    <>
      <div className="container">
        <div className="create-ad-container">
          <BackArrow />
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
                options={unitOptions}
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
              <label>Image:</label>
              <input type="file" onChange={(e) => {
                console.log("File selected:", e.target.files[0]);
                setImage(e.target.files[0]);
              }} />
            </div>
            <Button
              label="Create Ad"
              className="button"
              onClick={(e) => handleSubmit(e)}
            />
          </form>
        </div>
      </div>
    </>
  );
};


//Component to create an Ad
import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Modal from "react-modal";
import { Buttons } from "../Buttons/Buttons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";

import "./PostStory.css";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const PostStory = () => {
  const [newHeading, setNewHeading] = useState("");
  const [newStory, setNewStory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newWhere, setNewWhere] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [isMapVisible, setIsMapVisible] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newStory.length < 5 || newStory.length > 200) {
      alert("The message can only contain 5-200 letters. Please try again! 💕");
      return;
    }

    setNewStory("");

    const handleCategoryChange = (e) => {
      setNewCategory(e.target.value);
    };

    fetch("https://localhost:3000/stories", {
    fetch("http://localhost:3000/stories", {
      method: "POST",
      body: JSON.stringify({
        title: newHeading,
        content: newStory,
        createdAt: selectedDate,
        location: newWhere,
        category: newCategory,
        image: selectedImage,
      }),
    })
      .then((res) => res.json())
      .then((newStory) => {
        console.log("New story posted:", newStory);
        console.log("Date:", selectedDate);
        console.log("Category:", newCategory);
        // Reload the page after a successful post
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error posting the story", error);
      });
  };

  const handleMapClick = (e) => {
    setLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    setNewWhere(`🌍 Location: ${e.latLng.lat()}, ${e.latLng.lng()}`);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCalendarClick = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleButtonClick = () => {
    console.log("Button clicked within PostStory component", newStory);
  };

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const handleImageSelect = (image) => {
    import(`/${image}`)
      .then((module) => {
        setSelectedImage(module.default);
        closeImageModal();
      })
      .catch((error) => {
        console.error("Error loading image:", error);
      });
  };

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };

  const handleWhereInputChange = (e) => {
    setNewWhere(e.target.value);

    setLocation({
      lat: 59.325, // Set a default latitude
      lng: 18.05, // Set a default longitude
    });
  };

  const handleWhereInputClick = () => {
    toggleMapVisibility();
  };

  return (
    <div className="new-story-container">
      <h2>Share your story</h2>
      <form onSubmit={handleFormSubmit}>
        <textarea
          type="text"
          value={newHeading}
          onChange={(e) => setNewHeading(e.target.value)}
          minLength="5"
          maxLength="30"
          placeholder="Heading"
          className="input-field"
        />
        <textarea
          type="text"
          value={newStory}
          onChange={(e) => setNewStory(e.target.value)}
          minLength="5"
          maxLength="200"
          placeholder="Please write your story here"
          className="input-field"
        />
        <div>
          <select
            className="category"
            value={newCategory}
            onChange={handleCategoryChange}
            required>
            <option value="">Choose a category</option>
            <option value="funny story">Funny story</option>
            <option value="rumor">Rumor</option>
            <option value="historical">Historical</option>
            <option value="hearsay">Hearsay</option>
          </select>
        </div>
        <div>
          <textarea
            type="text"
            value={newWhere}
            onChange={handleWhereInputChange}
            onClick={handleWhereInputClick}
            placeholder="🌍 Where did this happen?"
            className="input-field"
          />
          {isMapVisible && (
            <LoadScript googleMapsApiKey={apiKey}>
              <GoogleMap
                className="map"
                mapContainerStyle={{ height: "300px", width: "100%" }}
                zoom={8}
                center={location}
                onClick={handleMapClick}>
                {location.lat !== 0 && location.lng !== 0 && (
                  <Marker position={location} />
                )}
              </GoogleMap>
            </LoadScript>
          )}
        </div>
        <div>
          {newCategory === "funny story" && (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              locale={enGB}
              dateFormat="MMMM d, yyyy"
              className="input-field"
            />
          )}
          {newCategory !== "funny story" && (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              locale={enGB}
              showYearPicker
              dateFormat="yyyy"
              className="input-field"
            />
          )}
        </div>
        <div>
          <button
            className="gallery-button"
            type="button"
            onClick={openImageModal}>
            Select Image
          </button>
        </div>
        <div>
          <Buttons buttonText="Send Story" onClick={handleButtonClick} />
        </div>
        {/* Image Modal */}
        <Modal
          appElement={document.getElementById("root")}
          selected={selectedImage}
          className="gallery"
          isOpen={isImageModalOpen}
          contentLabel="Select Image">
          <div className="gallery-images">
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("hero.png")}>
              <img src={"aboutimg.jpg"} alt="Image 1" />
            </button>
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("./aboutimg.jpg")}>
              <img src={"aboutimg.jpg"} alt="Image 2" />
            </button>
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("hero3.png")}>
              <img src={"hero3.png"} alt="Image 3" />
            </button>
          </div>
        </Modal>
      </form>
    </div>
  );
};

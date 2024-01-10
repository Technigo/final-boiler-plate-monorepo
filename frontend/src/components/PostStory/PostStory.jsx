import { useState } from "react";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import Modal from "react-modal";
import { Buttons } from "../Buttons/Buttons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";
import "./PostStory.css";

const libraries = ["places"];

export const PostStory = () => {
  const [newHeading, setNewHeading] = useState("");
  const [newStory, setNewStory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [autocomplete, setAutocomplete] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (newStory.length < 10) {
      alert("The message is too short. Please try again! 💕");
      return;
    }

    // Capitalize the first letter of the title
    const capitalizedTitle =
      newHeading.charAt(0).toUpperCase() + newHeading.slice(1);

    // Capitalize the first letter of the story
    const capitalizedStory =
      newStory.charAt(0).toUpperCase() + newStory.slice(1);

    // Prepare story data to send to the backend
    const storyData = {
      title: capitalizedTitle,
      content: capitalizedStory,
      category: newCategory,
      ranking: 0,
      lat: latitude,
      lng: longitude,
      city: locationName,
      image: selectedImage,
    };

    setNewStory("");

    // Check if the language is supported for sentiment analysis
    const supportedLanguagesForSentiment = ["en", "es", "ja", "pt"];
    const languageCode = "sv";

    if (!supportedLanguagesForSentiment.includes(languageCode)) {
      console.log("Sentiment analysis not supported for this language");
    } else {
      const googleApiPayload = {
        document: {
          content: newStory,
          type: "PLAIN_TEXT",
          language: languageCode,
        },
      };
      console.log("Sending request to Google API with body:", googleApiPayload);

      fetch(
        `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${
          import.meta.env.VITE_GOOGLE_LANGUAGE_KEY
        }`,
        {
          method: "POST",
          body: JSON.stringify(googleApiPayload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((googleApiResponse) => {
          console.log("Response from Google API:", googleApiResponse);
          // Add logic to handle the response from sentiment analysis
        })
        .catch((error) => {
          console.error("Error calling Google API:", error);
        });
    }

    // Post the story to the backend
    fetch("http://localhost:3000/stories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storyData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((newStory) => {
        console.log("New story posted:", newStory);
        // Reset form fields
        setNewHeading("");
        setNewStory("");
        setSelectedDate(new Date());
        setLocationName("");
        setNewCategory("");
        setSelectedImage("");
        // Optionally, you can redirect or refresh the page here
      })
      .catch((error) => {
        console.error("Error posting the story", error);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
    setSelectedImage(image);
    closeImageModal();
    console.log("Image chosen");
  };

  const onLoadAutocomplete = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setLocationName(place.name);
      // Set the latitude and longitude
      setLatitude(place.geometry.location.lat());
      setLongitude(place.geometry.location.lng());
    } else {
      console.error("Autocomplete is not loaded yet!");
    }
  };

  const images = [
    "image1.png",
    "image2.png",
    "image3.png",
    "image4.png",
    "image5.png",
    "image6.png",
    "image7.png",
    "image8.png",
    "image9.png",
    "image10.png",
    "image11.png",
    "image12.png",
  ];

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
          minLength="10"
          placeholder="Please write your story here"
          className="input-field"
        />
        <div>
          <select
            className="category"
            value={newCategory}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Choose a category</option>
            <option value="anecdote">Anecdote</option>
            <option value="rumor">Rumor</option>
            <option value="historical">Historical</option>
            <option value="hearsay">Hearsay</option>
          </select>
        </div>
        <div>
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={libraries}
          >
            <Autocomplete
              onLoad={onLoadAutocomplete}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                className="search-input"
                type="text"
                placeholder="Search location"
                required
              />
            </Autocomplete>
          </LoadScript>
          <p className="location">Selected Location: {locationName}</p>
        </div>
        <div>
          {newCategory === "anecdote" && (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              locale={enGB}
              dateFormat="MMMM d, yyyy"
              className="input-field"
            />
          )}
          {newCategory !== "anecdote" && (
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
            onClick={openImageModal}
          >
            Select Image
          </button>
        </div>
        <div>
          <Buttons buttonText="Send Story" onClick={handleButtonClick} />
        </div>
        {/* Image Modal */}
        <Modal
          appElement={document.getElementById("root")}
          selectedImage={selectedImage}
          className="gallery"
          isOpen={isImageModalOpen}
          contentLabel="Select Image"
        >
          <div className="gallery-images">
            {images.map((image, index) => (
              <button
                key={index}
                className="image-buttons"
                type="button"
                onClick={() => handleImageSelect(image)}
              >
                <img src={image} alt={`Image ${index + 1}`} />
              </button>
            ))}
          </div>
        </Modal>
      </form>
    </div>
  );
};

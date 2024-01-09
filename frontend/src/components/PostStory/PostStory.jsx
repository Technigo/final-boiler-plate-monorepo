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

    // Prepare story data to send to the backend
    const storyData = {
      title: newHeading,
      content: newStory,
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
    fetch("https://whisperwall.onrender.com/stories", {
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

  // const handleCalendarClick = () => {
  //   setIsCalendarVisible(!isCalendarVisible);
  // };

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
        {/* <div className="gallery-images">
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("image1.png")}
            >
              <img src={"image1.png"} alt="Image 1" />
            </button>
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("./image2.png")}
            >
              <img src={"image2.png"} alt="Image 2" />
            </button>
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("image3.png")}
            >
              <img src={"image3.png"} alt="Image 3" />
            </button>
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("./image4.png")}
            >
              <img src={"image4.png"} alt="Image 4" />
            </button>
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("./image5.png")}
            >
              <img src={"image5.png"} alt="Image 5" />
            </button>
            <button
              className="image-buttons"
              type="button"

              onClick={() => handleImageSelect("./image6.png")}
            >
              <img src={"image6.png"} alt="Image 6" />

            </button>
            <button
              className="image-buttons"
              type="button"

              onClick={() => handleImageSelect("./image7.png")}
            >
              <img src={"image7.png"} alt="Image 7" />

            </button>
            <button
              className="image-buttons"
              type="button"

              onClick={() => handleImageSelect("./image8.png")}
            >
              <img src={"image8.png"} alt="Image 8" />
            </button>
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("./image9.png")}
            >
              <img src={"image9.png"} alt="Image 9" />
            </button>
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("./image10.png")}
            >
              <img src={"image10.png"} alt="Image 10" />
            </button>
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("./image11.png")}
            >
              <img src={"image11.png"} alt="Image 11" />
            </button>
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("./image12.png")}
            >
              <img src={"image12.png"} alt="Image 12" />

            </button>
          </div>
        </Modal> */}
      </form>
    </div>
  );
};

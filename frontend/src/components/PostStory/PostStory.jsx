import { useState } from "react";
import Modal from "react-modal";
import { Buttons } from "../Buttons/Buttons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";

import "./PostStory.css";

export const PostStory = () => {
  const [newHeading, setNewHeading] = useState("");
  const [newStory, setNewStory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newWhere, setNewWhere] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

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

    fetch("", {
      method: "POST",
      body: JSON.stringify({
        message: newStory,
        date: selectedDate,
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
            required
          >
            <option value="">Choose a category</option>
            <option value="funny story">Funny story</option>
            <option value="rumor">Rumor</option>
            <option value="historical">Historical</option>
            <option value="hearsay">Hearsay</option>
          </select>
        </div>
        <textarea
          type="text"
          value={newWhere}
          onChange={(e) => setNewWhere(e.target.value)}
          placeholder="🌍 Where did this happen?"
          className="input-field"
        />
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
          className="gallery"
          isOpen={isImageModalOpen}
          contentLabel="Select Image"
        >
          <div className="gallery-images">
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("hero.png")}
            >
              <img src={"aboutimg.jpg"} alt="Image 1" />
            </button>
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("./aboutimg.jpg")}
            >
              <img src={"aboutimg.jpg"} alt="Image 2" />
            </button>
            <button
              className="image-buttons"
              type="button"
              onClick={() => handleImageSelect("hero3.png")}
            >
              <img src={"hero3.png"} alt="Image 3" />
            </button>
          </div>
        </Modal>
      </form>
    </div>
  );
};

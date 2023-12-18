import { useState } from "react";
import { Buttons } from "../Buttons/Buttons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";

import "./PostStory.css";

export const PostStory = () => {
  const [newStory, setNewStory] = useState("");
  const [newWhere, setNewWhere] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newStory.length < 5 || newStory.length > 200) {
      alert("The message can only contain 5-200 letters. Please try again! 💕");
      return;
    }

    setNewStory("");

    fetch("", {
      method: "POST",
      body: JSON.stringify({ message: newStory, date: selectedDate }),
    })
      .then((res) => res.json())
      .then((newStory) => {
        console.log("New story posted:", newStory);
        console.log("Date:", selectedDate);
        // Reload the page after successful post
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

  return (
    <div className="new-story-container">
      <h2>Share your story</h2>
      <form onSubmit={handleFormSubmit}>
        <textarea
          type="text"
          value={newStory}
          onChange={(e) => setNewStory(e.target.value)}
          minLength="5"
          maxLength="200"
          placeholder="Please write your story here"
          className="input-field"
        />
        <textarea
          type="text"
          value={newWhere}
          onChange={(e) => setNewWhere(e.target.value)}
          placeholder="🌍 Where did this happen?"
          className="input-field"
        />
        <div className="date-input-container">
          <input
            type="text"
            value={selectedDate.toLocaleDateString()}
            onClick={handleCalendarClick}
            readOnly
            placeholder="🕘 When did this happen?"
            className="input-field"
          />
          {isCalendarVisible && (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              onClick={() => setIsCalendarVisible(false)}
              locale={enGB}
              dateFormat="MMMM d, yyyy"
              placeholderText="🕘 When did this happen?"
              className="input-field"
            />
          )}
        </div>
        <div>
          <Buttons buttonText="Send Story" onClick={handleButtonClick} />
        </div>
      </form>
    </div>
  );
};

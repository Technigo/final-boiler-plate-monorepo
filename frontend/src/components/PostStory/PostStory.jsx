import { useState } from "react";
import "./PostStory.css";

export const PostStory = () => {
  const [newStory, setNewStory] = useState("");
  const [newWhere, setNewWhere] = useState("");
  const [newWhen, setNewWhen] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newStory.length < 5 || newStory.length > 200) {
      alert("The message can only contain 5-200 letters. Please try again! 💕");
      return;
    }

    setNewStory("");

    fetch("", {
      method: "POST",

      body: JSON.stringify({ message: newStory }),
    })
      .then((res) => res.json())
      .then((newStory) => {
        console.log("New story posted:", newStory);
        // Reload the page after successful post
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error posting the story", error);
      });
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
        <textarea
          type="date"
          value={newWhen}
          onChange={(e) => setNewWhen(e.target.value)}
          placeholder="🕘 When did this happen?"
          className="input-field"
        />
        <button>Send Story</button>
      </form>
    </div>
  );
};

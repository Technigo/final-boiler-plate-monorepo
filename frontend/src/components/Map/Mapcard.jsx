import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Mapcard.css";
// import "../StoryCard/StoryCard.css";
import { timeSince } from "../utils/timeUtils";
import likeIcon from "../../assets/likeicon.svg";
import closeIcon from "../../assets/close-icon.svg";

export const Mapcard = () => {
  // eslint-disable-next-line no-undef
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // default to English
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  const navigateToMap = () => {
    navigate("/map");
  };

  // Function to handle like button click, updates story ranking
  const handleLikeClick = () => {
    fetch(`${apiUrl}/stories/${story._id}/rank`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedStory) => {
        if (updatedStory) {
          // Update the local state with the new story data
          setStory(updatedStory);
        }
      })
      .catch((error) => console.error("Error updating story ranking:", error));
  };

  console.log(id);

  // API URL from environment variables or default
  const apiUrl = import.meta.env.VITE_BACKEND_API || "http://localhost:3000";

  // Calling fetch
  useEffect(() => {
    fetch(`${apiUrl}/stories/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStory(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching story:", error);
      });
  }, [id, apiUrl]);

  useEffect(() => {
    // Function to fetch translated stories
    const fetchTranslatedStories = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/stories?language=${selectedLanguage}`
        );
        const translatedData = await response.json();
        setStories(translatedData);
        // updateCitiesAndCategories(translatedData);
      } catch (error) {
        console.error("Error fetching translated stories:", error);
      }
    };
    if (selectedLanguage !== "en") {
      fetchTranslatedStories();
    } else {
      // Fetch original stories when language is set to English
      fetch(`${apiUrl}/stories`)
        .then((response) => response.json())
        .then((data) => {
          setStories(data);
          // updateCitiesAndCategories(data);
        })
        .catch((error) => console.error("Error fetching stories:", error));
    }
  }, [apiUrl, selectedLanguage]);

  // Handler for language change
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!story) {
    return <div>Story not found.</div>;
  }

  return (
    <div className="map-card-list">
      <div className="filter-options">
        <select
          className="map-dropdowns"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="sv">Swedish</option>
        </select>
      </div>
      <div className="map-story-card">
        <button className="close-button" onClick={navigateToMap}>
          <img className="close-icon" src={closeIcon} alt="Back to Map" />
        </button>
        {story.image && (
          <div className="map-story-image">
            <img src={`/${story.image}`} alt={`${story.city} story`} />
          </div>
        )}
        <div className="map-story-info">
          <h4>{story.category}</h4>
          <h3>{story.city}</h3>
        </div>
        <div className="story-map-content">
          <h3>{story.title}</h3>
          <p>{story.content}</p>
          <div className="map-date-icon">
            {timeSince(story.createdAt)}
            <button onClick={handleLikeClick} className="like-button">
              <img className="like-button-icon" src={likeIcon} alt="Like" />
            </button>
            <span className="like-count">{story.ranking}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

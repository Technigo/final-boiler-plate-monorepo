import PropTypes from "prop-types";
import "./Storycard.css";
import { timeSince } from "../utils/timeUtils";
import likeIcon from "../../assets/like.svg";

export const StoryCard = ({ story, isActive, handleRankUpdate }) => {
  // API URL from environment variables or default
  const apiUrl = import.meta.env.VITE_BACKEND_API || "http://localhost:3000";

  // Style object for the card, adjusts scale and z-index based on isActive prop
  const cardStyle = {
    transform: isActive ? "scale(1)" : "scale(1)",
    transition: "transform 0.3s ease-in-out",
    zIndex: isActive ? 100 : 1,
    position: "relative",
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
        if (handleRankUpdate) {
          handleRankUpdate(updatedStory);
        }
      })
      .catch((error) => console.error("Error updating story ranking:", error));
  };

  return (
    <div className="story-card" style={cardStyle}>
      {story.image && (
        <img src={`/${story.image}`} alt={`${story.city} story`} />
      )}
      <div className="story-info">
        <h4>{story.category}</h4>
        <h3>{story.city}</h3>
      </div>
      {isActive && (
        <div className="story-overlay">
          <div className="story-overlay-content">
            <h3>{story.title}</h3>
            <p>{story.content}</p>
          </div>
          <div className="overlay-date-icon">
            {timeSince(story.createdAt)}
            <button onClick={handleLikeClick} className="like-button">
              <img className="like-button-icon" src={likeIcon} alt="Like" />
            </button>
            <span className="like-count">{story.ranking}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// PropTypes for type checking props passed to StoryCard
StoryCard.propTypes = {
  story: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ranking: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    city: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  isActive: PropTypes.bool,
  handleRankUpdate: PropTypes.func,
};

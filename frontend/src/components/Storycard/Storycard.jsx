import PropTypes from "prop-types";
import "./Storycard.css";
import { timeSince } from "../utils/timeUtils";
import likeIcon from "../../assets/like.svg";

export const StoryCard = ({ story, isActive, onUpdateStories }) => {
  const cardStyle = {
    transform: isActive ? "scale(1)" : "scale(1)",
    transition: "transform 0.3s ease-in-out",
    zIndex: isActive ? 100 : 1,
    position: "relative",
  };

  const apiUrl = import.meta.env.VITE_BACKEND_API || "http://localhost:3000";

  const handleLikeClick = () => {
    fetch(`${apiUrl}/stories/${story._id}/rank`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        if (onUpdateStories) {
          onUpdateStories(); // Function to trigger re-fetching of stories
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
        <h4>
          {story.category} {story.city}
        </h4>
      </div>
      {isActive && (
        <div className="story-overlay">
          <h3>{story.title}</h3>
          <p>{story.content}</p>
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

StoryCard.propTypes = {
  story: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ranking: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    city: PropTypes.string,
    image: PropTypes.string, // Image is optional for now
  }).isRequired,
  isActive: PropTypes.bool,
  onRankUpdate: PropTypes.func,
};

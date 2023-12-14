import { useState } from 'react';
import PropTypes from 'prop-types';
import './Storycard.css';

export const StoryCard = ({ story, isActive }) => {
  const [isFullView, setIsFullView] = useState(false);

  const toggleView = () => {
    setIsFullView(!isFullView);
  };

  return (
    <div className={`story-card ${isActive ? 'active' : ''}`}>
      <h3>{story.city}</h3>
      <p>{isFullView ? story.content : `${story.content.substring(0, 100)}...`}</p>
      {/* Include like button and other elements as needed */}
    </div>
  );
};

StoryCard.propTypes = {
  story: PropTypes.shape({
    city: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired,
  isActive: PropTypes.bool
};

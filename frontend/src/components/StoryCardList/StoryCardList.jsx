import PropTypes from 'prop-types';
import './StoryCardList.css'; 
import likeIcon from '../../assets/likeBlack.svg';
import { timeSince } from '../utils/timeUtils';

export const StoryCardList = ({ story }) => {


  return (
    <div className="story-card-list">
    <div className='left-wrapper'>
      <div className="story-image">
        <img src={`/${story.image}`} alt={`${story.city} story`} />
        </div>
        <div className="story-footer">
          {timeSince(story.createdAt)}
          <img className="like-icon" src={likeIcon} alt="Like" />
          <span className="like-count">{story.ranking}</span>
        </div>
        </div>
      <div className="story-content">
      <div className="story-info">
          <h3>{story.category} - {story.city}</h3>
        </div>
        <p>{story.content}</p>
        
      </div>
    </div>
  );
};

StoryCardList.propTypes = {
  story: PropTypes.shape({
    city: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ranking: PropTypes.number.isRequired
  }).isRequired
};

import { useParams } from "react-router-dom";
import { useState, useCallback, memo, useEffect } from "react";

export const Mapcard = () => {
  // eslint-disable-next-line no-undef
  const { id } = useParams();

  console.log(id);

  // calling fetch
  useEffect(() => {
    fetch("http://localhost:3000/stories/:_id")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching story:", error);
      });
  }, []);
  return (
    <div className="story-card-list">
      <div className="story-cards">
        <div className="story-image">
          {/* <img src={`/${story.image}`} alt={`${story.city} story`} /> */}
        </div>
        <div className="story-footer">
          {/* <img className="like-icon" src={likeIcon} alt="Like" /> */}
          <span className="like-count">0</span>
        </div>
      </div>
      <div className="story-content">
        <div className="story-info">
          <h3>Sandra Gustafsson</h3>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia rem
          consequuntur ullam magnam maxime nisi numquam nemo inventore minus
          possimus.
        </p>
      </div>
    </div>
  );
};

// <div key={story._id} className="story-card-list">
// <div className="story-cards">
//   <div className="story-image">
//     <img src={`/${story.image}`} alt={`${story.city} story`} />
//   </div>
//   <div className="story-footer">
//     {timeSince(story.createdAt)}
//     <img className="like-icon" src={likeIcon} alt="Like" />
//     <span className="like-count">{story.ranking}</span>
//   </div>
// </div>
// <div className="story-content">
//   <div className="story-info">
//     <h3>
//       {story.category} - {story.city}
//     </h3>
//   </div>
//   <p>{story.content}</p>
// </div>
// </div>

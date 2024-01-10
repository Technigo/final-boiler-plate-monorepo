import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Storycard/Storycard.css";

export const Mapcard = () => {
  // eslint-disable-next-line no-undef
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(id);

  // Calling fetch
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BACKEND_API || "http://localhost:3000";
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
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!story) {
    return <div>Story not found.</div>;
  }

  return (
    <div className="story-card-list">
      <div className="story-cards">
        {story.image && (
          <div className="story-image">
            <img src={`/${story.image}`} alt={`${story.city} story`} />
          </div>
        )}
        <div className="story-footer">
          {/* You can add like icon here if needed */}
          <span className="like-count">{story.ranking}</span>
        </div>
      </div>
      <div className="story-content">
        <div className="story-info">
          <h3>{story.title}</h3>
        </div>
        <p>{story.content}</p>
      </div>
    </div>
  );
};

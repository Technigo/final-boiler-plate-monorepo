import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Mapcard.css";
import "../StoryCard/StoryCard.css";
import { timeSince } from "../utils/timeUtils";
import likeIcon from "../../assets/like.svg";

// Style object for the card, adjusts scale and z-index based on isActive prop
// const cardStyle = {
//   transform: isActive ? "scale(1)" : "scale(1)",
//   transition: "transform 0.3s ease-in-out",
//   zIndex: isActive ? 100 : 1,
//   position: "relative",
// };

export const Mapcard = () => {
  // eslint-disable-next-line no-undef
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // default to English
  const [stories, setStories] = useState([]);

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

  console.log(id);
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
    <div className="story-card-list">
      <div className="filter-options">
        <select
          className="dropdowns"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="sv">Swedish</option>
        </select>
      </div>
      <div className="story-card">
        {story.image && (
          <div className="story-image">
            <img src={`/${story.image}`} alt={`${story.city} story`} />
          </div>
        )}
        <div className="story-info">
          <h4>{story.category}</h4>
          <h3>{story.city}</h3>
          <div className="story-map-content">
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
        </div>

        <div className="story-overlay"></div>
      </div>
    </div>
  );
};

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./Mapcard.css";
// import "./Storycard.css";
// import { timeSince } from "../utils/timeUtils";
// import likeIcon from "../../assets/like.svg";

// export const Mapcard = () => {
//   // eslint-disable-next-line no-undef
//   const { id } = useParams();
//   const [story, setStory] = useState(null);
//   const [loading, setLoading] = useState(true);

//   console.log(id);

//   // Calling fetch
//   useEffect(() => {
//     const apiUrl = import.meta.env.VITE_BACKEND_API || "http://localhost:3000";
//     fetch(`${apiUrl}/stories/${id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setStory(data);
//         setLoading(false);
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching story:", error);
//       });
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!story) {
//     return <div>Story not found.</div>;
//   }

//   return (
//     <div className="story-card-list">
//       <div className="story-card" style={cardStyle}>
//         {story.image && (
//           <div className="story-image">
//             <img src={`/${story.image}`} alt={`${story.city} story`} />
//           </div>
//         )}
//         <div className="story-info">
//           <h4>{story.category}</h4>
//           <h3>{story.city}</h3>
//         </div>
//         {isActive && (
//           <div className="story-overlay">
//             <div className="story-overlay-content">
//               <h3>{story.title}</h3>
//               <p>{story.content}</p>
//             </div>
//             <div className="overlay-date-icon">
//               {timeSince(story.createdAt)}
//               <button onClick={handleLikeClick} className="like-button">
//                 <img className="like-button-icon" src={likeIcon} alt="Like" />
//               </button>
//               <span className="like-count">{story.ranking}</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// <div className="story-card-list">
//   <div className="story-cards">
//     {story.image && (
//       <div className="story-image">
//         <img src={`/${story.image}`} alt={`${story.city} story`} />
//       </div>
//     )}
//     <div className="story-footer">
//       {/* You can add like icon here if needed */}
//       <span className="like-count">{story.ranking}</span>
//     </div>
//   </div>
//   <div className="story-content">
//     <div className="story-info">
//       <h3>{story.title}</h3>
//     </div>
//     <p>{story.content}</p>
//   </div>
// </div>

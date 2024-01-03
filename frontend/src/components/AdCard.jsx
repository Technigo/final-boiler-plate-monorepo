import { Link } from "react-router-dom";
import "./adcard.css";
import { useState, useEffect } from 'react';
import { adStore } from "../stores/adStore";
import { userStore } from "../stores/userStore";

export const AdCard = ({ ad }) => {
  const [isSaved, setIsSaved] = useState(false);
  const saveAd = adStore((state) => state.saveAd);
  const unsaveAd = adStore((state) => state.unsaveAd);
  const userId = userStore.getState().userId;

  // Check if this ad is saved by the current user
  useEffect(() => {
    console.log(ad)
    setIsSaved(ad.savedBy.includes(userId));
  }, [ad.savedBy, userId]);

  const handleSaveToggle = () => {
    if (isSaved) {
      unsaveAd(ad._id);
    } else {
      saveAd(ad._id);
    }
    setIsSaved(!isSaved);
  };

  return (
    <div className="ad-card">
      <button onClick={handleSaveToggle} className="heart-icon-btn">
        <img src={isSaved ? "/icons/filled-heart.svg" : "/icons/heart.svg"} alt="Heart Icon" />
      </button>
      <Link to={`/ads/${ad._id}`}>
        <img src={ad.image} alt={`${ad.title}`} />
        <div className="ad-card-content">
          <h3>{ad.title}</h3>
          <p>Posted by: {ad.user?.username || "Unknown"}</p>
        </div>
      </Link>
    </div>
  );
};

import { Link } from "react-router-dom";
import "./adcard.css";

export const AdCard = ({ ad }) => {
  console.log(ad); // Debug: Log the ad object

  return (
    <Link to={`/ads/${ad._id}`}>
      <div className="ad-card">
        <img src={ad.image} alt={`${ad.title}`} />
        <h3>{ad.title}</h3>
        <p>Posted by: {ad.user?.username || "Unknown"}</p>
      </div>
    </Link>
  );
};


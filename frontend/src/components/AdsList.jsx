import { useEffect, useState } from "react";
import { AdCard } from "./AdCard";
import { adStore } from "../stores/adStore";
import "./adslist.css";
import { Button } from "./reusableComponents/Button";

export const AdsList = ({ fetchType, userId, initialDisplayCount = 4, maxDisplayCount = 20 }) => {
  const [ads, setAds] = useState([]);
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const getAllAds = adStore((state) => state.getAllAds);
  const fetchAds = adStore((state) => state.fetchAds);
  const fetchAdsByUserId = adStore((state) => state.fetchAdsByUserId);

  const showMoreAds = () => {
    setDisplayCount(maxDisplayCount);
  };

  const showLessAds = () => {
    setDisplayCount(initialDisplayCount);
  };


  useEffect(() => {

    async function fetchData() {
      if (fetchType === "all") {
        await getAllAds();
      } else if (fetchType === "user" && !userId) {
        await fetchAds();
      } else if (fetchType === "user" && userId) {
        await fetchAdsByUserId(userId);
      }

      // Fetch the ads and sort them
      const fetchedAds = adStore.getState().ads;
      const sortedAds = fetchedAds.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAds(sortedAds.slice(0, maxDisplayCount)); // Only get the first 20
    }
    fetchData();
  }, [getAllAds, fetchAds, fetchAdsByUserId, fetchType, userId, maxDisplayCount]);
  // Add fetchType to dependency array

  const renderAdsGrid = () => (
    <div className="ads-grid">
      {ads.slice(0, displayCount).map((ad) => (
        <div className="ads-grid-item" key={ad._id}>
          <AdCard ad={ad} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="ads-outer-wrapper">
      {ads.length === 0 ? (
        <p>{userId ? "This user doesn't have any ads." : "You don't have any ads."}</p>
      ) : (
        renderAdsGrid()
      )}
      {ads.length > initialDisplayCount && (
        <div className="show-more">
          <Button
            label={displayCount === maxDisplayCount ? "Show Less" : "Show More"}
            onClick={displayCount === maxDisplayCount ? showLessAds : showMoreAds}
          />
        </div>
      )}
    </div>
  );
};
//THIS IS HOW TO USE IT IN YOUR PAGE/COMPONENT
// Usage examples:
// <AdsList fetchType="all" />  // For all ads
// <AdsList fetchType="user" />  // For the logged-in user's ads
// <AdsList fetchType="user" userId="specificUserId" />  // For a specific user's ads

//

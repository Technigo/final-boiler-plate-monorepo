import { useEffect } from 'react';
import { adStore } from '../stores/adStore';
import { userStore } from '../stores/userStore';
import { AdCard } from './AdCard';
import "./userssavedads.css";

export const SavedAds = () => {
  // Using useStore hook to subscribe to the savedAds state
  const savedAds = adStore(state => state.savedAds);
  const fetchSavedAds = adStore(state => state.fetchSavedAds);

  useEffect(() => {
    const userId = userStore.getState().userId;
    if (userId) {
      fetchSavedAds();
    }
  }, [fetchSavedAds]);

  return (
    <div className="saved-ads-wrapper">
      {savedAds.length === 0 ? (
        <p>No saved ads to display</p>
      ) : (
        savedAds.map(ad => (
          <AdCard key={ad._id} ad={ad} />
        ))
      )}
    </div>
  );
};

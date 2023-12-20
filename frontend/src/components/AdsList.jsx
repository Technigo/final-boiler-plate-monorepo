import { useEffect, useState } from 'react';
import { AdCard } from './AdCard';
import { adStore } from '../stores/adStore'; 

export const AllAds = () => {
  const [ads, setAds] = useState([]);
  const getAllAds = adStore((state) => state.getAllAds);

  useEffect(() => {
    async function fetchAds() {
      await getAllAds();
      // Assuming the store updates the ads state after fetching
      const fetchedAds = adStore.getState().ads;
      setAds(fetchedAds);
    }
    fetchAds();
  }, [getAllAds]);

  return (
    <div>
      {ads.map((ad) => (
        <AdCard key={ad._id} ad={ad} />
      ))}
    </div>
  );
};

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adStore } from '../stores/adStore';
import { userStore } from '../stores/userStore';

export const UserAds = () => {
    const { ads, fetchAdsByUserId, deleteAdById } = adStore(state => ({
      ads: state.ads,
      fetchAdsByUserId: state.fetchAdsByUserId,
      deleteAdById: state.deleteAdById
    }));
    const navigate = useNavigate();
  
    useEffect(() => {
      const userId = userStore.getState().userId;
      if (userId) {
        fetchAdsByUserId(userId); // This should update the ads state in your store
      }
    }, [fetchAdsByUserId]);

  const handleDelete = async (adId) => {
    await deleteAdById(adId);
  };

  const handleEdit = (adId) => {
    navigate(`/edit-ad/${adId}`);
  };

  return (
    <div className="user-ads-container">
      {ads.map(ads => (
        <div key={ads._id} className="user-ad">
          <img src={ads.image} alt={ads.title} className="user-ad-image" />
          <h3>{ads.title}</h3>
          <div className="user-ad-actions">
            <button onClick={() => handleEdit(ads._id)}>Edit</button>
            <button onClick={() => handleDelete(ads._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

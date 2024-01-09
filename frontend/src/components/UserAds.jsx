import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adStore } from '../stores/adStore';
import { userStore } from '../stores/userStore';
import { Button } from './reusableComponents/Button';
import "./userads.css";
import { Image } from './reusableComponents/Image';

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
      {ads.map(ad => (
        <div key={ad._id} className="user-ad">
          <Image
            elementClassName="user-ad-image"
            size="medium"
            src={ad.image}
            ImageAltText={ad.title}
          />
          <h3>{ad.title}</h3>
          <div className="user-ad-actions">
            <Button
              icon="./src/assets/edit.svg"
              iconSize="small"
              label="Edit"
              onClick={() => handleEdit(ad._id)}
              invertIcon={true}
            />
            <Button
              icon="./src/assets/trash.svg"
              iconSize="small"
              label="Delete"
              onClick={() => handleDelete(ad._id)}
              invertIcon={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

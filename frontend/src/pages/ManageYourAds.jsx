import BackArrow from '../components/reusableComponents/BackArrow';
import { Button } from '../components/reusableComponents/Button';
import { UserAds } from '../components/UserAds';
import { SavedAds } from '../components/UsersSavedAds';
import { useNavigate } from 'react-router-dom';
import "./manageyourads.css";

export const ManageYourAds = () => {
  const navigate = useNavigate();

  const handleCreateAd = () => {
    navigate('/create-ad');
  };

  return (
    <div className="main-container">
      <div className="main-wrapper">
        <div className="your-ads-container">
          <div className="manage-nav">
            <BackArrow />
            <Button
              iconSize="small"
              label="Create ad"
              onClick={handleCreateAd}
              invertIcon={true}
            />
            <h2>Your Products</h2>
            <UserAds />
            <h2>Saved Products</h2>
            <SavedAds />
          </div>
        </div>
      </div>
    </div>
  );
};


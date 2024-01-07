import BackArrow from '../components/reusableComponents/BackArrow';
import { UserAds } from '../components/UserAds';
import { SavedAds } from '../components/UsersSavedAds';

export const ManageYourAds = () => {
 
  return (
    <div className="container">
      <BackArrow />
      <UserAds />
      <h2>Saved Ads</h2>
   <SavedAds />
    </div>
  );
};

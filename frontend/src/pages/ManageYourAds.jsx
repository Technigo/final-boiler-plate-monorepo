import BackArrow from '../components/reusableComponents/BackArrow';
import { UserAds } from '../components/UsersAds';
import { SavedAds } from '../components/UsersSavedAds';

export const ManageYourAds = () => {
 
  return (
    <div>
      <BackArrow />
      <UserAds />
      <h2>Saved Ads</h2>
   <SavedAds />
    </div>
  );
};

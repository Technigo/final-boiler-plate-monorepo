import { useAuth0 } from "@auth0/auth0-react";
import {userStore} from "../stores/userStore"

export const Profile = () => {
  const { user } = useAuth0();
  const { email } = userStore();
  console.log("user:", user);


  return (
    <div className="flex items-center">
      {/* <div className="w-1/6">
        <img src={user.picture} alt="Profile" className="text-red-100" />
      </div> */}
      <div className="ml-4">
        <h2>{email}</h2>
        <p className="text-black">{user.email}</p>
      </div>
      <div>
        <span>{JSON.stringify(user, null, 2)}</span>
      </div>
    </div>
  );
};


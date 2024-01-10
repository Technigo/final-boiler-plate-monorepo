import { useAuth0 } from "@auth0/auth0-react";
import { userStore } from "../stores/userStore";
import { useEffect } from "react";

export const Profile = () => {
  const { user } = useAuth0();
  const { setEmail } = userStore();

  useEffect(() => {
    // Update the email in the userStore when the component mounts
    setEmail(user?.email || user?.sub || ""); // Adjust the property name based on your user object
  }, [user?.email, user?.sub, setEmail]);

  return (
    <div className="flex items-center">
      <p className="text-black">{user?.name}</p>
      <p className="text-black">{user?.email || user?.sub}</p>
    </div>
  );
};

      /* <div className="w-1/6">
        <img src={user.picture} alt="Profile" className="text-red-100" />
      </div>
      <div className="ml-4">
        <h2>{email}</h2>
        <p className="text-black">{user.email}</p>
      </div>
      <div>
        <span>{JSON.stringify(user, null, 2)}</span>
      </div> */


import { useAuth0 } from "@auth0/auth0-react";
import { UserProfile } from "./UserProfile";

export const Home = () => {
  // const { isAuthenticated } = useAuth0();
  // console.log(isAuthenticated);
  return (
    <div>
      Home
      <UserProfile />
    </div>
  );
};

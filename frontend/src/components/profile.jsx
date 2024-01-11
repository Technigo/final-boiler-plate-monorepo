import { useAuth0 } from "@auth0/auth0-react";
import { userStore } from "../stores/userStore";
import { useEffect, useState } from "react";

export const Profile = () => {
  const [profile, setProfile] = useState();
  const { username, setUsername, loggedInUserId } = userStore();
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const getUserDataFromMongo = async () => {
      try {
        await fetch(`${vite_backend}/user/${user.sub}`)
          .then((res) => res.json())
          .then((data) => {
            setUsername(data.username);
            setLoggedInUserId(data._id);
            setLoading(!loading);
          });
      } catch (error) {
        console.log(error);
      }
    };

    const getUsers = async () => {
      const fetchUsers = await fetch(`${vite_backend}/users`);
      const jsonUsers = await fetchUsers.json();
      setUserList(jsonUsers);
      setUserLoading(!userLoading);
    };

    getUserDataFromMongo();
    if (userList === null) {
      getUsers();
    }
  }, []);

  return (
    isAuthenticated && (
      <div className="flex items-center justify-center mt-8 w-full">
        <div className="flex flex-grow max-w-screen-lg">
          <div className="bg-green-100 px-5 w-1/3">
            <h1 className="text-black py-1 text-md xl:text-2xl">
              Welcome {user.username}.
            </h1>
          </div>
        </div>
      </div>
    )
  );
};

{
  /* export const Profile = () => {
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
    
    <div className="w-1/6">
    <img src={user.picture} alt="Profile" className="text-red-100" />
    </div>
    <div className="ml-4">
    <h2>{email}</h2>
    <p className="text-black">{user.email}</p>
    </div>
    <div>
    <span>{JSON.stringify(user, null, 2)}</span>
    </div> */
}

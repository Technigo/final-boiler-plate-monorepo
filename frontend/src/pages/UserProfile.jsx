import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { userStore } from "../stores/userStore";

export const UserProfile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const {
    chatReceiver,
    setChatReceiver,
    username,
    setUsername,
    setRecipientId,
    recipientId,
    setLoggedInUserId,
    loggedInUserId,
  } = userStore();

  const vite_backend = import.meta.env.VITE_BACKEND_API;
  const vite_backup = import.meta.env.VITE_BACKUP_API;

  const [mongoUsername, setMongoUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    const getUserDataFromMongo = async () => {
      try {
        await fetch(`${vite_backend}/user/${user.sub}`)
          .then((res) => res.json())
          .then((data) => {
            setMongoUsername(data.username);
            setLoggedInUserId(data._id);
            setEmail(data.email);
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
    getUsers();
  }, []);
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="text-black">
        {!loading && (
          <h1 className="text-black text-2xl px-1 py-1 text">
            Welcome {mongoUsername}
          </h1>
        )}
        {!userLoading && (
          <ul>
            {userList.map((user) => (
              <li
                key={user._id}
                className="cursor-pointer"
                onClick={() => {
                  setChatReceiver(user.username);
                  setUsername(mongoUsername);
                  setRecipientId(user._id);
                  console.log("The recipient id is: " + recipientId);
                  console.log("The sender id is: " + loggedInUserId);
                }}
              >
                {user.username}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => {
            console.log(userList);
          }}
        >
          click me
        </button>
      </div>
    )
  );
};

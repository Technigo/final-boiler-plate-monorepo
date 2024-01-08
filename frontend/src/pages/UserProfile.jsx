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
  // const [userMetadata, setUserMetadata] = useState(null);
  // const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const vite_backend = import.meta.env.VITE_BACKEND_API;
  const vite_backup = import.meta.env.VITE_BACKUP_API;

  const [mongoUsername, setMongoUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [userList, setUserList] = useState(null);
  // console.log("username: " + username);
  console.log("user:", user);
  console.log("mongoUsername: " + mongoUsername);

  //#REGION USER_METADATA
  // console.log(useAuth0());
  //Get user metadata if it exists
  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         authorizationParams: {
  //           audience: `https://${domain}/api/v2/`,
  //           scope: "read:current_user",
  //         },
  //       });

  //       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

  //       const metadataResponse = await fetch(userDetailsByIdUrl, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       const { user_metadata } = await metadataResponse.json();

  //       setUserMetadata(user_metadata);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };

  //   getUserMetadata();
  // }, [getAccessTokenSilently, user?.sub]);

  //#ENDREGION

  useEffect(() => {
    const getUserDataFromMongo = async () => {
      console.log(`${vite_backup}/user/${user.sub}`);
      try {
        await fetch(`${vite_backup}/user/${user.sub}`)
          .then((res) => res.json())
          .then((data) => {
            // console.log("data: " + JSON.stringify(data));
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
      const fetchUsers = await fetch(`${vite_backup}/users`);
      const jsonUsers = await fetchUsers.json();
      setUserList(jsonUsers);
      setUserLoading(!userLoading);
      console.log(userList);
    };

    getUserDataFromMongo();
    getUsers();

    // const chatSetup = async() => {
    //   await setUsername(mongoUsername); console.log("chatReceiver: " + chatReceiver )};

    // chatSetup();
  }, []);

  console.log("User: " + JSON.stringify(user));
  console.log("Authenticated: " + isAuthenticated);
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
                  console.log(user._id);
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
        {/* <img src={user.picture} alt={user.name} />
        <h2 className="text-black">{user.nickname}</h2>
        <p className="text-black">{user.email}</p> */}
        {/* <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )} */}
      </div>
    )
  );
};

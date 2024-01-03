import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export const UserProfile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  // const [userMetadata, setUserMetadata] = useState(null);
  // const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const vite_backup = import.meta.env.VITE_BACKUP_API;

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

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
            setUsername(data.username);
            setEmail(data.email);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getUserDataFromMongo();
  }, []);

  console.log("User: " + JSON.stringify(user));
  console.log("Authenticated: " + isAuthenticated);
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="text-black">
        <h1 className="text-black text-2xl">Welcome {username}</h1>
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

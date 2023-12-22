import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export const UserProfile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;

  console.log(useAuth0());
  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    // const apiTest = () => {
    //   fetch(`https://${domain}/api/v2/users/`)
    //     .then((res) => res.json())
    //     .then((data) => console.log(data));
    // };
    // apiTest();

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log("User: " + JSON.stringify(user));
  console.log("Authenticated: " + isAuthenticated);

  return (
    isAuthenticated && (
      <div className="text-black">
        <img src={user.picture} alt={user.name} />
        <h2 className="text-black">{user.nickname}</h2>
        <p className="text-black">{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
  );
};

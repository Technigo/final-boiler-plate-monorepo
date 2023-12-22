import { useAuth0 } from "@auth0/auth0-react";

export const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log(user);

  return (
    isAuthenticated && (
      <div className="text-black">
        <img src={user.picture} alt={user.name} />
        <h2 className="text-black">{user.nickname}</h2>
        <p className="text-black">{user.email}</p>
      </div>
    )
  );
};

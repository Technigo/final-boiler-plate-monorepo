import { useAuth0 } from "@auth0/auth0-react";

export const LogoutBtn = () => {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className="bg-black rounded-full cursor-pointer hover:bg-white hover:text-black text-white px-5 py-2 font-semibold"
    >
      Log out
    </button>
  );
};

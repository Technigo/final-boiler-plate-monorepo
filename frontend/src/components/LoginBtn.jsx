import { useAuth0 } from "@auth0/auth0-react";

export const LoginBtn = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button
        onClick={() => loginWithRedirect()}
        className="bg-quinary rounded-full cursor-pointer hover:bg-cyan-800 text-primary px-5 py-2 font-semibold">
        Log in / Register
      </button>
    )
  );
};

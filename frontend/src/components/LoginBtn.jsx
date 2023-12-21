import { useNavigate } from "react-router-dom";

export const LoginBtn = () => {
  const navigate = useNavigate();
  const onLoginClick = () => {
    navigate("/login");
  };
  return (
    <button
      onClick={onLoginClick}
      className="bg-pink-400 rounded-full cursor-pointer hover:bg-cyan-800 text-white px-5 py-2 font-semibold"
    >
      Log in
    </button>
  );
};

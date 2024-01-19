import { Link, useNavigate } from "react-router-dom";
import { Hanko } from "../../generic/Hanko";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../../states/atoms/userAtoms";

export const Footer = () => {
  const [currentUser, setUser] = useRecoilState(currentUserState);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
    setUser({ name: "", login: false });
    navigate("/");
  };

  return (
    <footer className={`px-8 py-4 border-t `}>
      <div className=" w-full max-w-[1200px] mx-auto font-display font-bold">
        <div className="flex gap-6 text-sm mb-4">
          <Link to="/about">
            <p className="transition border-b-2 border-b-transparent duration-200 hover:border-b-red-dark text-sm sm:text-base">
              About
            </p>
          </Link>
          <Link to="/contact">
            <p
              className="transition 
          border-b-transparent duration-200 border-b-2 hover:border-b-yellow-default text-sm sm:text-base"
            >
              Contact
            </p>
          </Link>

          <button
            onClick={currentUser.login ? handleLogOut : () => navigate("/login")}
            className="transition 
          border-b-transparent duration-200 border-b-2 hover:border-b-blue-dark block text-sm sm:text-base"
          >
            {currentUser.login ? "Log out" : "Log in"}
          </button>
        </div>
        <div className="flex  items-end justify-end gap-5">
          <small className="text-xs sm:text-sm text-start sm:text-center">
            GENGO was created by Sakura
          </small>

          <Hanko size="sm" src="/sakura.webp" />
        </div>
      </div>
    </footer>
  );
};

import logo from "../../assets/green-buddy-logo.png";
import "../reusableComponents/logo.css";
import { useNavigate } from "react-router-dom";

export const Logo = ({ className }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <img
        src={logo}
        alt="logo"
        onClick={handleClick}
        className={className}
      ></img>
    </>
  );
};

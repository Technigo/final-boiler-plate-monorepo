import logoWhite from "../../assets/logo/green-buddy-logo-white.svg";
import logoGreen from "../../assets/logo/green-buddy-logo-green.svg";
import logoBlack from "../../assets/logo/green-buddy-logo-black.svg";
import "../reusableComponents/logo.css";
import { useNavigate } from "react-router-dom";

export const Logo = ({ className, color }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  let logo;
  switch (color) {
    case 'white':
      logo = logoWhite;
      break;
    case 'green':
      logo = logoGreen;
      break;
    case 'black':
      logo = logoBlack;
      break;
    default:
      logo = logoWhite; 
  }

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


//HOW TO USE IT
//<Logo className="your-class-name" color="green" />

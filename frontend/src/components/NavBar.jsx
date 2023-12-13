import { IoIosGlobe } from "react-icons/io";

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="left-section">
        <IoIosGlobe color="white" style={{ fontSize: '30px' }} > </IoIosGlobe>
      </div>
      <div className="right-section">
        <a href="#">Hem</a>
        <a href="#">Mina Sidor</a>
      </div>
    </div>
  );
};


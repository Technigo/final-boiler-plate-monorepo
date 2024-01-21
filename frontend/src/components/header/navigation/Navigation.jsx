import { Link } from "react-router-dom";
import { PiPawPrintLight } from "react-icons/pi";

export const Navigation = ({ onClick }) => {

  const handleLinkClick = () => {

    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <ul>
        <li className="ul-title">Categories</li>
        <li>
          <Link to="/plants/all-plants" onClick={handleLinkClick}>All plants</Link>
        </li>
        <li>
          <Link to="/plants/all-plants/popular" onClick={handleLinkClick}>Most popular</Link>
        </li>
        <li>
          <Link to="/plants/all-plants/shade-loving" onClick={handleLinkClick}>Shade lovers</Link>
        </li>
        <li>
          <Link to="/plants/all-plants/easy" onClick={handleLinkClick}>Easy care</Link>
        </li>
        <li>
          <Link to="/plants/all-plants/pet-friendly" onClick={handleLinkClick}>
            Pet friendly <PiPawPrintLight />
          </Link>
        </li>
        <li>
          <Link to="/plants/all-plants/climbing" onClick={handleLinkClick}>Hanging & climbing</Link>
        </li>
        <li>
          <Link to="/inspo" className="ul-title" onClick={handleLinkClick}>Inspiration</Link>
        </li>
      </ul>
      <hr />
      <ul>
        <li>
          <Link to="/wishlist" onClick={handleLinkClick}>My account</Link>
        </li>
        <li>
          <Link to="/register" onClick={handleLinkClick}>Register</Link>
        </li>
        <li>
          <Link to="/about" onClick={handleLinkClick}>About us</Link>
        </li>
        <li>
          <Link to="/about" onClick={handleLinkClick}>Contact</Link>
        </li>
      </ul>
      <Link to="/" onClick={handleLinkClick}>
        <img
          className="menu-logo"
          src="./big-logo-sand.svg"
          alt="Plants by Holm and Witting logotype"
        />
      </Link>
    </>
  );
};

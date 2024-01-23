import { Link } from "react-router-dom";
import { PiPawPrintLight } from "react-icons/pi";

export const Navigation = ({ closeMenu}) => {

  return (
    <>
      <ul>
        <li className="ul-title">Categories</li>
        <li>
          <Link to="/plants/all-plants" onClick={closeMenu}>
            All plants
          </Link>
        </li>
        <li>
          <Link to="/plants/all-plants/popular" onClick={closeMenu}>
            Most popular
          </Link>
        </li>
        <li>
          <Link to="/plants/all-plants/shade-loving" onClick={closeMenu}>
            Shade lovers
          </Link>
        </li>
        <li>
          <Link to="/plants/all-plants/easy" onClick={closeMenu}>
            Easy care
          </Link>
        </li>
        <li>
          <Link to="/plants/all-plants/pet-friendly" onClick={closeMenu}>
            Pet friendly <PiPawPrintLight />
          </Link>
        </li>
        <li>
          <Link to="/plants/all-plants/climbing" onClick={closeMenu}>
            Hanging & climbing
          </Link>
        </li>
        <li>
          <Link to="/inspo" className="ul-title" onClick={closeMenu}>
            Inspiration
          </Link>
        </li>
      </ul>
      <hr />
      <ul>
        <li>
          <Link to="/dashboard" onClick={closeMenu}>
            My account
          </Link>
        </li>
        <li>
          <Link to="/register" onClick={closeMenu}>
            Register
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={closeMenu}>
            About us
          </Link>
        </li>
      </ul>
      <Link to="/" onClick={closeMenu}>
        <img
          className="menu-logo"
          src="./big-logo-sand.svg"
          alt="Plants by Holm and Witting logotype"
        />
      </Link>
    </>
  );
};

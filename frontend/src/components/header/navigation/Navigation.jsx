import { Link } from "react-router-dom";
import { PiPawPrintLight } from "react-icons/pi";

export const Navigation = ({ closeMenu}) => {

  return (
    <>
      <ul>
        <li className="ul-title">Categories</li>
        <li>
          <Link to="/plants/all-plants" aria-label="Go to shop all plants" onClick={closeMenu}>
            All plants
          </Link>
        </li>
        <li>
          <Link to="/plants/all-plants/popular" aria-label="Go to shop popular plants" onClick={closeMenu}>
            Most popular
          </Link>
        </li>
        <li>
          <Link to="/plants/all-plants/shade-loving" aria-label="Go to shop shade-loving plants" onClick={closeMenu}>
            Shade lovers
          </Link>
        </li>
        <li>
          <Link to="/plants/all-plants/easy" aria-label="Go to shop all easy-maintainence plants" onClick={closeMenu}>
            Easy care
          </Link>
        </li>
        <li>
          <Link to="/plants/all-plants/pet-friendly" aria-label="Go to shop all pet-friendly plants" onClick={closeMenu}>
            Pet friendly <PiPawPrintLight />
          </Link>
        </li>
        <li>
          <Link to="/plants/all-plants/climbing" aria-label="Go to shop all climbing plants" onClick={closeMenu}>
            Hanging & climbing
          </Link>
        </li>
        <li>
          <Link to="/inspo" className="ul-title" aria-label="Go to inspiration page" onClick={closeMenu}>
            Inspiration
          </Link>
        </li>
      </ul>
      <hr />
      <ul>
        <li>
          <Link to="/dashboard" aria-label="Go to account dashboard" onClick={closeMenu}>
            My account
          </Link>
        </li>
        <li>
          <Link to="/register" aria-label="Go to register page" onClick={closeMenu}>
            Register
          </Link>
        </li>
        <li>
          <Link to="/about" aria-label="Go to about page" onClick={closeMenu}>
            About us
          </Link>
        </li>
      </ul>
      <Link to="/" aria-label="Go to home page" onClick={closeMenu}>
        <img
          className="menu-logo"
          src="../../big-logo-sand.svg"
          alt="Plants by Holm and Witting logotype"
        />
      </Link>
    </>
  );
};

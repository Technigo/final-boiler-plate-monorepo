import { Link } from "react-router-dom";
import { PiPawPrintLight } from "react-icons/pi";

export const Navigation = () => {
  return (
    <>
      <ul>
        <li className="ul-title">Categories</li>
        <li>
          <Link to="/plants/all-plants">All plants</Link>
        </li>
        <li>
          <Link to="/plants/popular">Most popular</Link>
        </li>
        <li>
          <Link to="/plants/shady">Shade lovers</Link>
        </li>
        <li>
          <Link to="/plants/easy">Easy care</Link>
        </li>
        <li>
          <Link to="/plants/pets">
            Pet friendly <PiPawPrintLight />
          </Link>
        </li>
        <li>
          <Link to="/plants/easy">Hanging & climbing</Link>
        </li>
      </ul>
      <hr />
      <ul>
        <li>
          <Link to="">My account</Link>
        </li>
        <li>
          <Link to="">Register</Link>
        </li>
        <li>
          <Link to="">About us</Link>
        </li>
        <li>
          <Link to="">Contact</Link>
        </li>
      </ul>
      <Link to="/">
        <img
          className="menu-logo"
          src="./big-logo-sand.svg"
          alt="Plants by Holm and Witting logotype"
        />
      </Link>
    </>
  );
};
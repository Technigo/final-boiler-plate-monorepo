import "./header.css";
import { Link } from 'react-router-dom';
import { CiHome } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";

export const Header = () => {
  return (
    <div className="header">

      <Link to="/"><img className="header-logo" src="/logo11.png" alt="logo" /></Link>
      <nav className="header-nav">
        <ul>
          <li><Link to="/"><CiHome /></Link></li>
          <li><Link to="/about"><CiCircleInfo /></Link></li>
        </ul>
      </nav>
    </div>
  )
}

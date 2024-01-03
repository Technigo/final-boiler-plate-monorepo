import { Link } from "react-router-dom"
import { IoIosClose } from "react-icons/io";
import { PiPawPrintLight } from "react-icons/pi";


export const Navigation = ({isMenuOpen}) => {
return (
  <nav className={`nav-menu ${isMenuOpen && "active"}`}>
    <IoIosClose className="close-icon" />
      <ul>
        <li className="ul-title">Categories</li>
        <li>All plants</li>
        <li>Most popular</li>
        <li>Shade lovers</li>
        <li>Easy care</li>
        <li>Pet friendly <PiPawPrintLight />
</li>
        <li>Hanging & climbing</li>
      </ul>
      <hr></hr>
      <ul>
        <li>My account</li>
        <li>Register</li>
        <li>About us</li>
        <li>Contact</li>
      </ul>
    <Link to="/">
      <img className="menu-logo" src="./big-logo-sand.svg" alt="Plants by Holm and Witting logotype" />
    </Link>
  </nav>
  )
}

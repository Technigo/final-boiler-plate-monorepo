import { Link } from "react-router-dom";
import { useNavStore } from "../stores/NavStore";

export const Navbar = () => {
  const { activePage, setActivePage } = useNavStore();

  return (
    <nav>
      <ul>
        <li className={activePage === "home" ? "active" : ""}>
          <Link to="/" onClick={() => setActivePage("home")}>
            Home
          </Link>
        </li>
        <li className={activePage === "login" ? "active" : ""}>
          <Link to="/login" onClick={() => setActivePage("login")}>
            Login
          </Link>
        </li>
        <li className={activePage === "register" ? "active" : ""}>
          <Link to="/register" onClick={() => setActivePage("register")}>
            Register
          </Link>
        </li>
        <li className={activePage === "profile" ? "active" : ""}>
          <Link to="/profile" onClick={() => setActivePage("profile")}>
            Profile
          </Link>
        </li>
        <li className={activePage === "about" ? "active" : ""}>
          <Link to="/about" onClick={() => setActivePage("about")}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

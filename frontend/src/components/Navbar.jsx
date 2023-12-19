import { Link } from "react-router-dom";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    // Access the 'handleLogout' function from the 'userStore'.
    const storeHandleLogout = userStore((state) => state.handleLogout);

    // Use the 'useNavigate' hook to programmatically navigate between routes.
    const navigate = useNavigate();

    // Function to handle the click event of the logout button.
    const onLogoutClick = () => {
        storeHandleLogout(); // Call the 'handleLogout' function from 'userStore'.
        // Additional logic after logout - navigate to login
        alert("Log out successful");
        navigate("/login");
    };

  return (
    <div>
      <h1>LOGO</h1>
      {/* Hamburger meny for mobile */}

      {/* Navbar for desktop */}
      <nav>
        {/* Create a navigation menu with links to various routes. */}
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/profile">Username</Link>
          </li>
          <li className="app-li">
            <Link to="/settings">Settings</Link>
          </li>
          <li className="app-li">
            <Link to="/about">About</Link>
          </li>
          <li className="app-li">
            <Link to="/login" onClick={onLogoutClick}>Sign Out</Link>
          </li>
        </ul>
      </nav>
    </div>
    
  )
}

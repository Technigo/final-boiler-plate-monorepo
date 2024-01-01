import { Link } from "react-router-dom";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './Navbar.css';


export const Navbar = ({menuItems , menuDesks}) => {
    // Access the 'handleLogout' function from the 'userStore'.
    const storeHandleLogout = userStore((state) => state.handleLogout);

    // Use the 'useNavigate' hook to programmatically navigate between routes.
    const navigate = useNavigate();
    const [isMenuOpen, setMenuOpen] = useState(false);

    // Function to handle the click event of the logout button.
    const onLogoutClick = () => {
        storeHandleLogout(); // Call the 'handleLogout' function from 'userStore'.
        // Additional logic after logout - navigate to login
        alert("Log out successful");
        navigate("/login");
    };
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };

  return (
    <div>
      <nav>
        {/* Create a navigation menu with links to various routes. */}
        <ul className="app-ul">
        <div className="navbar-logo">
          {/* Your logo goes here */}
          <span>Logo</span>

        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
          <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
          <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
        </div>

        
        
        
          {menuDesks.map((menuDesk) => (
            <li  key={menuDesk.path} className="app-li">
              <Link to={menuDesk.path}>{menuDesk.name}</Link>
            </li>
          ))}
        </ul>

        <div className="navbar-container">
      
    

   

        {/* Navbar links */}
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        {isMenuOpen && (
          <div className="close-button" onClick={toggleMenu}>
            &times;
          </div>

        )}
            <ul className="nav-list">
            <div className="navbar-logo">
          {/* Your logo goes here */}
          <span>Logo</span>
        </div>


          {menuItems.map((menuItem) => (
            <li  key={menuItem.path} className="app-li">
              <Link to={menuItem.path}>{menuItem.name}</Link>
            </li>
          ))}
        </ul>
        </div>
        
      </div>
      </nav>
    </div>
    
  )
}

import { Link } from "react-router-dom";
import { useState } from 'react';
import './Navbar.css';


export const Navbar = ({menuItems , menuDesks}) => {
 
    const [isMenuOpen, setMenuOpen] = useState(false);

  
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

        
        
        
          {menuDesks.map((menuDesk) => 
                      (<li  key={menuDesk.path} className="app-li">
                        {menuDesk.path ? 
                        <Link to={menuDesk.path}>{menuDesk.name}</Link> :
                        <button key={menuDesk.name} onClick={menuDesk.onClick}>{menuDesk.name}</button>
                      }
                      </li>)
          )}
        </ul>

      
    

   

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
              <Link to={menuItem.path} onClick={() => menuItem.onClick ? menuItem.onClick() : null}>{menuItem.name}</Link>
            </li>
          ))}
        </ul>
        </div>
      </nav>
    </div>
    
  )
}

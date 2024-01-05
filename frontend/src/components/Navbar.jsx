import { Link } from "react-router-dom";
import { useState } from 'react';
import './Navbar.css';
import logoutIcon from "../assets/logout.svg"


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
                        <img src={logoutIcon} key={menuDesk.name} onClick={menuDesk.onClick}/>
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
                      {menuItem.path ? 
                      <Link to={menuItem.path}>{menuItem.name}</Link> :
                      <img src={logoutIcon} key={menuItem.name} onClick={menuItem.onClick}/>
                    }
                    </li>
          ))}
        </ul>
        </div>
      </nav>
    </div>
    
  )
}

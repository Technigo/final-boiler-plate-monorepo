import { Link } from 'react-router-dom';
import { userStore } from '../store/userStore';
import userIcon from '/user.svg';
import menuIcon from '/menu.svg';
import { useState } from 'react';

export const NavBar = ({ showHamburger }) => {
  const isLoggedIn = userStore.getState().isLoggedIn;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="the-nav-bar">
      {showHamburger && (
        <button
          className={`hamburger-button ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <img src={menuIcon} className="menu-icon" alt="Menu Icon" />
        </button>
      )}

      <div className={showHamburger && isMenuOpen ? 'mobile-menu' : 'desktop-menu'}>
        <Link to="/about">
          <button>About</button>
        </Link>
        <button>Movies</button>
        {isLoggedIn ? (
          <Link to="/user">
            <button>User Page</button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="the-login-button">
              <img src={userIcon} className="login-icon" alt="Login Icon" />
              Login
            </button>
          </Link>
        )}
      </div>

      {showHamburger && isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/about">
            <button>About</button>
          </Link>
          <button>Movies</button>
          {isLoggedIn ? (
            <Link to="/user">
              <button>User Page</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="the-login-button">
                <img src={userIcon} className="login-icon" alt="Login Icon" />
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

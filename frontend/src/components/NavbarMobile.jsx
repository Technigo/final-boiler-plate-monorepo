import React, { useState } from "react";
import "./navbar.css";
import { Link } from 'react-router-dom';
import BurgerMenu from "./BurgerMenu";
import LanguageSwitcher from "./LanguageSwitcher";

const NavbarMobile = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const preventPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="navbar">
            <div className="burger-menu-container">
                {menuOpen && <BurgerMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />}
            </div>
            <img
                src="/menu.png"
                alt="menu"
                style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                onClick={toggleMenu}
            />
            <Link to="/"><img src="/heartwave.png" alt="logo" /></Link>
            <LanguageSwitcher />
        </div>
    );
}

export default NavbarMobile;

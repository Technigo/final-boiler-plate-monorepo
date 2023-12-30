import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/burgermenu.css';

const BurgerMenu = ({ menuOpen, toggleMenu }) => {

    const { t } = useTranslation();

    return (
        <div className="bm-menu">
            <Menu isOpen={menuOpen} onStateChange={({ isOpen }) => toggleMenu(isOpen)} >
                <div className="menu-container">
                    <div className="menu-content">
                        <Link to="/">» {t('Home')}</Link><br /><br />
                        <Link to="/aboutus">» {t('About us')}</Link><br /><br />
                        <Link to="/habits">» {t('My page')}</Link><br /><br />
                        <Link to="/articles">» {t('Articles')}</Link><br /><br />
                        <Link to="/register" className="member">» {t('Become a member')}</Link>
                    </div>
                </div>
            </Menu>
        </div>
    );
};

export default BurgerMenu;

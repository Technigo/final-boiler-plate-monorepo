import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';
import { Link } from 'react-router-dom';
import "./css/navbar.css";

const Navbar = () => {

    const { t } = useTranslation();


    return (
        <div className="navbar">
            <div className="navlinks">
                <div className="nav-links1">
                    <Link to="/">{t('Home')}</Link>
                    <Link to="/aboutus">{t('About us')}</Link>
                    <Link to="/habits">{t('My page')}</Link>
                    <Link to="/articles">{t('Articles')}</Link>
                </div>
                <div className="nav-links2">
                    <Link to="/register" className="member">{t('Become a member')}</Link>
                    <LanguageSwitcher />
                </div>
            </div>
        </div >
    );
}

export default Navbar; 
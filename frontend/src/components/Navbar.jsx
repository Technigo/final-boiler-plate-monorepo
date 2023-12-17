import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { Link } from 'react-router-dom';
import "./css/navbar.css";

const Navbar = () => {

    const { t } = useTranslation();
    {/*
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    useEffect(() => {
        setCurrentLanguage(i18n.language);
    }, [i18n.language]);

console.log('Current language in Navbar:', currentLanguage); */}

    return (
        <div className="navbar">
            <div className="navlinks">
                <div className="nav-links1">
                    <Link to="/">{t('HOME')}</Link>
                    <Link to="/aboutus">{t('ABOUT US')}</Link>
                    <a href="#">{t('MY PAGE')}</a>
                    <Link to="/articles">{t('ARTICLES')}</Link>
                </div>
                <div className="nav-links2">
                    <Link to="/register" className="member">{t('BECOME A MEMBER')}</Link>
                    <LanguageSwitcher />
                </div>
            </div>
        </div >
    );
}

export default Navbar; 
import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
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
            <div className="nav-links">
                <a href="#">{t('HOME')}</a>
                <a href="#">{t('ABOUT US')}</a>
                <a href="#">{t('MY PAGE')}</a>
                <a href="#">{t('ARTICLES')}</a>

                <a href="#" className="member">{t('BECOME A MEMBER')}</a>
                <LanguageSwitcher />

            </div>
        </div>
    );
}

export default Navbar; 
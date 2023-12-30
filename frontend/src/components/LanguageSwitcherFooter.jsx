import React from 'react';
import { useTranslation } from 'react-i18next';
import "./css/footer.css";

const LanguageSwitcherFooter = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = async () => {
        if (i18n.language === 'en') {
            await i18n.changeLanguage('sv');
        } else {
            await i18n.changeLanguage('en');
        }

        console.log('Current language:', i18n.language);
    };


    return (
        <div onClick={toggleLanguage} className="footer-link">
            {i18n.language === 'en' ? 'Change Language' : 'Byt Språk'}
        </div>
    );
};

export default LanguageSwitcherFooter;

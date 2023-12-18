import React from 'react';
import { useTranslation } from 'react-i18next';
import "./css/navbar.css";

const LanguageSwitcher = () => {
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
        <div>
            <button onClick={toggleLanguage} className="globe-button">
                <img
                    src="/globe.png"
                    alt={i18n.language === 'en' ? 'SVE' : 'ENG'}
                    style={{ width: '24px', height: '24px' }}
                />
            </button>
        </div>
    );
};

export default LanguageSwitcher;

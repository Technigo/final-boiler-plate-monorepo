import React from 'react';
import { useTranslation } from 'react-i18next';


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

    const style = {
        cursor: 'pointer',
        padding: '10px',
    };


    return (
        <div onClick={toggleLanguage} style={style}>
            {i18n.language === 'en' ? 'Change Language' : 'Byt Språk'}
        </div>
    );
};

export default LanguageSwitcherFooter;

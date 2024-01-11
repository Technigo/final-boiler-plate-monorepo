import React from 'react';
import { useTranslation } from 'react-i18next';
import "./header.css";

const Header = () => {

    const { t } = useTranslation();

    return (
        <div className="header">
            <div className="header-info">
                <h1>HabitFlow</h1>
                <img className="img-header" src="/heartwave.png" alt="wave" />
            </div>
            <div className="header-quote">
                <h2>{t('Navigate your Goals with HabitFlow: Daily Progress, Lifetime Glow!')}</h2>
            </div>
        </div>
    );
}

export default Header; 
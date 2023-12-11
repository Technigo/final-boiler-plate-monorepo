import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {

    const { t } = useTranslation();

    return (
        <div className="header">
            <h3>t{('Welcome to')}</h3>
            <div className="header-info">
                <img src="/wave.png" alt="wave" />
                <h1>t{('HabitFlow')}</h1>
                <img src="/wave.png" alt="wave" />
            </div>
        </div>
    );
}

export default Header; 
import React from 'react';
import { useTranslation } from 'react-i18next';
/*import "./headermobile.css";*/

const HeaderMobile = () => {

    const { t } = useTranslation();

    return (
        <div className="headermobile">
            <div className="headermobile-info">
                <h1>HabitFlow</h1>
                <div className="headermobile-quote">
                    <h2>{t('Navigate your Goals with HabitFlow: Daily Progress, Lifetime Glow!')}</h2>
                </div>
            </div>
        </div>
    );
}

export default HeaderMobile; 
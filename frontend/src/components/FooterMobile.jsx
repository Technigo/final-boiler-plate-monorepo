import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcherFooter from "./LanguageSwitcherFooter";
import "./css/footermobile.css";

const FooterMobile = () => {

    const { t } = useTranslation();

    return (
        <div className="footermobile">
            <div className='footermobile-content'>
                <LanguageSwitcherFooter />
                <p>Copyright | All rights reserved | 2023</p>
            </div>

        </div>
    );
}

export default FooterMobile; 
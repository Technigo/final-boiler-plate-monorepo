import React from 'react';
import LanguageSwitcherFooter from "./LanguageSwitcherFooter";
import "./footermobile.css";

const FooterMobile = () => {


    return (
        <div className="footermobile">
            <div className="footermobile-content">
                <LanguageSwitcherFooter />
                <p>Copyright | All rights reserved | 2023</p>
            </div>

        </div>
    );
}

export default FooterMobile; 
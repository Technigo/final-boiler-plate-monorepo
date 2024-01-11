import React from "react";
import "./footermobile.css";
import LanguageSwitcherFooter from "./LanguageSwitcherFooter";

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
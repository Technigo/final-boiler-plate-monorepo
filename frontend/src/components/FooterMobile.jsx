import React from "react";
import LanguageSwitcherFooter from "./LanguageSwitcherFooter";

const FooterMobile = () => {
    
    const footermobileStyle = {
        backgroundColor: "#f0e9dc",
        overflow: "hidden",
        padding: "10px",
    };

    const footermobileContentStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const paragraphStyle = {
        fontSize: "8px",
    };

    return (
        <div style={footermobileStyle}>
            <div style={footermobileContentStyle}>
                <LanguageSwitcherFooter />
                <p style={paragraphStyle}>Copyright | All rights reserved | 2023</p>
            </div>
        </div>
    );
}

export default FooterMobile; 
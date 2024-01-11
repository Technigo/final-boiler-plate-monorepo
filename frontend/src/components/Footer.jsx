import React from 'react';
import LanguageSwitcherFooter from "./LanguageSwitcherFooter";
import "./footer.css";

const Footer = () => {


    return (
        <div className="footer">
            <div className='footer-content'>
                <LanguageSwitcherFooter />
                <p>Copyright | All rights reserved | 2023</p>
                <img src="/HabitFlow.png" />
            </div>

        </div>
    );
}

export default Footer; 
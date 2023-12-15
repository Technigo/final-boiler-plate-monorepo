import React from 'react';
import { useTranslation } from 'react-i18next';
import "./css/footer.css";

const Footer = () => {

    const { t } = useTranslation();

    return (
        <div className="footer">
            <div className='footer-content'>
                <a href="#">CHANGE LANGUAGE</a>
                <p>Copyright | All rights reserved | 2023</p>
                <img src="/HabitFlow.png" />
            </div>

        </div>
    );
}

export default Footer; 
import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import "./whyhabit.css";

const WhyHabit = () => {

    const { t } = useTranslation();

    return (
        <div className="why-container">
            <div className="why-in">
                <h2>{t("Why")} HabitFlow?</h2>
                <h3><img src="/check.png" alt="✓" /> {t("Customized goal setting")}</h3>
                <h3><img src="/check.png" alt="✓" /> {t("Track your progress")}</h3>
                <h3><img src="/check.png" alt="✓" /> {t("Become the best version of yourself")}</h3>
            </div>
            <Link to="/register"><button className="become-member">{t("Become a member")}</button></Link>
        </div>

    );
};

export default WhyHabit; 
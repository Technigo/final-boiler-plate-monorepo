import React from "react";
import { Link } from 'react-router-dom';
import "./css/whyhabit.css";

const WhyHabit = () => {

    return (
        <div className="why-container">
            <div className="why-in">
                <h2>Why HabitFlow?</h2>
                <h3><img src="/check.png" alt="✓" /> Customized goal setting</h3>
                <h3><img src="/check.png" alt="✓" /> Track your progress</h3>
                <h3><img src="/check.png" alt="✓" /> Become the best version of yourself</h3>
            </div>
            <Link to="/register"><button className="become-member">Become a member</button></Link>
        </div>

    );
};

export default WhyHabit; 
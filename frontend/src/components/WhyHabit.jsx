import React from "react";
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
            <button className="become-member">Become a member</button>
        </div>

    );
};

export default WhyHabit; 
import React from 'react';
import './habitfront.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const HabitFront = ({ habitName, habitColor, containerClass }) => {
  return (
    <div className={`habitfront-container ${containerClass}`}>
      <span className="habitfront-title">{habitName}</span>
      <div className="habitfront-tracker">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-container">
            <label className="day-label">{day}</label>
            <div className={index === 0 ? `day-circle colored ${habitColor}` : "day-circle"}></div>
          </div>
        ))}
      </div>
      <div className="habitfront-footer">
        <span>Finished weeks: X</span>
      </div>
    </div>
  );
};

export default HabitFront;




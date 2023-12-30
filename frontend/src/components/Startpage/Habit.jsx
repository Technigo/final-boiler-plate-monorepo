import React from 'react';
import './Habit.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Habit = ({ habitName, habitColor, containerClass }) => {
  return (
    <div className={`habit-container ${containerClass}`}>
      <span className="habit-title">{habitName}</span>
      <div className="habit-tracker">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-container">
            <label className="day-label">{day}</label>
            <div className={index === 0 ? `day-circle colored ${habitColor}` : "day-circle"}></div>
          </div>
        ))}
      </div>
      <div className="habit-footer">
        <span>Finished weeks: X</span>
        <span>Longest streak: X</span>
      </div>
    </div>
  );
};

export default Habit;




import React, { useState } from 'react';

export const Challenge = ({ title, description }) => {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <div className={`challenge ${completed ? 'completed' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={handleComplete} disabled={completed}>
        {completed ? 'Challenge Completed, great job!' : 'Complete'}
      </button>
    </div>
  );
};

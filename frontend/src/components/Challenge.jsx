import React, { useState } from 'react';



export const Challenge = ({ title, description, _id }) => {
    const [completed, setCompleted] = useState(false);
  
    const handleComplete = async () => {
        if (!completed) {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/complete-challenge`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify({ challengeId: parseInt(_id) }), // Convert _id to a number
              });
              
      
            if (response.ok) {
              console.log('Challenge completed successfully!');
              setCompleted(true);
            } else {
              const errorMessage = await response.text();
              console.error(`Failed to complete the challenge: ${errorMessage}`);
            }
          } catch (error) {
            console.error('Error completing the challenge:', error);
          }
        }
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
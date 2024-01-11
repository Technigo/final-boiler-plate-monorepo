/* eslint-disable no-unused-vars */
// import { useState } from 'react';

// export const Challenge = ({ title, description, _id }) => {
//     const [completed, setCompleted] = useState(false);
  
//     const handleComplete = async () => {
//         if (!completed) {
//           try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/complete-challenge`, {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': localStorage.getItem('token'),
//                 },
//                 body: JSON.stringify({ challengeId: parseInt(_id) }), // Convert _id to a number
//               });
              
      
//             if (response.ok) {
//               console.log('Challenge completed successfully!');
//               setCompleted(true);
//             } else {
//               const errorMessage = await response.text();
//               console.error(`Failed to complete the challenge: ${errorMessage}`);
//             }
//           } catch (error) {
//             console.error('Error completing the challenge:', error);
//           }
//         }
//       };

//     return (
//       <div className={`challenge ${completed ? 'completed' : ''}`}>
//         <h3 className='challenge-title'>{title}</h3>
//         <p className='challenge-desc'>{description}</p>
//         <button type='submit' onClick={handleComplete} disabled={completed}>
//           {completed ? 'Challenge Completed, great job!' : 'Complete'}
//         </button>
//       </div>
//     );
//   };

import { useState, useEffect } from 'react';

export const Challenge = ({ title, description, _id, user, token }) => {
  const [completed, setCompleted] = useState(localStorage.getItem(`completedChallenge_${_id}`) === 'true');

  useEffect(() => {
    // Check if the challenge is completed when the component mounts
    console.log('User:', user);
    if (user && user.completedChallenges) {
      console.log('Completed Challenges:', user.completedChallenges);
    }

    if (user && user.completedChallenges && user.completedChallenges.includes(parseInt(_id))) {
      setCompleted(true);
    }
  }, [user, _id]);

  const handleComplete = async () => {
    if (!completed) {
      try {
        // Your existing completion logic, for example, sending a request to mark the challenge as completed on the server
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/complete-challenge`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
          },
          body: JSON.stringify({ challengeId: parseInt(_id) }),
        });

        if (response.ok) {
          console.log('Challenge completed successfully!');
          
          // Update the state
          setCompleted(true);

          // Update localStorage to mark the challenge as completed
          localStorage.setItem(`completedChallenge_${_id}`, 'true');
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
      <h3 className='challenge-title'>{title}</h3>
      <p className='challenge-desc'>{description}</p>
      <button type='submit' onClick={handleComplete} disabled={completed}>
        {completed ? 'Challenge Completed, great job!' : 'Complete'}
      </button>
    </div>
  );
};




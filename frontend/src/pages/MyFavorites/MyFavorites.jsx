// //MY PAGE THAT SHOULD BE DISPLAYING THE LOGGED IN USER'S FAVORITE PLAYGROUNDS
// import { useEffect } from 'react';
// import { LogOut } from '../../components/LogOut';
// import usePlaygroundStore from '../../stores/usePlaygroundStore';


// export const MyFavorites = () => {

//   const { displayUserFavorites } = usePlaygroundStore();

//   useEffect(() => {
//     // Call the function to display user favorites when the component mounts
//     displayUserFavorites();
//   }, []); // The empty dependency array ensures that the effect runs only once on mount

//   return (
//     <div className="home-container">
//       <h1>Welcome to the secret page</h1>
//       <LogOut />


//       <h2>Your Favorite Playgrounds</h2>

//       <div>
        
//       </div>
  
//     </div>
  
//   );
// };

import { useEffect, useState } from 'react';
import { LogOut } from '../../components/LogOut';
import usePlaygroundStore from '../../stores/usePlaygroundStore';

export const MyFavorites = () => {
  const { displayUserFavorites } = usePlaygroundStore();
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favorites = await displayUserFavorites();
        setUserFavorites(favorites);
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
      console.log(userFavorites);
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once on mount

  return (
    <div className="home-container">
      <h1>Welcome to the secret page</h1> 
      <LogOut />

      <h2>Your Favorite Playgrounds</h2>

      <div>
        {userFavorites.length > 0 ? (
          <ul>
            {userFavorites.map((favorite) => (
              <li key={favorite._id}>
                {/* Display playground details as needed */}
                <p>Name: {favorite._id}</p>
                {/* <p>Description: {favorite.description}</p> */}
                {/* Add more playground details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite playgrounds found.</p>
        )}
      </div>
    </div>
  );
};





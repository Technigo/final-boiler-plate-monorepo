//MY PAGE THAT SHOULD BE DISPLAYING THE LOGGED IN USER'S FAVORITE PLAYGROUNDS
import { useEffect, useState } from 'react';
import { LogOut } from '../../components/LogOut';
import usePlaygroundStore from '../../stores/usePlaygroundStore';

export const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { fetchUserFavorites } = usePlaygroundStore();

  useEffect(() => {
    // Fetch the user's favorites when the component mounts
    fetchUserFavorites()
      .then((userFavorites) => {
        setFavorites(userFavorites);
      })
      .catch((error) => {
        console.error('Error fetching user favorites:', error);
      });
  }, [fetchUserFavorites]);

  return (
    <div className="home-container">
      <h1>Welcome to the secret page</h1>
      <LogOut />

      <h2>Your Favorite Playgrounds</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              {favorite.name} - {favorite.description}
              {/* Add more details if needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


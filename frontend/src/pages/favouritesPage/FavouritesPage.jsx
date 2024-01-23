// This component is not yet ready and implemented.

import { useEffect } from "react";
import { favouriteStore } from "../../stores/useFavouriteStore";
import { PlantCard } from "../../components/plantCard/PlantCard";

export const FavouritesPage = () => {
  //const { username } = userStore();

  const { favourites, fetchFavourites } = favouriteStore();

  useEffect(() => {
    fetchFavourites();
    
  }, []);

  return (
    <section>
      <h2 className="section-title">Favourite Plant Friends</h2>
      <PlantCard plants={favourites} />
    </section>
  );
};

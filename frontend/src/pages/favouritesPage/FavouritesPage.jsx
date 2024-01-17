import { useEffect } from "react";
import { favouriteStore } from "../../stores/useFavouriteStore";
import { userStore } from "../../stores/useUserStore";
import { PlantCard } from "../../components/plantCard/PlantCard";

export const FavouritesPage = () => {
  const { username } = userStore();

  const { favourites, fetchFavourites } = favouriteStore();

  useEffect(() => {
    fetchFavourites();
    console.log("FAVOURITES:", favourites);
  }, []);

  return (
    <section>
      <h2 className="section-title">Favourite Plant Friends</h2>
      <PlantCard plants={favourites} />
    </section>
  );
};

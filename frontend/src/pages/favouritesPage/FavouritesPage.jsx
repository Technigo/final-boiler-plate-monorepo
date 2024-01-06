import { useEffect } from "react"; 
import { favouriteStore } from "../../stores/favouriteStore"

export const FavouritesPage = () => {

    const { favourites, fetchFavourites } = favouriteStore();

    useEffect(() => {
        fetchFavourites();
        console.log("FAVOURITES:", favourites)
    }, [])

  return (
    <section>
        <h2>Favourite Plant Friends</h2>
    </section>
  )
}

// This component is not yet ready. It is mounted, and linked to in the user dashboard.

// import { useEffect } from "react";
// import { favouriteStore } from "../../stores/useFavouriteStore";
// import { PlantCard } from "../../components/plantCard/PlantCard";
export const FavouritesPage = () => {
  //const { username } = userStore();

  // const { favourites, fetchFavourites } = favouriteStore();

  // useEffect(() => {
  //   fetchFavourites();
  // }, []);

  return (
    <section className="favourites-section">
      <div className="checkout-page-wrapper">
        <h2 className="section-title">Favourite Plant Friends</h2>
        <div className="coming-soon-wrapper">
          <p className="dashboard-text">
            <span className="coming-soon">Coming soon...</span>
              On this page, you will be able to collect your favourite plant friends,
              as in a little wish list of your own! By logging in and liking plants you will be able to always see your favourite green buddies here.
          </p>
        </div>
        {/* <PlantCard plants={favourites} /> */}
      </div>
    </section>
  );
};



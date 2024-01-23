import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { plantStore } from "../../stores/usePlantStore";
import { Button } from "../../components/buttons/Button";
import { PlantCard } from "../../components/plantCard/PlantCard";
import { Instagram } from "../homePage/sections/instagram/Instagram";
import { PlantLoader } from "../../components/lottie/lottieComp";
import "./PlantsPage.css";


export const PlantsPage = () => {
  const allCategories = [
    "Shade-Loving",
    "Easy",
    "Pet-Friendly",
    "Climbing",
    "Popular",
  ];

  const { category } = useParams();

  // Access the 'plants' and 'fetchPlants' functions from the 'plantStore'.
  const { plants, fetchPlantsByCategory, isLoading } = plantStore();

  useEffect(() => {
    if (category) {
      fetchPlantsByCategory(category);
    } else {
      fetchPlantsByCategory(null);
    }
  }, [fetchPlantsByCategory, category]);

  return (
    <>
      <section className="plants-page-wrapper">
        <div className="plants-page-container section-container">
          <div className="title-container">
            <h1>Our Plants</h1>
          </div>
          <div className="main-content">
            <div className="filtering-wrapper">
              <nav className="options-container">
                {allCategories.map((category) => {
                  return (
                    <div key={category} className="category-link">
                      <Link to={`/plants/all-plants/${category.toLowerCase()}`}>
                        {category}
                      </Link>
                    </div>
                  );
                })}
              </nav>
              <Link to="/plants/all-plants">
                <Button
                  className="clear-btn"
                  btnText="Clear filters"
                  ariaLabel="Clear filters button"
                />
              </Link>
            </div>
            {isLoading ? (
              <div className="animation-wrapper">
                <PlantLoader className="loader-animation" />
                <p className="p-body">
                  Hang in there, plant friend! We're fetching your plants for
                  you...
                </p>
              </div>
            ) : (
              <div className="products-wrapper">
                <PlantCard plants={plants} />
              </div>
            )}
          </div>
        </div>
      </section>
      <Instagram />
    </>
  );
};

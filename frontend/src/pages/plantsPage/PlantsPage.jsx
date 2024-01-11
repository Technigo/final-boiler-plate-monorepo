import { plantStore } from "../../stores/plantStore";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../components/buttons/Button";
import { PlantCard } from "../../components/plantCard/PlantCard";
import Skeleton from "@mui/material/Skeleton";
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

  const [error, setError] = useState(null);

  // Access the 'plants' and 'fetchPlants' functions from the 'plantStore'.
  const { plants, fetchPlantsByCategory, isLoading } = plantStore();

  useEffect(() => {
    if (category) {
      fetchPlantsByCategory(category);
    } else {
      fetchPlantsByCategory(null);
    }
  }, [fetchPlantsByCategory, category]);

  console.log(category);

  return (
    <section className="plants-page-wrapper">
      <div className="plants-page-container">
        <div className="title-container">
          <h2 className="section-title">Our Plants</h2>
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
          <div className="products-wrapper">
            {isLoading ? (
              <Skeleton variant="rounded" width={200} height={260} />
            ) : (
              <PlantCard plants={plants} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

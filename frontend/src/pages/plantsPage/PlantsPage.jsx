import { plantStore } from "../../stores/plantStore";
import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { FilteredNav } from "./FilteredNav";
import { PlantCard } from "../../components/plantCard/PlantCard";

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
  const { plants, fetchPlantsByCategory } = plantStore();

  useEffect(() => {
    if (category) {
      fetchPlantsByCategory(category);
    } else {
      fetchPlantsByCategory(null);
    }
  }, [fetchPlantsByCategory, category]);

  console.log(category);

  return (
    <section className="categories-wrapper">
      <div className="header-content">
        <div className="title-container">
          <h2 className="section-title">Our Plants</h2>
        </div>
        <div className="featured-container">
          <p>Sort by featured</p>
        </div>
      </div>
      <div className="main-content">
        {/* <FilteredNav /> */}
        {allCategories.map((category) => {
          return (
            <div key={category}>
              <Link to={`/plants/all-plants/${category.toLowerCase()}`}>
                {category}
              </Link>
            </div>
          );
        })}
        <nav className="options-container">
          <Link to="/plants/all-plants">
            <button>Clear filters</button>
          </Link>
        </nav>
        <div className="products-wrapper">
          <PlantCard plants={plants} />
        </div>
      </div>
    </section>
  );
};

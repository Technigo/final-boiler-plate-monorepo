import { plantStore } from "../../stores/plantStore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import "./PlantsPage.css";

import { PiHeartStraightFill } from "react-icons/pi";

export const FilteredShadyPage = () => {

  const [error, setError] = useState(null);
  //   const [selectedCategory, setSelectedCategory] = useState(null);

  // Access the 'plants' and 'fetchPlants' functions from the 'plantStore'.
  const { plants, fetchPlantsByCategory, selectedCategory } = plantStore();

  useEffect(() => {
    fetchPlantsByCategory("Popular");
  }, [fetchPlantsByCategory]);

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
        <nav className="options-container">
        <ul className="category-options">
            <li><Link to="/plants/all-plants/shady">Shade-loveing</Link></li>
            <li><Link to="/plants/all-plants/easy">Easy</Link></li>
            <li><Link to="/plants/all-plants/pets">Pet friendly</Link></li>
            <li><Link to="/plants/all-plants/climbing">Climbing</Link></li>
            <li><Link to="/plants/all-plants/popular">Popular</Link></li>
          </ul>
          <Link to="/plants/all-plants">
          <button>
            Clear filters
          </button>
          </Link>
        </nav>
        <div className="products-wrapper">
          {plants.map((plant) => {
            return (
              <Link to={`/plants/${plant._id}`}>
              <div
                className="plant-card"
                key={plant._id}
              >
                <img
                  className="preview-plant-img"
                  src={plant.images.full_size_url}
                  alt=""
                />
                <div className="product-overlay">
                  <PiHeartStraightFill className="like-icon" />
                  <div className="title-price-container">
                    <h3 className="card-name">{plant.plant_title}</h3>
                    <span className="card-price">€{plant.price}</span>
                  </div>
                </div>
              </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

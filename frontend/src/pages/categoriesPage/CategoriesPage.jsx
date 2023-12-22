import { plantStore } from "../../stores/plantStore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoriesPage.css";

import { PiHeartStraightFill } from "react-icons/pi";

export const CategoriesPage = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  //   const [selectedCategory, setSelectedCategory] = useState(null);

  // Access the 'plants' and 'fetchPlants' functions from the 'plantStore'.
  const { plants, fetchPlantsByCategory } = plantStore();

  useEffect(() => {
    fetchPlantsByCategory(null);
  }, [fetchPlantsByCategory]);

  const handleCategoryClick = (category) => {
    fetchPlantsByCategory(category);
  };

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
            <li onClick={() => handleCategoryClick("Shade-loving")}>
              Shade-loving
            </li>
            <li onClick={() => handleCategoryClick("Easy")}>Easy</li>
            <li onClick={() => handleCategoryClick("Pet Friendly")}>
              Pet friendly
            </li>
            <li onClick={() => handleCategoryClick("Climbing")}>Climbing</li>
            <li onClick={() => handleCategoryClick("Popular")}>Popular</li>
          </ul>
          <button onClick={() => handleCategoryClick(null)}>
            Clear filters
          </button>
        </nav>
        <div className="products-wrapper">
          {plants.map((plant) => {
            return (
              <div
                className="plant-card"
                onClick={() => navigate(`/plants/${plant._id}`)}
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

import { useState, useEffect } from "react";
import { PiHeartStraightFill } from "react-icons/pi";
import { Link } from "react-router-dom";

import "./BestSellers.css";
//import { useNavigate } from "react-router-dom";

import { plantStore } from "../../../../stores/plantStore";

// import { plantStore } from "../../stores/plantStore";

export const BestSellers = () => {
  //const [plantList, setPlantList] = useState([]);
  const [error, setError] = useState(null);

  // Access the 'plants' and 'fetchPlants' functions from the 'plantStore'.
  const { plants, fetchPlantsByCategory } = plantStore();

  console.log("POPULAR PLANTS:", plants);

  useEffect(() => {
    fetchPlantsByCategory("Popular");
  }, [fetchPlantsByCategory]);

  return (
    <section className="best-sellers-wrapper">
      <div className="best-sellers-container">
        <h2 className="section-title">Best Sellers</h2>
        <div className="products-wrapper">
            {plants.map((plant) => {
              return (
                <Link to={`/plants/${plant._id}`}>
                  <div key={plant._id}>
                    <div className="plant-card">
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
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

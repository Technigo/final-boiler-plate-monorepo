import { useState, useEffect } from "react";
import { PiHeartStraightFill } from "react-icons/pi";

import "./BestSellers.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { plantStore } from "../../stores/plantStore";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const BestSellers = () => {
  //const [plantList, setPlantList] = useState([]);
  const [error, setError] = useState(null);

  // Access the 'plants' and 'fetchPlants' functions from the 'plantStore'.
  const { plants, fetchPlants, setApiEndpoint } = plantStore();

  console.log("POPULAR PLANTS:", plants);
  const navigate = useNavigate();

  useEffect(() => {
    setApiEndpoint("http://localhost:3000/plants/popular");
    fetchPlants().catch((error) => {
      console.error("error fetching plant data", error);
      setError(error);
    });
  }, []);

  return (
    <section className="best-sellers-wrapper">
      <div className="best-sellers-container">
        <h2 className="section-title">Best Sellers</h2>
        <div className="products-wrapper">
          {plants.map((plant) => {
            return (
              <div
                onClick={() => navigate(`/plants/${plant._id}`)}
                key={plant._id}
              >
                <div className="plant-card">
                  <img
                    className="preview-plant-img"
                    // HÄR ÄR EN "FULLÖSNING" PÅ BILDPROBLEMET !!! JAG KAN KANSKE LÖSA SEN!!!
                    src={
                      plant.images.full_size_url.substring(0,4) === "http"
                      ? plant.images.full_size_url
                      : apiEnv + plant.images.full_size_url}
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

//const popularApi = "http://localhost:3000/plants";

// const fetchPlants = async () => {
//   try {
//     const response = await fetch(popularApi);
//     if (!response.ok) {
//       throw new Error("Failed to fetch plants");
//     }

//     const plants = await response.json();
//     setPlantList(plants);
//   } catch (error) {
//     console.error("Error fetching plant data", error);
//     setError(error);
//   }
//};

// useEffect(() => {
//   fetchPlants();
// }, []);

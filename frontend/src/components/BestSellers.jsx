import { useState, useEffect } from "react";
import { IoHeart } from "react-icons/io5";
import "./BestSellers.css";
import { Link } from "react-router-dom";


export const BestSellers = () => {
  const [plantList, setPlantList] = useState([]);
  const [error, setError] = useState(null);

  console.log("PLANTS:", plantList);

  const popularApi = "http://localhost:3000/plants";

  const fetchPlants = async () => {
    try {
      const response = await fetch(popularApi);
      if (!response.ok) {
        throw new Error("Failed to fetch plants");
      }

      const plants = await response.json();
      setPlantList(plants);
    } catch (error) {
      console.error("Error fetching plant data", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <section className="best-sellers-wrapper">
      <div className="best-sellers-container">
        <h2 className="section-title">Best Sellers</h2>
        <div className="products-wrapper">
          {plantList.map((plant) => {
            return (
              <Link to={"/plants/${plant.id}"} key={plant._id}>
                <div className="plant-card" >
                  <img src={plant.images.full_size_url} alt="" />
                  <div className="product-overlay">
                    <IoHeart className="like-icon" />
                    <div className="title-price-container">
                      <h3 className="card-name">{plant.plant_title}</h3>
                      <span className="card-price">{plant.price}</span>
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

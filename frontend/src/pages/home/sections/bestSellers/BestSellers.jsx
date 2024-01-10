import { useState, useEffect } from "react";
import { PlantCard } from "../../../../components/plantCard/PlantCard";

import "./BestSellers.css";

import { plantStore } from "../../../../stores/plantStore";

export const BestSellers = () => {
  //const [plantList, setPlantList] = useState([]);
  const [error, setError] = useState(null);

  // Access the 'plants' and 'fetchPlants' functions from the 'plantStore'.
  const { plants, fetchPlantsByCategory } = plantStore();

  console.log("POPULAR PLANTS:", plants);

  useEffect(() => {
    fetchPlantsByCategory("popular");
  }, [fetchPlantsByCategory]);

  return (
    <section className="best-sellers-wrapper">
      <div className="best-sellers-container">
        <h2 className="section-title">
          Best Sellers{" "}
          <p className="h2-p">
            A wise person once said that <br />{" "}
            <em>"if everyone likes it, I like it too"</em>
          </p>
        </h2>
        <div className="products-wrapper">
          <PlantCard plants={plants} />
        </div>
      </div>
    </section>
  );
};

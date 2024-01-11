import { useEffect, useState } from "react";
import { plantStore } from "../../stores/plantStore";
import { PlantCard } from "../../components/plantCard/PlantCard";
import "./InspoPage.css";

export const InspoPage = () => {
  const { plants, fetchPlantsByIds } = plantStore();
  const [selectedPlantIndexes, setSelectedPlantIndexes] = useState([]);

  const plantIds = [3, 21, 10];

  useEffect(() => {
    fetchPlantsByIds(plantIds);
  }, []);

  const buttonCoordinates = [
    { x: 10, y: 30, plantIndex: 2 },
    { x: 65, y: 45, plantIndex: 1 },
    { x: 90, y: 35, plantIndex: 0 },
  ];

  const handleButtonClick = (plantIndex) => {
    setSelectedPlantIndexes((prevIndexes) => {
      if (prevIndexes.includes(plantIndex)) {
        // Deselect the plant if already selected
        return [];
      } else {
        // Select the clicked plant
        return [plantIndex];
      }
    });
  };

  console.log("p", plants)
  console.log("pi", selectedPlantIndexes)

  return (
    <section className="inspo-section">
      <h2 className="section-title">Plant Dreams</h2>
      <img className="inspo-img"
        src="./inspo-bedroom-mixed.jpg"
        alt="A picture of a modern bedroom with plants."
      />
      {/* Render buttons based on coordinates */}
      {buttonCoordinates.map((coord) => (
        <button
          type="radio"
          name="plants"
          key={coord.plantIndex}
          className="dot-button"
          style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
          onClick={() => handleButtonClick(coord.plantIndex)}
        ></button>
      ))}

      {/* Render PlantCard based on selectedPlantIndex */}
      {selectedPlantIndexes !== null && plants.length > 0 && (
        <PlantCard plants={selectedPlantIndexes.map((index) => plants[index])} />
      )}
    </section>
  );
};

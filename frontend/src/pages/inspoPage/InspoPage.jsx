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
    { x: 10, y: 30, plantIndex: 2 }, // Example coordinates, adjust based on your image
    { x: 65, y: 65, plantIndex: 1 },
    { x: 90, y: 55, plantIndex: 0 },
    // Add more coordinates as needed
  ];

  const handleButtonClick = (plantIndex) => {
    setSelectedPlantIndexes((prevIndexes) => [...prevIndexes, plantIndex]);
  };

  return (
    <section>
      <h2 className="section-title">Plant Dreams</h2>
      <img
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
      {selectedPlantIndexes !== null && (
        <PlantCard plants={selectedPlantIndexes.map((index) => plants[index])} />
      )}
    </section>
  );
};

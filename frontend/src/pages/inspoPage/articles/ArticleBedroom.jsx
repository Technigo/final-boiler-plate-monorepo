import { useEffect, useState } from "react";
import { plantStore } from "../../../stores/usePlantStore";
import { PlantCardMini } from "../../../components/plantCard/PlantCardMini";
import "../InspoPage.css";

export const ArticleBedroom = () => {
  const { plants, fetchPlantsByIds } = plantStore();
  const [selectedPlantIndexes, setSelectedPlantIndexes] = useState([]);
  const [clickedButtonCoord, setClickedButtonCoord] = useState(null);

  const plantIds = [3, 21, 10, 2];
  //const plantIdsTwo = [2, 21];

  useEffect(() => {
    fetchPlantsByIds(plantIds);
  }, []);

  const bedroomButtonCoordinates = [
    //Monstera
    { x: 85, y: 55, plantIndex: 1 },
    //Snake Plant
    { x: 60, y: 70, plantIndex: 2 },
    //Money Tree
    { x: 10, y: 30, plantIndex: 3 },
  ];

  const handleButtonClick = (plantIndex, coord) => {
    setSelectedPlantIndexes((prevIndexes) => {
      if (prevIndexes.includes(plantIndex)) {
        // Deselect the plant if already selected
        return [];
      } else {
        // Select the clicked plant
        return [plantIndex];
      }
    });
    setClickedButtonCoord(coord);
  };

  return (
    <article className="article-bedroom">
      <h2 className="section-title">Bedroom Oasis</h2>
      <div className="image-container-bedroom">
        <img
          className="inspo-img"
          src="./inspo-bedroom-mixed.jpg"
          alt="A picture of a modern bedroom with plants."
        />
        {/* Render buttons based on coordinates */}
        {bedroomButtonCoordinates.map((coord) => (
          <button
            type="radio"
            name="plants"
            key={coord.plantIndex}
            className="dot-button-bedroom"
            style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
            onClick={() => handleButtonClick(coord.plantIndex, coord)}
          ></button>
        ))}
        {/* Render PlantCard based on selectedPlantIndex */}
        {selectedPlantIndexes !== null &&
          plants.length > 0 &&
          clickedButtonCoord !== null && (
            <PlantCardMini
              plants={selectedPlantIndexes.map((index) => plants[index])}
              position={{
                left: `${clickedButtonCoord.x}%`,
                top: `${clickedButtonCoord.y}%`,
              }}
            />
          )}
      </div>
    </article>
  );
};

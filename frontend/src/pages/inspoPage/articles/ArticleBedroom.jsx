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
    { x: 85, y: 55, plantIndex: 2 },
    //Snake Plant
    { x: 60, y: 70, plantIndex: 3 },
    //Money Tree
    { x: 10, y: 30, plantIndex: 1 },
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

  const calculatePlantCardPosition = (dotButtonCoord) => {
    const left = dotButtonCoord.x > 50 ? `${dotButtonCoord.x - 50}%` : `${dotButtonCoord.x}%`;
    const top = dotButtonCoord.y > 50 ? `${dotButtonCoord.y - 50}%` : `${dotButtonCoord.y}%`;
    return { left, top };
  };

  return (
    <article className="article-bedroom">
      <h2 className="article-title">Bedroom Oasis</h2>
      <p className="article-p">Transform your bedroom into a green sanctuary with beautiful plants.</p>
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
              position={calculatePlantCardPosition(clickedButtonCoord)}
            />
          )}
      </div>
      <p className="article-p">
          The leafy elegance not only adds aesthetic charm but also promotes a
          calm atmosphere, enhancing your well-being and connecting you to the
          soothing rhythms of nature. Embrace the beauty of a botanical haven in
          your personal space. 🌿✨ #GreenSanctuary #BedroomOasis
        </p>
    </article>
  );
};

import { useEffect, useState } from "react";
import { plantStore } from "../../../stores/usePlantStore";
import { PlantCardMini } from "../../../components/plantCard/PlantCardMini";
import "../InspoPage.css";

export const ArticleBalcony = () => {
  const { plants, fetchPlantsByIds } = plantStore();
  const [selectedPlantIndexes, setSelectedPlantIndexes] = useState([]);
  const [clickedButtonCoord, setClickedButtonCoord] = useState(null);

  const plantIds = [3, 21, 10, 2];

  useEffect(() => {
    fetchPlantsByIds(plantIds);
  }, []);

  const balconyButtonCoordinates = [
    //Money Tree
    { x: 35, y: 20, plantIndex: 1 },
    //Pep
    { x: 40, y: 80, plantIndex: 0 },
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
    <article className="article-balcony">
      <h2 className="article-title">Balcony Beauties</h2>
      <p className="article-p">Elevate your balcony into a vibrant botanical retreat.</p>
      <div className="image-container-balcony">
        <img
          className="inspo-img"
          src="./inspo-balcony-mixed.jpg"
          alt="A picture of a small balcony with plants."
        />
        {/* Render buttons based on coordinates */}
        {balconyButtonCoordinates.map((coord) => (
          <button
            type="radio"
            name="plants"
            key={coord.plantIndex}
            className="dot-button-balcony"
            style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
            onClick={() => handleButtonClick(coord.plantIndex, coord)}
          ></button>
        ))}
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
          With plants adorning your space, experience the joy of outdoor serenity at your
          doorstep. From colorful blooms to lush greens, create a tranquil oasis
          in the heart of the city. 🌼🌿 #BalconyParadise #BalconyBeauties
        </p>
    </article>
  );
};
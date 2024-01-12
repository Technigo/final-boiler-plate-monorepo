import { useEffect, useState } from "react";
import { plantStore } from "../../../stores/plantStore";
import { PlantCardMini } from "../../../components/plantCard/PlantCardMini";
import "../InspoPage.css";

export const ArticleBalcony = () => {
    const { plants, fetchPlantsByIds } = plantStore();
    const [selectedPlantIndexes, setSelectedPlantIndexes] = useState([]);
    const [ clickedButtonCoord, setClickedButtonCoord] = useState(null);

    const plantIds = [3, 21, 10, 2];
    //const plantIdsTwo = [2, 21];

    useEffect(() => {
      fetchPlantsByIds(plantIds);
    }, []);

    const balconyButtonCoordinates = [
      //Money Tree
      { x: 35, y: 20, plantIndex: 3 },
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

    return (
      <article className="article-balcony">
        <h2 className="section-title">Balcony Beauties</h2>
        <div className="image-container-balcony">
          <img className="inspo-img"
            src="./inspo-balcony-mixed.jpg"
            alt="A picture of a small balcony with plants."
          />
          {/* Render buttons based on coordinates */}
          {balconyButtonCoordinates.map((coord) => (
            <button
              type="radio"
              name="plants"
              key={coord.plantIndex}
              className="dot-button"
              style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
              onClick={() => handleButtonClick(coord.plantIndex, coord)}
            ></button>
          ))}
      </div>

      {/* Render PlantCard based on selectedPlantIndex */}
      {/* {selectedPlantIndexes !== null && plants.length > 0 && clickedButtonCoord !== null && (
        <PlantCardMini plants={selectedPlantIndexes.map((index) => plants[index])}
        position={{left: `${clickedButtonCoord.x}%`, top: `${clickedButtonCoord.y}%`,}}
         />
      )} */}
      {selectedPlantIndexes !== null && plants.length > 0 && clickedButtonCoord !== null && (
        <PlantCardMini plants={selectedPlantIndexes.map((index) => plants[index])}
        position={{left: `10%`, top: `90%`,}}
         />
      )}
      
      </article>
    )
}

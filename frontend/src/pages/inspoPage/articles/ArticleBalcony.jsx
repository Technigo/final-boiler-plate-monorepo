import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { plantStore } from "../../../stores/usePlantStore";
import { PlantCardMini } from "../../../components/plantCard/PlantCardMini";
import "../InspoPage.css";

export const ArticleBalcony = () => {
  const { plants, fetchPlantsByIds } = plantStore();
  const [selectedPlantIndexes, setSelectedPlantIndexes] = useState([]);
  const [clickedButtonCoord, setClickedButtonCoord] = useState(null);

  const plantIds = [3, 21, 10, 2];

  const isMobile = useMediaQuery({maxWidth: 400});
  const isSmallScreen = useMediaQuery({minWidth: 401, maxWidth: 500});
  const isMediumScreen = useMediaQuery({minWidth: 501, maxWidth: 600});
  const isTablet = useMediaQuery({minWidth: 601, maxWidth: 800});
  const isLargeTablet = useMediaQuery({minWidth: 801, maxWidth: 1000});
  const isDesktop = useMediaQuery({minWidth: 1001});

  useEffect(() => {
    fetchPlantsByIds(plantIds);
  }, []);

  const balconyButtonCoordinates = [
    //Money Tree
    { x: 35, y: 20, plantIndex: 3 },
    //Chinese Money Plant
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
    const cardWidth = isMobile ? 55 : isSmallScreen ? 47 : isMediumScreen ? 40 : isTablet ? 30 : isLargeTablet ? 25 : 200; 
    const cardHeight = isMobile ? 40 : isSmallScreen ? 30 : isMediumScreen ? 20 : isTablet ? 20 : isLargeTablet ? 10 : 200;
    const gap = isMobile ? 10 : isSmallScreen ? 7 : isMediumScreen ? 7 : isTablet ? 5 : 5; 

    let left; 
    if (dotButtonCoord.x > 50) {
      // Align right corner with button if button is on the right side
      left = `${dotButtonCoord.x - cardWidth}%`;
    } else {
      // Align left corner with button if button is on the left side
      left = `${dotButtonCoord.x + gap }%`;
    }

    let top; 
    if (dotButtonCoord.y > 50) {
      top = `${dotButtonCoord.y - cardHeight}%`
    } else {
      top = `${dotButtonCoord.y}%`
    };
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
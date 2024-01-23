import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { plantStore } from "../../../stores/usePlantStore";
import { PlantCardMini } from "../../../components/plantCard/PlantCardMini";
import "../InspoPage.css";

export const ArticleBedroom = () => {
  const { plants, fetchPlantsByIds } = plantStore();
  const [selectedPlantIndexes, setSelectedPlantIndexes] = useState([]);
  const [clickedButtonCoord, setClickedButtonCoord] = useState(null);

  const plantIds = [3, 21, 10, 2];

  //0 = CHINESE MONEY PLANT
  //1 = MONSTERA
  //2 = SNAKE PLANT
  //3 = MONEY TREE

  const isMobile = useMediaQuery({maxWidth: 400});
  const isSmallScreen = useMediaQuery({minWidth: 401, maxWidth: 500});
  const isMediumScreen = useMediaQuery({minWidth: 501, maxWidth: 600});
  const isTablet = useMediaQuery({minWidth: 601, maxWidth: 800});
  const isLargeTablet = useMediaQuery({minWidth: 801, maxWidth: 1000});
  const isDesktop = useMediaQuery


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

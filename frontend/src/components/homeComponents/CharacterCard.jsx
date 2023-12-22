import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const CharacterCard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      heading: "Pet-Friendly",
      image: "pet-friendly.png",
      imgAlt: "Image of dog for category pet friendly",
    },
    {
      id: 2,
      heading: "Low-Maintenance",
      image: "low-maintenance.jpg",
      imgAlt: "Image of person watering plant for category low maintenance",
    },
    {
      id: 3,
      heading: "Shade-Loving",
      image: "shade-loving.png",
      imgAlt: "Image of a ZZ plant in shadow for category shade loving",
    },
    {
      id: 4,
      heading: "Something...",
      image: "low-maintenance.jpg",
      imgAlt: "",
    },
  ];

  return (
    <div className="cards-container">
      {cards.map((card) => {
        return (
          <div
            onClick={() => navigate(`/plants`)}
            className="character-card-wrapper"
            key={card.id}
          >
            <img src={card.image} alt={card.imgAlt} />
            <div className="character-overlay">
              <h3>{card.heading}</h3>
              <Link to="" className="shop-now-link">
                shop now
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

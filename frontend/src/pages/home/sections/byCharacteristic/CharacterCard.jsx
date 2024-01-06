import { Link } from "react-router-dom";
import { plantStore } from "../../../../stores/plantStore";

export const CharacterCard = () => {
  const { selectedCategory } = plantStore();

  const cards = [
    {
      id: 1,
      heading: "Pet-Friendly",
      image: "pet-friendly.png",
      imgAlt: "Image of dog for category pet friendly",
      url: "/plants/all-plants/pet-friendly",
    },
    {
      id: 2,
      heading: "Low-Maintenance",
      image: "low-maintenance.jpg",
      imgAlt: "Image of person watering plant for category low maintenance",
      url: "/plants/all-plants/easy",
    },
    {
      id: 3,
      heading: "Shade-Loving",
      image: "shade-loving.png",
      imgAlt: "Image of a ZZ plant in shadow for category shade loving",
      url: "/plants/all-plants/shade-loving",
    },
    {
      id: 4,
      heading: "Something...",
      image: "low-maintenance.jpg",
      imgAlt: "",
      url: "/plants/all-plants/popular",
    },
  ];

  return (
    <div className="cards-container">
      {cards.map((card) => {
        return (
          <Link key={card.id} to={card.url}>
            <div className="character-card-wrapper" >
              <img src={card.image} alt={card.imgAlt} />
              <div className="character-overlay">
                <h3>{card.heading}</h3>
                <p className="shop-now-link">SHOP NOW</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

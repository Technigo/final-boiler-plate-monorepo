import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const CharacterCard = () => {

    const navigate = useNavigate()

    const cards = [
        {id: 1, heading: "Pet-Friendly", image: "", imgAlt: ""},
        {id: 2, heading: "Low-Maintenance", image: "", imgAlt: ""},
        {id: 3, heading: "Shade-Loving", image: "", imgAlt: ""},
        {id: 4, heading: "Something...", image: "", imgAlt: ""}
    ]

  return (
    <div className="cards-container">
        {cards.map((card) => {
            return (
                <div onClick={() => navigate(`/plants`)} className="character-card-wrapper" key={card.id}>
                    <h3>{card.heading}</h3>
                    <Link to="" className="shop-now-link">shop now</Link>
                    <img src={card.image} alt={card.imgAlt} />
                </div>
            )
        })}
    
    </div>
  )
}

import React from 'react'
import { Link } from "react-router-dom"

export const CharacterCard = () => {

    const cards = [
        {id: 1, heading: "Pet-Friendly", image: "", imgAlt: ""},
        {id: 2, heading: "Low-Maintenance", image: "", imgAlt: ""},
        {id: 3, heading: "Shade-Loving", image: "", imgAlt: ""},
        {id: 4, heading: "Something...", image: "", imgAlt: ""}
    ]

  return (
    <>
        {cards.map((card) => {
            return (
                <div className="character-card-wrapper" key={card.id}>
                <h3>{card.heading}</h3>
                <Link to="">SHOP NOW</Link>
                <img src={card.image} alt={card.imgAlt} />
                </div>
            )
        })}
    
    </>
  )
}

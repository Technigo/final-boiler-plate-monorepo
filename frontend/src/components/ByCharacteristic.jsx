import React from 'react';
import { CharacterCard } from "../components/CharacterCard.jsx";

export const ByCharacteristic = () => {

    const text = {
        heading: "By Characteristic"
    }
  return (
    <section className="by-characteristic-wrapper">
        <h2>{text.heading}</h2>
        <CharacterCard />
    </section>
  )
}

import React from "react";
import { CharacterCard } from "./CharacterCard.jsx";
import "./ByCharacteristic.css";

export const ByCharacteristic = () => {
  const text = {
    heading: "By Characteristic",
  };
  return (
    <section className="by-characteristic-wrapper">
      <h2 className="section-title">{text.heading}</h2>
      <CharacterCard />
    </section>
  );
};

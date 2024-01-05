import { CharacterCard } from "./CharacterCard";
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

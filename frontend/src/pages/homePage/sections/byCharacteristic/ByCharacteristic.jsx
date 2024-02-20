import { CharacterCard } from "./CharacterCard";
import "./byCharacteristic.css";

export const ByCharacteristic = () => {
  const content = {
    heading: "By Characteristic",
    sectionP: "Botanical treasures to suit every environment",
  };

  return (
    <section className="characteristic-wrapper">
      <div className="characteristic-container section-container">
        <h2 className="section-title">
          {content.heading} <p className="h2-p">{content.sectionP}</p>
        </h2>
        <CharacterCard />
      </div>
    </section>
  );
};

import { CharacterCard } from "./CharacterCard";
import "./ByCharacteristic.css";

export const ByCharacteristic = () => {
  const text = {
    heading: "By Characteristic",
  };
  return (
    <section className="by-characteristic-wrapper">
      <div className="by-characteristic-container">
        <h2 className="section-title">
          {text.heading}{" "}
          <p className="h2-p">Botanical treasures to suit every environment</p>
        </h2>
        <CharacterCard />
      </div>
    </section>
  );
};

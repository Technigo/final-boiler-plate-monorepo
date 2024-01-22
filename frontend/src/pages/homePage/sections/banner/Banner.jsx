import "./Banner.css";

// ICONS IMPORTS
import { LuPackageCheck } from "react-icons/lu";
import { BsEnvelopePaperHeart } from "react-icons/bs";
import { RiTruckLine, RiPlantLine } from "react-icons/ri";

export const Banner = () => {
  const content = {
    spanOne: "healthy plants",
    spanTwo: "packed with love",
    spanThree: "climate shipping",
    spanFour: "care advice",
  };

  return (
    <section className="banner-wrapper">
      <div className="banner-container section-container">
        <div className="healty-plants-container">
          <RiPlantLine className="banner-icon" />
          <span>{content.spanOne}</span>
        </div>
        <div className="packed-with-love-container">
          <LuPackageCheck className="banner-icon" />
          <span>{content.spanTwo}</span>
        </div>
        <div className="climate-shipping-container">
          <RiTruckLine className="banner-icon" />
          <span>{content.spanThree}</span>
        </div>
        <div className="care-advice-container">
          <BsEnvelopePaperHeart className="banner-icon" />
          <span>{content.spanFour}</span>
        </div>
      </div>
    </section>
  );
};

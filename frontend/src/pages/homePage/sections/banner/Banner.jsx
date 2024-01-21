import "./Banner.css";
import { LuPackageCheck } from "react-icons/lu";
import { BsEnvelopePaperHeart } from "react-icons/bs";
import { RiTruckLine, RiPlantLine } from "react-icons/ri";

export const Banner = () => {
  return (
    <section className="banner-container">
      <div className="healty-plants-container">
        <RiPlantLine className="icon" />
        <p>healthy plants</p>
      </div>
      <div className="packed-with-love-container">
        <LuPackageCheck className="icon" />
        <p>packed with love</p>
      </div>
      <div className="climate-shipping-container">
        <RiTruckLine className="icon" />
        <p>climate shipping </p>
      </div>
      <div className="care-advice-container">
        <BsEnvelopePaperHeart className="icon" />
        <p>care advice</p>
      </div>
    </section>
  );
};

import React from "react";

export const PlantCare = ({
  singlePlant,
  MdOutlineWaterDrop,
  MdOutlineLightMode,
}) => {
  return (
    <div className="plant-care-wrapper">
      <h2 className="care-title">Treatments & Facts</h2>
      <span className="italic-style">Origin: {singlePlant.origin}</span>
      <p>
        {singlePlant.careDetails && singlePlant.careDetails.care_description}
      </p>
      <ul className="treatment-details">
        <li>
          <div>
            <MdOutlineLightMode className="care-icon" />
          </div>
          <p>{singlePlant.careDetails && singlePlant.careDetails.light}</p>
        </li>
        <li>
          <div>
            <MdOutlineWaterDrop className="care-icon" />
          </div>
          <p>{singlePlant.careDetails && singlePlant.careDetails.watering}</p>
        </li>
      </ul>
      <div className="fun-fact-wrapper">
        <h3 className="fun-fact-title">Fun Fact</h3>
        <p>{singlePlant.fun_fact}</p>
      </div>
    </div>
  );
};

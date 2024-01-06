import React from "react";
import { Button } from "../../../../components/buttons/Button";

import "./Inspo.css";

export const Inspo = () => {
  const text = {
    heading: "Chopidopido",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do aiusmod.",
    btnText: "GET INSPIRED",
  };

  return (
    <section className="inspo-wrapper">
      <div className="inspo-container">
        <div className="text-button-wrapper">
          <h2 className="inspo-title">{text.heading}</h2>
          <p className="inspo-text">{text.text}</p>
          <Button
            className="inspo-btn"
            btnText={text.btnText}
            ariaLabel="inspo button"
          />
        </div>
        <div className="inspo-box">this is inspo content</div>
      </div>
    </section>
  );
};

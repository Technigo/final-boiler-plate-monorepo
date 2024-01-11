import React from "react";
import { Button } from "../../../../components/buttons/Button";
import { Link } from "react-router-dom";

import "./Inspo.css";

export const Inspo = () => {
  const text = {
    heading: "Time for inspiration",
    text: "Need some new input on what to do next with your urban jungle?",
    btnText: "GET INSPIRED",
  };

  return (
    <section className="inspo-wrapper">
      <Link to="/inspo">
        <div className="inspo-container">
          <div className="text-button-wrapper">
            <h2 className="inspo-title">{text.heading}</h2>
            <p className="h2-p">{text.text}</p>
            <Button
              className="inspo-btn"
              btnText={text.btnText}
              ariaLabel="inspo button"
            />
          </div>
        </div>
      </Link>
    </section>
  );
};

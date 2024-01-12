import { Link } from "react-router-dom";
import { Button } from "../../../../components/buttons/Button";

import "./Hero.css";

export const Hero = () => {
  const text = {
    heading: "Ready to add to your urban jungle?",
    btnText: "Shop all plants",
  };

  return (
    <section className="hero-wrapper">
      <div className="hero-content-wrapper">
        <div className="text-container">
          <h1>{text.heading}</h1>
          <p>
            Your Space, Your Plants, Your Way! <br /> Start 2024 off with a new
            plant you'll love!
          </p>
        </div>
        <Link to="plants/all-plants">
          <Button
            className={"all-plants-btn"}
            btnText={text.btnText}
            ariaLabel={"Shop all plants"}
          />
        </Link>
      </div>
      <div className="hero-image-container">
        <img src="./hero-img.png" alt="" />
      </div>
    </section>
  );
};

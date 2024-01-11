import { Link } from "react-router-dom";
import { Button } from "../../../../components/buttons/Button";

import "./Hero.css";

export const Hero = () => {
  const text = {
    heading: "Ready to add to your urban jungle?",
    text: "Give our plants a new home, take a look at all the plant buddies we've got!",
    btnText: "Shop all plants",
  };

  return (
    <section className="hero-wrapper">
      <div className="hero-content-wrapper">
        <h1>{text.heading}</h1>
        <p>{text.text}</p>
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

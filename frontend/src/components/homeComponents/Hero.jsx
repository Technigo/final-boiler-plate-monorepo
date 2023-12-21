import { useNavigate } from "react-router-dom";
import { Button } from "../../components/buttons/Button";

import "./Hero.css";

export const Hero = () => {
  const text = {
    heading: "Ready to add to your urban jungle?",
    text: "Give our plants a new home, take a look at what we've got!",
    btnText: "shop all plants",
  };
  const navigate = useNavigate();

  return (
    <section className="hero-wrapper">
      <div className="hero-content-wrapper">
        <h1>{text.heading}</h1>
        <p>{text.text}</p>
        <Button
          className="all-plants-btn"
          btnText={text.btnText}
          ariaLabel="login button"
        />
      </div>
      <div className="hero-image-container">
        <img src="./hero-img.png" alt="" />
      </div>
    </section>
  );
};

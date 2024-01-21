import { Button } from "../../../../components/buttons/Button";
import { Link } from "react-router-dom";
import { Carousel } from "../../../../components/carousel/Carousel";
import "./Inspo.css";

export const Inspo = () => {
  const text = {
    heading: "Inspiration",
    text: "Need some new input on what to do next with your urban jungle?",
    btnText: "GET INSPIRED",
  };

  return (
    <section className="inspo-wrapper">
      <div className="inspo-container">
        <div className="inspo-content-wrapper">
          <h2 className="section-title">{text.heading}</h2>
          <p className="inspo-p">{text.text}</p>
          <Link to="/inspo">
            <Button
              className="inspo-btn terracotta-btn"
              btnText={text.btnText}
              ariaLabel="inspo button"
            />
          </Link>
        </div>
        <div className="inspo-bg-container">
          <div className="leaf-container">
            <img src="./monstera-leaf.svg" alt="Illustration of a monstera leaf" />
          </div>
          <div className="inspo-img-container">
            <Carousel />
          </div>
        </div>
      </div>
    </section>
  );
};

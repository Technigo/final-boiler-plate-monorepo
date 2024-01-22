import { Button } from "../../../../components/buttons/Button";
import { Link } from "react-router-dom";
import { Carousel } from "../../../../components/carousel/Carousel";
import "./Inspo.css";

export const Inspo = () => {
  const content = {
    heading: "Inspiration",
    sectionP: "Need some new input on what to do next with your urban jungle?",
    btnText: "GET INSPIRED",
    btnAriaLabel: "Button to inspiration page",
    linkTo: "/inspo",
    srcImg: "./monstera-leaf.svg",
    altImg: "Illustration of a monstera leaf",
  };

  return (
    <section className="inspo-wrapper">
      <div className="inspo-container">
        <div className="inspo-content-wrapper">
          <h2 className="section-title">{content.heading}</h2>
          <p className="inspo-p">{content.sectionP}</p>
          <Link to={content.linkTo}>
            <Button
              className="inspo-btn terracotta-btn"
              btnText={content.btnText}
              ariaLabel={content.btnAriaLabel}
            />
          </Link>
        </div>
        <div className="inspo-bg-container">
          <div className="leaf-container">
            <img src={content.srcImg} alt={content.altImg} />
          </div>
          <div className="inspo-img-container">
            <Carousel />
          </div>
        </div>
      </div>
    </section>
  );
};

import { Link } from "react-router-dom";
import { Button } from "../../../../components/buttons/Button";
import "./Hero.css";

export const Hero = () => {
  const content = {
    heading: "Ready to add to your urban jungle?",
    sectionPOne: "Your Space, Your Plants, Your Way! ",
    sectionPTwo: "Start 2024 off with a new plant you'll love!",
    btnText: "Shop all plants",
    btnAriaLabel: "Shop all plants",
    linkTo: "plants/all-plants",
    srcHeroImg: "./hero-img.jpg",
    altHeroImg: "Background of plants",
  };

  return (
    <section className="hero-wrapper">
      <div className="hero-content-wrapper">
        <div className="text-container">
          <h1>{content.heading}</h1>
          <p>
            {content.sectionPOne}
            <br />
            {content.sectionPTwo}
          </p>
        </div>
        <Link to={content.linkTo}>
          <Button
            className={"all-plants-btn terracotta-btn"}
            btnText={content.btnText}
            ariaLabel={content.btnAriaLabel}
          />
        </Link>
      </div>
      <div className="hero-image-container">
        <img src={content.srcHeroImg} alt={content.altHeroImg} />
      </div>
    </section>
  );
};

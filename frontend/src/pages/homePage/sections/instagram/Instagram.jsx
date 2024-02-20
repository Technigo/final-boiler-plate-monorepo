import { Link } from "react-router-dom";
import "./Instagram.css";

export const Instagram = () => {
  const content = {
    heading: "Join our Community",
    span: "#PlantsByYou",
    linkTo: "https://www.instagram.com/plantsby_hw/",
    linkText: "@plantsby_hw",
    pOne: "We love to see our plants in your homes. Tag your photo with ",
    pTwo: " on Instagram.",
    srcImgOne: "/../insta_1.jpg",
    altImgOne: "Livingroom with plants",
    srcImgTwo: "/../insta_2.jpg",
    altImgTwo: "Livingroom with a ficus on the table",
    srcImgThree: "/../insta_3.jpg",
    altImgThree: "Window sill with plants",
    srcImgFour: "/../insta_4.jpg",
    altImgFour: "Livingroom with a big strelitzia nicolai plant",
  };

  return (
    <section className="insta-wrapper">
      <div className="insta-container section-container">
        <h2 className="section-title">{content.heading}</h2>
        <span className="hashtag">{content.span}</span>
        <ul className="instafeed-container">
          <li>
            <img src={content.srcImgOne} alt={content.altImgOne} />
          </li>
          <li>
            <img src={content.srcImgTwo} alt={content.altImgTwo} />
          </li>
          <li>
            <img src={content.srcImgThree} alt={content.altImgThree} />
          </li>
          <li>
            <img src={content.srcImgFour} alt={content.altImgFour} />
          </li>
        </ul>
        <p>
          {content.pOne}{" "}
          <Link to={content.linkTo}>
            <b>{content.linkText}</b>
          </Link>{" "}
          {content.pTwo}
        </p>
      </div>
    </section>
  );
};

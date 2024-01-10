import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/reusableComponents/Button";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import shareAnimation from "../assets/share.json";
import contact from "../assets/get-contact.svg";
import giveAway from "../assets/give-away.svg";
import picture from "../assets/picture.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./landing.css";
import "../components/adslist.css";
import broccoli from "../assets/broccoli.jpeg";
import tomatoes from "../assets/cherry-tomatoes.jpeg";
import cucumber from "../assets/cucumber.jpeg";
import jam from "../assets/jam.jpeg";
import tinyTim from "../assets/tiny-tim.jpg";

export const Landing = () => {
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    // Set images to state when they are loaded
    setSliderImages([broccoli, tomatoes, cucumber, jam, tinyTim]);
  }, []);

  // Settings for the carousel
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 834,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 393,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Navbar
        menuItems={[
          { path: "/login", name: "Login" },
          { path: "/register", name: "Signup" },
          { path: "/about", name: "About" },
          { path: "/terms", name: "Terms" },
        ]}
        menuDesks={[
          { path: "/login", name: "Login" },
          { path: "/register", name: "Signup" },
          { path: "/terms", name: "Terms" },
          { path: "/about", name: "About" },
        ]}
      />
      <div className="main-container">
        <div className="main-wrapper">
          <div className="hero">
            <h1 className="landing-heading">Stop the waste!</h1>
            <h3>Help yourself by helping others and the environment!</h3>
            <div className="lottie-container">
              <Lottie animationData={shareAnimation} />
            </div>
          </div>
          <div className="button-wrapper">
            <Button label="Get started" link="/login" />
          </div>
          <div className="how-to">
            <h1>How it works</h1>
            <div className="landing-list">
              <div>
                <h3>Share online</h3>
                <img src={picture} alt="share-online" />
              </div>
              <div>
                <h3>Get contacted</h3>
                <img src={contact} alt="contact" />
              </div>
              <div>
                <h3>Give it away</h3>
                <img src={giveAway} alt="give-away" />
              </div>
            </div>
            <div className="breakline"></div>
          </div>
          <div className="landing-subtitle">
            <h2>What others have given away...</h2>
          </div>
        </div>
      </div>
      <div className="slider">
        <Slider {...settings}>
          {sliderImages.map((image, index) => (
            <div className="ads-inner-wrapper" key={index}>
              <img
                src={image}
                alt={`slider-image-${index}`}
                className="landing-adcard"
              />
            </div>
          ))}
        </Slider>
      </div>
      <Footer />
    </>
  );
};

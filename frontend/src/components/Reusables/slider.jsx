import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Import local image files
import slide1 from "../../assets/slide1.webp";
import slide2 from "../../assets/slide2.webp";
import slide3 from "../../assets/slide3.webp";
import slide4 from "../../assets/slide4.webp";
import slide5 from "../../assets/slide5.webp";
import slide6 from "../../assets/slide6.webp";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2.5,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

// Define an array of image paths
const sliderImages = [slide1, slide2, slide3, slide4, slide5, slide6];

const Slider = () => {
  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
      >
        {/* Map through the sliderImages array and render each image */}
        {sliderImages.map((image, index) => {
          return (
            <div className="slider" key={index}>
              <img
                src={image}
                alt={`slide${index + 1}`}
                className="rounded-lg w-screen h-auto md:w-10/12 md:h-auto"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slider;

import { useState, useEffect } from "react";

export const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["./inspo-bedroom-mixed.jpg", "./inspo-balcony-mixed.jpg"]; // Add images here

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return <img className="inspo-image" src={images[currentImageIndex]} alt="Inspiration images" />;
};

import { useState, useEffect } from "react";

export const Carousel = () => {
  // Set initial image index to 0. This will be updated by the useEffect hook
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Add images here
  const images = ["./inspo-bedroom-mixed.jpg", "./inspo-balcony-mixed.jpg"];

  // useEffect hook to change the image index every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the image index by 1, or reset to 0 if the index is at the end of the array
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    // Return a function from the useEffect hook to clear the interval.
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <img
      className="inspo-image"
      src={images[currentImageIndex]}
      alt="Inspiration images"
    />
  );
};

import { useState, useEffect } from 'react';
import { StoryCard } from '../Storycard/Storycard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css';


export const Carousel = () => {
  const [stories, setStories] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    fetch('stories.json') // The URL is relative to the public directory
      .then(response => response.json())
      .then(data => setStories(data.stories))
      .catch(error => console.error('Error fetching stories:', error));
  }, []);

  const settings = {
    dots: true, // Shows dot indicators at the bottom of the carousel
    initialSlide: 2, // Add this line to start with the third slide
    centerMode: true, // Enables center mode
  centerPadding: '40px', // Adjust as needed for your design
    infinite: true, // Infinite looping or not
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll
    swipeToSlide: true, // Allows swiping to the next/prev slide
    responsive: [
      {
        breakpoint: 768, // Adjust the number for your breakpoint
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      // You can add more breakpoints here
    ],
    beforeChange: (current, next) => setActiveSlide(next),
  };

  return (
    <div className='carousel-wrapper'>
      <Slider {...settings}>
      {stories.map((story, index) => (
        <StoryCard key={story.id} story={story} isActive={index === activeSlide} />
      ))}
    </Slider>
    </div>
  );
};


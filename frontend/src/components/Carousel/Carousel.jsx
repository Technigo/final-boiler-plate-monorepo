import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import './Carousel.css';
import { StoryCard } from '../Storycard/Storycard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';



export const Carousel = () => {
  const [stories, setStories] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0); 

  useEffect(() => {
    fetch('stories.json') // The URL is relative to the public directory
      .then(response => response.json())
      .then(data => setStories(data.stories))
      .catch(error => console.error('Error fetching stories:', error));
  }, []);

  const onSlideChange = (swiper) => {
    setActiveSlide(swiper.realIndex); // Update active slide index

    // Reset z-index for all slides
    swiper.slides.forEach((slide) => {
      slide.style.zIndex = 1;
    });

    // Increase z-index for the active slide
    const activeSlideElement = swiper.slides[swiper.activeIndex];
    if (activeSlideElement) {
      activeSlideElement.style.zIndex = 100;
    }
  };


  return (
    <Swiper
      modules={[EffectCoverflow, Pagination]}
      effect="coverflow"
      centeredSlides={true}
      slidesPerView={2}
      loop={true}
      initialSlide={0}
      coverflowEffect={{
        rotate: 0,
        stretch: 20,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      onSlideChange={onSlideChange}
    >
      {stories.map((story, index) => (
        <SwiperSlide key={story.id}>
          <StoryCard story={story} isActive={index === activeSlide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
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
  
  // const handleRankUpdate = (updatedStory) => {
  //   setStories(stories.map(story => story.id === updatedStory.id ? updatedStory : story));
  // };

  const handleRankUpdate = (updatedStory) => {
    setStories(prevStories => 
      prevStories.map(story => 
        story._id === updatedStory._id ? updatedStory : story
      )
    );
  };

  const updateStories = () => {
    fetch('http://localhost:3000/stories')
    .then(response => response.json())
    .then(data => {
      setStories(data.map(story => ({
        ...story,
        id: story._id,
        city: 'Temporary City', // Update as needed
        image: 'placeholderImage.png' // Update as needed
      })));
    })
    .catch(error => console.error('Error fetching stories:', error));
  };
  

  useEffect(() => {
    fetch('http://localhost:3000/stories')
    .then(response => response.json())
    .then(data => {
      const formattedStories = data.map(story => ({
        ...story,
        id: story._id, // Map _id to id
        city: 'Temporary City', // Placeholder until your API is updated
        image: 'image1.png' // Placeholder image
      }));
      setStories(formattedStories);
    })
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
      breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        500: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        700: {
          slidesPerView: 4,
          spaceBetween: 30
        },
        900: {
          slidesPerView: 5,
          spaceBetween: 30
        },
        1200: {
          slidesPerView: 6,
          spaceBetween: 30
        },
        1400: {
          slidesPerView: 7,
          spaceBetween: 30
        },
        1600: {
          slidesPerView: 8,
          spaceBetween: 30
        }
      }}
    >
      {stories.map((story, index) => (
        <SwiperSlide key={story.id}>
          <StoryCard story={story} isActive={index === activeSlide} onRankUpdate={handleRankUpdate} onUpdateStories={updateStories} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;

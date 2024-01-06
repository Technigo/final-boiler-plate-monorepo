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
        city: story.city,
        image: story.image
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
        id: story._id, 
        city: story.city, 
        image: story.image 
      }));
      setStories(formattedStories);
    })
    .catch(error => console.error('Error fetching stories:', error));
  }, []);

  // Filter stories on category
  const rumorStories = stories.filter(story => story.category === 'rumor');
const hearsayStories = stories.filter(story => story.category === 'hearsay');
const historicalStories = stories.filter(story => story.category === 'historical');


  const onSlideChange = (swiper) => {
    setActiveSlide(swiper.realIndex); 

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
    <><Swiper
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
      {rumorStories.map((story, index) => (
        <SwiperSlide key={story.id}>
          <StoryCard story={story} isActive={index === activeSlide} onRankUpdate={handleRankUpdate} onUpdateStories={updateStories} />
        </SwiperSlide>
      ))}
    </Swiper><Swiper
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
        {hearsayStories.map((story, index) => (
          <SwiperSlide key={story.id}>
            <StoryCard story={story} isActive={index === activeSlide} onRankUpdate={handleRankUpdate} onUpdateStories={updateStories} />
          </SwiperSlide>
        ))}
      </Swiper><Swiper
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
        {historicalStories.map((story, index) => (
          <SwiperSlide key={story.id}>
            <StoryCard story={story} isActive={index === activeSlide} onRankUpdate={handleRankUpdate} onUpdateStories={updateStories} />
          </SwiperSlide>
        ))}
      </Swiper></>
  );
};

export default Carousel;

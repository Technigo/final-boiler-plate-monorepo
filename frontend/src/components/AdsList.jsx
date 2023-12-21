import { useEffect, useState } from 'react';
import { AdCard } from './AdCard';
import { adStore } from '../stores/adStore'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const AllAds = () => {
  const [ads, setAds] = useState([]);
  const getAllAds = adStore((state) => state.getAllAds);

  useEffect(() => {
    async function fetchAds() {
      await getAllAds();
      // Assuming the store updates the ads state after fetching
      const fetchedAds = adStore.getState().ads;
      setAds(fetchedAds);
    }
    fetchAds();
  }, [getAllAds]);

  // Example settings for the carousel
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
          initialSlide: 3
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 834,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 393,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <Slider {...settings}>
        {ads.map((ad) => (
          <AdCard key={ad._id} ad={ad} />
        ))}
      </Slider>
    </div>
  );
};

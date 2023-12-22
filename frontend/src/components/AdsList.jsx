import { useEffect, useState } from 'react';
import { AdCard } from './AdCard';
import { adStore } from '../stores/adStore';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const AdsList = ({ fetchType }) => {
  const [ads, setAds] = useState([]);
  const getAllAds = adStore((state) => state.getAllAds);
  const fetchAds = adStore((state) => state.fetchAds);

  useEffect(() => {
    async function fetchData() {
      if (fetchType === 'all') {
        await getAllAds();
      } else {
        await fetchAds();
      }
      const fetchedAds = adStore.getState().ads;
      setAds(fetchedAds);
    }
    fetchData();
  }, [getAllAds, fetchAds, fetchType]); // Add fetchType to dependency array

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

//THIS IS HOW TO USE IT IN YOUR PAGE/COMPONENT
// To fetch all ads
//<AdsList fetchType="all" />

// To fetch user-specific ads
//<AdsList fetchType="user" />
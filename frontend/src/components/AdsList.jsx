import { useEffect, useState } from 'react';
import { AdCard } from './AdCard';
import { adStore } from '../stores/adStore';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./adslist.css";

export const AdsList = ({ fetchType, userId }) => {
  const [ads, setAds] = useState([]);
  const getAllAds = adStore((state) => state.getAllAds);
  const fetchAds = adStore((state) => state.fetchAds);
  const fetchAdsByUserId = adStore((state) => state.fetchAdsByUserId);

  useEffect(() => {
    async function fetchData() {
      if (fetchType === "all") {
        await getAllAds();
      } else if (fetchType === "user" && !userId) {
        await fetchAds();
      } else if (fetchType === "user" && userId) {
        await fetchAdsByUserId(userId);
      }
      const fetchedAds = adStore.getState().ads;
      setAds(fetchedAds);
    }
    fetchData();
  }, [getAllAds, fetchAds, fetchAdsByUserId, fetchType, userId]); // Add fetchType to dependency array

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
    <>
      {fetchType === "all" ? (
        // Display all ads in a carousel
        <div className="ads-outer-wrapper">
          <Slider {...settings}>
            {ads.map((ad) => (
              <div className="ads-inner-wrapper" key={ad._id}>
                <AdCard ad={ad} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        // Display user-specific ads (either logged-in user or a specific user)
        <div className="ads-outer-wrapper">
          {ads.length === 0 ? (
            // No ads found message
            <p>{userId ? "This user doesn't have any ads." : "You don't have any ads."}</p>
          ) : (
            ads.length > 0 && ads.length < 4 ? (
              // If the users have fewer than 4 ads, render them in a row
              <div className="ads-outer-wrapper-user">
                {ads.map((ad) => (
                  <div className="ads-inner-wrapper" key={ad._id}>
                    <AdCard ad={ad} />
                  </div>
                ))}
              </div>
            ) : (
              // Display user's ads in carousel if user has four or more ads
              <div className="ads-outer-wrapper">
                <Slider {...settings}>
                  {ads.map((ad) => (
                    <div className="ads-inner-wrapper" key={ad._id}>
                      <AdCard ad={ad} />
                    </div>
                  ))}
                </Slider>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
  
};

//THIS IS HOW TO USE IT IN YOUR PAGE/COMPONENT
// Usage examples:
// <AdsList fetchType="all" />  // For all ads
// <AdsList fetchType="user" />  // For the logged-in user's ads
// <AdsList fetchType="user" userId="specificUserId" />  // For a specific user's ads

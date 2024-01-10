import { useEffect, useState } from "react";
import { AdCard } from "./AdCard";
import { adStore } from "../stores/adStore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./adslist.css";
import { Button } from "./reusableComponents/Button";

export const AdsList = ({ fetchType, userId, displayGrid = false, initialDisplayCount = 4, maxDisplayCount = 20 }) => {
  const [ads, setAds] = useState([]);
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const getAllAds = adStore((state) => state.getAllAds);
  const fetchAds = adStore((state) => state.fetchAds);
  const fetchAdsByUserId = adStore((state) => state.fetchAdsByUserId);

  const showMoreAds = () => {
    setDisplayCount(maxDisplayCount);
  };

  const showLessAds = () => {
    setDisplayCount(initialDisplayCount);
  };


  useEffect(() => {

    async function fetchData() {
      if (fetchType === "all") {
        await getAllAds();
      } else if (fetchType === "user" && !userId) {
        await fetchAds();
      } else if (fetchType === "user" && userId) {
        await fetchAdsByUserId(userId);
      }

      // Fetch the ads and sort them
      const fetchedAds = adStore.getState().ads;
      const sortedAds = fetchedAds.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAds(sortedAds.slice(0, maxDisplayCount)); // Only get the first 20
    }
    fetchData();
  }, [getAllAds, fetchAds, fetchAdsByUserId, fetchType, userId]);
  // Add fetchType to dependency array


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
          initialSlide: 3,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 834,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 393,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderAdsGrid = () => (
    <div className="ads-grid">
      {ads.slice(0, displayCount).map((ad) => (
        <div className="ads-grid-item" key={ad._id}>
          <AdCard ad={ad} />
        </div>
      ))}
    </div>
  );

  return (
    <>
      {fetchType === "all" ? (
        // Display all ads in a carousel
        <div className="ads-outer-wrapper">
          {displayGrid ? renderAdsGrid() : (
            <Slider {...settings}>
              {ads.map((ad, index) => (
                <div className={`ads-inner-wrapper ${index < displayCount ? '' : 'hidden'}`} key={ad._id}>
                  <AdCard ad={ad} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      ) : (
        // Display user-specific ads (either logged-in user or a specific user)
        <div className="ads-outer-wrapper">
          {ads.length === 0 ? (
            // No ads found message
            <p>
              {userId
                ? "This user doesn't have any ads."
                : "You don't have any ads."}
            </p>
          ) : ads.length > 0 && ads.length < 4 ? (
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
              {displayGrid ? renderAdsGrid() : (
                <Slider {...settings}>
                  {ads.map((ad) => (
                    <div className="ads-inner-wrapper" key={ad._id}>
                      <AdCard ad={ad} />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          )}
        </div>
      )}
      {ads.length > initialDisplayCount && (
        <Button
          label={displayCount === maxDisplayCount ? "Show Less" : "Show More"}
          onClick={displayCount === maxDisplayCount ? showLessAds : showMoreAds}
        />
      )}
    </>
  );
};

//THIS IS HOW TO USE IT IN YOUR PAGE/COMPONENT
// Usage examples:
// <AdsList fetchType="all" />  // For all ads
// <AdsList fetchType="user" />  // For the logged-in user's ads
// <AdsList fetchType="user" userId="specificUserId" />  // For a specific user's ads

//

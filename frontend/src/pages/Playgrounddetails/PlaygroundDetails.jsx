import "./playgrounddetails.css";
import { useLayoutEffect } from "react"; 
import { useParams } from "react-router-dom";
import usePlaygroundStore from "../../stores/usePlaygroundStore";
import { BackBtn } from "../../components/BackBtn";
import { Button } from "../../components/Button";
//import Like from "../../components/Like";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";


const PlaygroundDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { getPlaygroundDetails, playgroundDetails, isLiked, likePlayground } = usePlaygroundStore();
  const location = useLocation();



  // Retrieve the random image from the state passed by Link
  const randomImage = new URLSearchParams(location.search).get("randomImage");

  useLayoutEffect(() => {
    getPlaygroundDetails(id);
  }, [id, getPlaygroundDetails]);

  if (!playgroundDetails) {
    return <div>Loading...</div>;
  }

  return (
<div>
  <div className="playground-details-container">

    <BackBtn />
    <div>
      <h1>
        {playgroundDetails.name}
      </h1>
      <h3>
        {playgroundDetails.street}, {playgroundDetails.city} {playgroundDetails.postcode}
      </h3>
          {randomImage && 
            <img 
              src={decodeURIComponent(randomImage)} 
              alt={`Random Image for ${playgroundDetails.name}`} />
          }
      <p>
        {playgroundDetails.description}
      </p>

      <h2 className="playground-details-info-header">{t("PlaygroundDetails.playground-details-info-header")}</h2>
    </div>
        
        

    <div className="icon-container ">
      <p>
        {playgroundDetails.wheelchair !== null ? (
          <>
            {playgroundDetails.wheelchair === 'yes' ? (
              <>
                <img 
                  className="available playground-icon" 
                  src="/Icons/Black/icons8-wheelchair-50 (1).png" 
                  alt="Wheelchair accessible" />
              </>
              ) : (
              <>
                <img 
                  className="not-available playground-icon" 
                  src="/Icons/White/icons8-wheelchair-50.png" 
                  alt="Not wheelchair accessible" />
              </>
            )}
          </>
            ) : (
          <>
            <img 
              className="not-available playground-icon" 
              src="/Icons/White/icons8-wheelchair-50.png" 
              alt="Not wheelchair accessible" /> 
          </>
        )}
      </p>

      <p>
        {playgroundDetails.roundabout && (
          <>
            {playgroundDetails.roundabout === 'true' ? (
              <>
                <img 
                  className="available playground-icon" 
                  src="/Icons/Black/icons8-carousel-50-B.png" 
                  alt="Carousel" />
              </>
                ) : (
              <>
                <img 
                  className="not-available playground-icon" 
                  src="/Icons/White/icons8-carousel-50.png" 
                  alt="No Carousel" /> 
              </>
            )}
          </>
            )}
      </p>

      <p>
        {playgroundDetails.zipwire && (
          <>
            {playgroundDetails.zipwire === 'true' ? (
              <>
                <img 
                  className="available playground-icon" 
                  src="/Icons/Black/icons8-zipline-50 (1).png" 
                  alt="Zipwire" /> 
              </>
                ) : (
              <>
                <img 
                  className="not-available playground-icon" 
                  src="/Icons/White/icons8-zipline-50.png" 
                  alt="No Zipwire" /> 
              </>
            )}
          </>
            )}
      </p>

      <p>
        {playgroundDetails.swing && (
          <>
            {playgroundDetails.swing === 'true' ? (
              <>
                <img 
                  className="available playground-icon" 
                  src="/Icons/Black/icons8-swing-50.png" 
                  alt="Swing" />
                </>
                ) : (
                <>
                <img 
                  className="not-available playground-icon" 
                  src="/Icons/White/icons8-swing-50 (1).png" 
                  alt="No Swing" /> 
                </>
            )}
              </>
            )}
      </p>

      <p>
        {playgroundDetails.slide && (
          <>
            {playgroundDetails.slide === 'true' ? (
              <>
                <img 
                  className="available playground-icon" 
                  src="/Icons/Black/icons8-slide-60.png" 
                  alt="Slide" />
              </>
                ) : (
              <>
                <img 
                  className="not-available playground-icon" 
                  src="/Icons/White/icons8-slide-60 (1).png" 
                  alt="No Slide" /> 
              </>
            )}
          </>
            )}
      </p>

      <p>
        {playgroundDetails.sandpit !== null ? (
              <>
                {playgroundDetails.sandpit === 'true' ? (
                  <>
                    <img 
                      className="available playground-icon" 
                      src="/Icons/Black/icons8-sandpit-50 (1).png" 
                      alt="Sandpit" /> 
                  </>
                  ) : (
                  <>
                    <img 
                      className="not-available playground-icon" 
                      src="/Icons/White/icons8-sandpit-50.png" 
                      alt="No sandpit" /> 
                  </>
                  )}
                  </>
                  ) : (
                  <>
                    <img 
                    className="not-available playground-icon" 
                    src="/Icons/White/icons8-sandpit-50.png" 
                    alt="No sandpit" />
                  </>
        )}
      </p>
    </div>
      
    <div>
      {/* <Like /> */}

      <Button 
        className={"like-button"} 
        handleOnClick={likePlayground} 
        btnText={"♡"} 
        />

      {/* <button 
        onClick={likePlayground}>
        Like Playground
      </button> */}

      {/* <span>
        {isLiked ? 'Liked!' : 'Not liked yet'}
      </span> */}
    </div>
  </div>
  <div>
    <p className="icon-explanation">{t("PlaygroundDetails.icon-explanation")} </p>
  </div>
</div>
  );
};

export default PlaygroundDetails;
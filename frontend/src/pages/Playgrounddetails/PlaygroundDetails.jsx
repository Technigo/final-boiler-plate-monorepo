/* eslint-disable no-unused-vars */
import "./playgrounddetails.css";
import { useLayoutEffect } from "react"; 
import { useParams } from "react-router-dom";
import usePlaygroundStore from "../../stores/usePlaygroundStore";
import { BackBtn } from "../../components/BackBtn";
// import { Button } from "../../components/Button";
//import Like from "../../components/Like";
import { useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { useTranslation } from "react-i18next";
import { Tooltip } from 'react-tooltip'


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
    return <div> <Loader /> </div>;
  }

  return (
<div>
  <div className="playground-details-container">

    {/* <BackBtn /> */}
    <div>
      <h1>
        {playgroundDetails.name}
      </h1>
      
          {randomImage && 
            <img 
            className="details-img"
              src={decodeURIComponent(randomImage)} 
              alt={`Random Image for ${playgroundDetails.name}`} />
          }

          <h3> 📍 
        {playgroundDetails.street}, {playgroundDetails.city} {playgroundDetails.postcode}
      </h3>
      <p>
        {playgroundDetails.description}
      </p>

      {/* <h2 className="playground-details-info-header">{t("PlaygroundDetails.playground-details-info-header")}</h2> */}
    </div>
        
        

    <div className="icon-container ">
      <p>
        {playgroundDetails.wheelchair !== null ? (
          <>
            {playgroundDetails.wheelchair === 'yes' ? (
              <>
                <img 
                data-tooltip-id="wheelchair"
                  data-tooltip-content={t("PlaygroundDetails.wheelchair-explanation-p")}
                  className="available playground-icon" 
                  src="/Icons/Black/icons8-wheelchair-50 (1).png" 
                  alt="Wheelchair accessible" />
              </>
              ) : (
              <>
                <img 
                data-tooltip-id="wheelchair"
                data-tooltip-content={t("PlaygroundDetails.wheelchair-explanation-p")}
                  className="not-available playground-icon" 
                  src="/Icons/White/icons8-wheelchair-50.png" 
                  alt="Not wheelchair accessible" />
              </>
            )}
          </>
            ) : (
          <>
            <img 
            data-tooltip-id="wheelchair"
                data-tooltip-content={t("PlaygroundDetails.wheelchair-explanation-p")}
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
                data-tooltip-id="roundabout"
                data-tooltip-content={t("PlaygroundDetails.roundabout-explanation-p")}
                  className="available playground-icon" 
                  src="/Icons/Black/icons8-carousel-50-B.png" 
                  alt="Carousel" />
              </>
                ) : (
              <>
                <img 
                data-tooltip-id="roundabout"
                data-tooltip-content={t("PlaygroundDetails.roundabout-explanation-p")}
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
                data-tooltip-id="zipwire"
                data-tooltip-content={t("PlaygroundDetails.zipwire-explanation-p")}
                  className="available playground-icon" 
                  src="/Icons/Black/icons8-zipline-50 (1).png" 
                  alt="Zipwire" /> 
              </>
                ) : (
              <>
                <img 
                 data-tooltip-id="zipwire"
                data-tooltip-content={t("PlaygroundDetails.zipwire-explanation-p")}
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
                 data-tooltip-id="swing"
                data-tooltip-content={t("PlaygroundDetails.swing-explanation-p")}
                  className="available playground-icon" 
                  src="/Icons/Black/icons8-swing-50.png" 
                  alt="Swing" />
                </>
                ) : (
                <>
                <img 
                data-tooltip-id="swing"
                data-tooltip-content={t("PlaygroundDetails.swing-explanation-p")}
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
                data-tooltip-id="slide"
                data-tooltip-content={t("PlaygroundDetails.slide-explanation-p")}
                  className="available playground-icon" 
                  src="/Icons/Black/icons8-slide-60.png" 
                  alt="Slide" />
              </>
                ) : (
              <>
                <img 
                data-tooltip-id="slide"
                data-tooltip-content={t("PlaygroundDetails.slide-explanation-p")}
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
                    data-tooltip-id="sandpit"
                    data-tooltip-content={t("PlaygroundDetails.sandpit-explanation-p")}
                      className="available playground-icon" 
                      src="/Icons/Black/icons8-sandpit-50 (1).png" 
                      alt="Sandpit" /> 
                  </>
                  ) : (
                  <>
                    <img 
                    data-tooltip-id="sandpit"
                data-tooltip-content={t("PlaygroundDetails.sandpit-explanation-p")}
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

    {/* <Button 
    className={isLiked ? "like-button clicked" : "like-button"} 
    handleOnClick={likePlayground} 
    btnText={"♡"} 
    /> */}

     
    </div>
  </div>
  {/* <div>
    <p className="icon-explanation">{t("PlaygroundDetails.icon-explanation")} </p>
    
<div className="icon-explanation-box">
    <div className="wheelchair-explanation">
    <img className="available playground-icon" src="/Icons/Black/icons8-wheelchair-50 (1).png" alt="Wheelchair accessible" /><p className="wheelchair-explanation-p">{t("PlaygroundDetails.wheelchair-explanation-p")}</p>          
    </div>
    <div className="roundabout-explanation">
    <img className="available playground-icon" src="/Icons/Black/icons8-carousel-50-B.png" alt="Roundabout" /><p className="roundabout-explanation-p">{t("PlaygroundDetails.roundabout-explanation-p")}</p>          
    </div>
    <div className="zipwire-explanation">
    <img className="available playground-icon" src="/Icons/Black/icons8-zipline-50 (1).png" alt="Zipwire" /> <p className="zipwire-explanation-p">{t("PlaygroundDetails.zipwire-explanation-p")}</p>          
    </div>
    <div className="swing-explanation">
    <img className="available playground-icon" src="/Icons/Black/icons8-swing-50.png" alt="Swing" /> <p className="swing-explanation-p">{t("PlaygroundDetails.swing-explanation-p")}</p>          
    </div>
    <div className="slide-explanation">
    <img className="available playground-icon" src="/Icons/Black/icons8-slide-60.png" alt="Slide" /> <p className="slide-explanation-p">{t("PlaygroundDetails.slide-explanation-p")}</p>           
    </div>
    <div className="sandpit-explanation">
    <img className="available playground-icon" src="/Icons/Black/icons8-sandpit-50 (1).png" alt="Sandpit" /> <p className="sandpit-explanation-p">{t("PlaygroundDetails.sandpit-explanation-p")}</p>       
    </div>
</div>

  </div> */}
 <Tooltip
        id="wheelchair"
        place="bottom"
        content={t("PlaygroundDetails.wheelchair-explanation-p")}
        style={{ backgroundColor: "#FA7070", color: "black" }}
      />
      <Tooltip
        id="roundabout"
        place="bottom"
        content={t("PlaygroundDetails.roundabout-explanation-p")}
         style={{ backgroundColor: "#FA7070", color: "black" }}
      />
      <Tooltip
        id="zipwire"
        place="bottom"
        content={t("PlaygroundDetails.zipwire-explanation-p")}
         style={{ backgroundColor: "#FA7070", color: "black" }}
      />
      <Tooltip
        id="swing"
        place="bottom"
        content={t("PlaygroundDetails.swing-explanation-p")}
         style={{ backgroundColor: "#FA7070", color: "black" }}
      />
      <Tooltip
        id="slide"
        place="bottom"
        content={t("PlaygroundDetails.slide-explanation-p")}
         style={{ backgroundColor: "#FA7070", color: "black" }}
      />
      <Tooltip
        id="sandpit"
        place="bottom"
        content={t("PlaygroundDetails.sandpit-explanation-p")}
         style={{ backgroundColor: "#FA7070", color: "black" }}
      />

</div>
  );
};

export default PlaygroundDetails;
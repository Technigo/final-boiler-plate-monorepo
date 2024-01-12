/* eslint-disable no-unused-vars */
import "./playgrounddetails.css";
import { useLayoutEffect } from "react"; 
import { useParams } from "react-router-dom";
import usePlaygroundStore from "../../stores/usePlaygroundStore";
import { useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { useTranslation } from "react-i18next";
import { Tooltip } from 'react-tooltip'




const PlaygroundDetails = () => {
  
  const { t } = useTranslation();
  const { id } = useParams();
  const { getPlaygroundDetails, playgroundDetails } = usePlaygroundStore();
  const location = useLocation();

  // Extracting 'randomImage' parameter from the URL search query
  const randomImage = new URLSearchParams(location.search).get("randomImage");

  // Effect hook to fetch playground details when 'id' changes
  useLayoutEffect(() => {
    getPlaygroundDetails(id);
  }, [id, getPlaygroundDetails]);

  if (!playgroundDetails) {
    return <div> <Loader /> </div>;
  }

  // Function to render individual playground icons
  const renderIcon = (type, label) => {
    // Checking if the feature is available (either 'true' or 'yes')
    const isAvailable = playgroundDetails[type] === 'true' || playgroundDetails[type] === 'yes';

    return (
      <p key={type}>
        <img
          // Setting data attributes for tooltip and translation
          data-tooltip-id={type}
          data-tooltip-content={t(`PlaygroundDetails.${type}-explanation-p`)}
          // Dynamically setting class based on availability
          className={`${isAvailable ? 'available' : 'not-available'} playground-icon`}
          // Dynamically setting image source based on availability and color
          src={`/Icons/${isAvailable ? 'Black' : 'White'}/icons8-${label}-50.png`}
          alt={label}
        />
      </p>
    );
  };

  return (
    <div>
      <div className="playground-details-container">
        <div>
          <h1>{playgroundDetails.name}</h1>
          {/* Rendering random image if available */}
          {randomImage && <img className="details-img" src={decodeURIComponent(randomImage)} alt={`Random Image for ${playgroundDetails.name}`} />}
          <h3>📍 {playgroundDetails.street}, {playgroundDetails.city} {playgroundDetails.postcode}</h3>
          <p>{playgroundDetails.description}</p>
        </div>

        <div className="icon-container">
          {/* Rendering each playground icon using the renderIcon function */}
          {renderIcon('wheelchair', 'wheelchair')}
          {renderIcon('roundabout', 'carousel')}
          {renderIcon('zipwire', 'zipline')}
          {renderIcon('swing', 'swing')}
          {renderIcon('slide', 'slide')}
          {renderIcon('sandpit', 'sandpit')}
        </div>
      </div>

      {/* Mapping over an array of feature types to render corresponding tooltips */}
      {['wheelchair', 'roundabout', 'zipwire', 'swing', 'slide', 'sandpit'].map(type => (
        <Tooltip
          key={type}
          id={type}
          place="bottom"
          content={t(`PlaygroundDetails.${type}-explanation-p`)}
          style={{ backgroundColor: "#FA7070", color: "black" }}
        />
      ))}
    </div>
  );
};

// Exporting the PlaygroundDetails component as the default export
export default PlaygroundDetails;



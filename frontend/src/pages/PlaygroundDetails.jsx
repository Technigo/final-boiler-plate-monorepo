import "./playgrounddetails.css"
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import usePlaygroundStore from "../stores/usePlaygroundStore";
import { BackBtn } from "../components/BackBtn";

const PlaygroundDetails = () => {
  const { id } = useParams(); // Get the 'id' parameter from the route
  const { getPlaygroundDetails, playgroundDetails } = usePlaygroundStore();

  useEffect(() => {
    getPlaygroundDetails(id);
  }, [id, getPlaygroundDetails]); // Fetch playground details when the 'id' changes or when the getPlaygroundDetails function changes

  if (!playgroundDetails) {
    // You might want to handle the case when details are still loading
    return <div>Loading...</div>;
  }

  return (
    <div>
        <BackBtn />
    <div className="playground-details-container">
      <h2>{playgroundDetails.name}</h2>
      <h3>{playgroundDetails.city}, {playgroundDetails.postcode}, {playgroundDetails.street}</h3>
      <p>{playgroundDetails.description}</p>

      <h2>Vad finns på lekplatsen:</h2>
      <p>Wheelchair: {playgroundDetails.wheelchair}</p>
      <p>Roundabout:{playgroundDetails.roundabout}</p>
      <p>Zipwire:{playgroundDetails.zipwire}</p>
      <p>Swing:{playgroundDetails.swing}</p>
      <p>Basketswing:{playgroundDetails.basketswing}</p>
      <p>Sandpit:{playgroundDetails.sandpit}</p>
      {/* Add other details you want to display */}
    </div>
    </div>
  );
};

export default PlaygroundDetails;
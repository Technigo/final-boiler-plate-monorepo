import "./playgrounddetails.css";
import { useLayoutEffect } from "react"; // Import useLayoutEffect
import { useParams } from "react-router-dom";
import usePlaygroundStore from "../../stores/usePlaygroundStore";
import { BackBtn } from "../../components/BackBtn";
import Like from "../../components/Like";

const PlaygroundDetails = () => {
  const { id } = useParams();
  const { getPlaygroundDetails, playgroundDetails, isLiked, likePlayground } = usePlaygroundStore();

  useLayoutEffect(() => { // Replace useEffect with useLayoutEffect
    getPlaygroundDetails(id);
  }, [id, getPlaygroundDetails]);

  if (!playgroundDetails) {
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

        <div>
          <Like />
          <span>{isLiked ? 'Liked!' : 'Not liked yet'}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundDetails;

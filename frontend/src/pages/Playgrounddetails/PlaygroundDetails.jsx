import "./playgrounddetails.css";
import { useLayoutEffect } from "react"; 
import { useParams } from "react-router-dom";
import usePlaygroundStore from "../../stores/usePlaygroundStore";
import { BackBtn } from "../../components/BackBtn";
//import Like from "../../components/Like";

//Import of icons
import { FaWheelchair } from "react-icons/fa";
import { PiWheelchairThin } from "react-icons/pi";


const PlaygroundDetails = () => {
  const { id } = useParams();
  const { getPlaygroundDetails, playgroundDetails, isLiked, likePlayground } = usePlaygroundStore();

  useLayoutEffect(() => {
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
        
        <p>
          {playgroundDetails.wheelchair === 'yes' ? (
            <>
              <FaWheelchair /> {playgroundDetails.wheelchair}
            </>
          ) : (
            <>
              <PiWheelchairThin /> {playgroundDetails.wheelchair}
            </>
          )}
        </p>

        <p>
          {playgroundDetails.roundabout === 'true' ? (
            <>
              <img src="./playgroundIcons/black/icons8-carousel-50-B.png" alt="" /> {playgroundDetails.roundabout}
            </>
          ) : (
            <>
              <img src="./playgroundIcons/white/icons8-carousel-50.png" alt="" /> {playgroundDetails.roundabout}
            </>
          )}
        </p>


        <p className={playgroundDetails.roundabout === 'true' ? 'highlight' : ''}>Roundabout: {playgroundDetails.roundabout}</p>
        <p className={playgroundDetails.zipwire === 'true' ? 'highlight' : ''}>Zipwire: {playgroundDetails.zipwire}</p>
        <p className={playgroundDetails.swing === 'true' ? 'highlight' : ''}>Swing: {playgroundDetails.swing}</p>
        <p className={playgroundDetails.basketswing === 'true' ? 'highlight' : ''}>Basketswing: {playgroundDetails.basketswing}</p>
        <p className={playgroundDetails.sandpit === 'true' ? 'highlight' : ''}>Sandpit: {playgroundDetails.sandpit}</p>


        <div>
          {/* <Like /> */}
          <button onClick={likePlayground}>Like Playground</button>
          <span>{isLiked ? 'Liked!' : 'Not liked yet'}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundDetails;



// const PlaygroundDetails = () => {
//   const { id } = useParams();
//   const { getPlaygroundDetails, playgroundDetails, isLiked, likePlayground } = usePlaygroundStore();

//   useLayoutEffect(() => { // Replace useEffect with useLayoutEffect
//     getPlaygroundDetails(id);
//   }, [id, getPlaygroundDetails]);

//   if (!playgroundDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <BackBtn />
//       <div className="playground-details-container">
//         <h2>{playgroundDetails.name}</h2>
//         <h3>{playgroundDetails.city}, {playgroundDetails.postcode}, {playgroundDetails.street}</h3>
//         <p>{playgroundDetails.description}</p>

//         <h2>Vad finns på lekplatsen:</h2>
//         <p>Wheelchair: {playgroundDetails.wheelchair}</p>
//         <p>Roundabout:{playgroundDetails.roundabout}</p>
//         <p>Zipwire:{playgroundDetails.zipwire}</p>
//         <p>Swing:{playgroundDetails.swing}</p>
//         <p>Basketswing:{playgroundDetails.basketswing}</p>
//         <p>Sandpit:{playgroundDetails.sandpit}</p>

//         <div>
//           <Like />
//           <span>{isLiked ? 'Liked!' : 'Not liked yet'}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaygroundDetails;

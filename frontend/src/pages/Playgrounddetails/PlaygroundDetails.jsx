import "./playgrounddetails.css";
import { useLayoutEffect } from "react"; 
import { useParams } from "react-router-dom";
import usePlaygroundStore from "../../stores/usePlaygroundStore";
import { BackBtn } from "../../components/BackBtn";
//import Like from "../../components/Like";
import { useLocation } from "react-router-dom";


const PlaygroundDetails = () => {
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
      <BackBtn />
      <div className="playground-details-container">
        <h2>{playgroundDetails.name}</h2>
        <h3>{playgroundDetails.city}, {playgroundDetails.postcode}, {playgroundDetails.street}</h3>
        {randomImage && <img src={decodeURIComponent(randomImage)} alt={`Random Image for ${playgroundDetails.name}`} />}
        <p>{playgroundDetails.description}</p>

        <h2>Vad finns på lekplatsen:</h2>
        
        
<div className="icon-container">
        <p>
  {playgroundDetails.wheelchair !== null ? (
    <>
      {playgroundDetails.wheelchair === 'yes' ? (
        <>
          <img src="/Icons/Black/icons8-wheelchair-50 (1).png" alt="Wheelchair accessible" /> 
        </>
      ) : (
        <>
          <img src="/Icons/White/icons8-wheelchair-50.png" alt="Not wheelchair accessible" /> 
        </>
      )}
    </>
  ) : (
    <>
      <img src="/Icons/White/icons8-wheelchair-50.png" alt="Not wheelchair accessible" /> 
    </>
  )}
</p>


        <p>
          {playgroundDetails.roundabout && (
            <>
          {playgroundDetails.roundabout === 'true' ? (
            <>
          <img src="/Icons/Black/icons8-carousel-50-B.png" alt="Carousel" /> 
           </>
          ) : (
           <>
          <img src="/Icons/White/icons8-carousel-50.png" alt="No Carousel" /> 
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
          <img src="/Icons/Black/icons8-zipline-50 (1).png" alt="Zipwire" /> 
           </>
          ) : (
           <>
          <img src="/Icons/White/icons8-zipline-50.png" alt="No Zipwire" /> 
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
          <img src="/Icons/Black/icons8-swing-50.png" alt="Swing" /> 
           </>
          ) : (
           <>
          <img src="/Icons/White/icons8-swing-50 (1).png" alt="No Swing" /> 
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
          <img src="/Icons/Black/icons8-slide-60.png" alt="Slide" /> 
           </>
          ) : (
           <>
          <img src="/Icons/White/icons8-slide-60 (1).png" alt="No Slide" /> 
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
          <img src="/Icons/Black/icons8-sandpit-50 (1).png" alt="Sandpit" /> 
        </>
      ) : (
        <>
          <img src="/Icons/White/icons8-sandpit-50.png" alt="No sandpit" /> 
        </>
      )}
    </>
  ) : (
    <>
      <img src="/Icons/White/icons8-sandpit-50.png" alt="No sandpit" /> 
    </>
  )}
</p>
</div>
      
        
      
       


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

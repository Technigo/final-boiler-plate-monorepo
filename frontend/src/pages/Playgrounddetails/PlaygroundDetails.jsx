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
        <h1>{playgroundDetails.name}</h1>
        <h3>{playgroundDetails.street}, {playgroundDetails.city} {playgroundDetails.postcode}</h3>
        {randomImage && <img src={decodeURIComponent(randomImage)} alt={`Random Image for ${playgroundDetails.name}`} />}
        <p>{playgroundDetails.description}</p>

        <h2>Information om lekplatsen:</h2>
        
        
<div className="icon-container">
        <p>
  {playgroundDetails.wheelchair !== null ? (
    <>
      {playgroundDetails.wheelchair === 'yes' ? (
        <>
          <img src="/Icons/Black/icons8-wheelchair-50 (1).png" alt="Wheelchair accessible" /> - Rullstolsanpassad
        </>
      ) : (
        <>
          <img src="/Icons/White/icons8-wheelchair-50.png" alt="Not wheelchair accessible" /> - Inte rullstolsanpassad
        </>
      )}
    </>
  ) : (
    <>
      <img src="/Icons/White/icons8-wheelchair-50.png" alt="Not wheelchair accessible" /> - Inte rullstolsanpassad
    </>
  )}
</p>


        <p>
          {playgroundDetails.roundabout && (
            <>
          {playgroundDetails.roundabout === 'true' ? (
            <>
          <img src="/Icons/Black/icons8-carousel-50-B.png" alt="Carousel" /> - Karusell
           </>
          ) : (
           <>
          <img src="/Icons/White/icons8-carousel-50.png" alt="No Carousel" /> - Finns ingen karusell
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
          <img src="/Icons/Black/icons8-zipline-50 (1).png" alt="Zipwire" /> - Linbana
           </>
          ) : (
           <>
          <img src="/Icons/White/icons8-zipline-50.png" alt="No Zipwire" /> - Finns ej linbana
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
          <img src="/Icons/Black/icons8-swing-50.png" alt="Swing" /> - Gungor
           </>
          ) : (
           <>
          <img src="/Icons/White/icons8-swing-50 (1).png" alt="No Swing" /> - Finns ej gungor
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
          <img src="/Icons/Black/icons8-slide-60.png" alt="Slide" /> - Rutschkana
           </>
          ) : (
           <>
          <img src="/Icons/White/icons8-slide-60 (1).png" alt="No Slide" /> Finns ej rutschkana
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
          <img src="/Icons/Black/icons8-sandpit-50 (1).png" alt="Sandpit" /> - Sandlåda
        </>
      ) : (
        <>
          <img src="/Icons/White/icons8-sandpit-50.png" alt="No sandpit" /> - Finns ej sandlåda
        </>
      )}
    </>
  ) : (
    <>
      <img src="/Icons/White/icons8-sandpit-50.png" alt="No sandpit" /> - Finns ej sandlåda
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

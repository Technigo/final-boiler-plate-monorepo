/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */

import { useState, useCallback } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import { memo } from "react";
import "./Map.css";

const libraries = ["places"];

export const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 62.7507414,
    lng: 15.422574800000007,
  });
  const [autocomplete, setAutocomplete] = useState(null);

  const onMapClick = useCallback((event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      comment: "",
    };
    setMarkers((current) => [...current, newMarker]);
  }, []);

  const onMarkerClick = useCallback((marker) => {
    setSelectedMarker(marker);
  }, []);

  const handleCommentChange = (event) => {
    setSelectedMarker({ ...selectedMarker, comment: event.target.value });
  };

  const handleCommentSubmit = () => {
    setMarkers((current) =>
      current.map((m) => (m === selectedMarker ? selectedMarker : m))
    );
    setSelectedMarker(null);
  };

  const onLoadAutocomplete = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setMapCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}>
      <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
        <input type="text" placeholder="Search location" />
      </Autocomplete>
      <GoogleMap
        mapContainerClassName="my-map-container"
        center={mapCenter}
        zoom={4}
        onClick={onMapClick}
        options={{ styles: styles.retro }}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => onMarkerClick(marker)}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}>
            <div>
              <textarea
                value={selectedMarker.comment}
                onChange={handleCommentChange}
                placeholder="Enter your comment here"
              />
              <button onClick={handleCommentSubmit}>Submit</button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default memo(Map);

// import {
//   LoadScript,
//   Marker,
//   GoogleMap,
//   InfoWindow,
//   Autocomplete
// } from "@react-google-maps/api";
// import { useState, useCallback } from "react";
// import { memo } from "react";
// import "./Map.css";

// const center = {
//   lat: 62.7507414,
//   lng: 15.422574800000007,
// };

// const styles = {
//   retro: [
//     { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
//     { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
//     {
//       elementType: "labels.text.stroke",
//       stylers: [{ color: "#f5f1e6" }],
//     },
//     {
//       featureType: "administrative",
//       elementType: "geometry.stroke",
//       stylers: [{ color: "#c9b2a6" }],
//     },
//     {
//       featureType: "administrative.land_parcel",
//       elementType: "geometry.stroke",
//       stylers: [{ color: "#dcd2be" }],
//     },
//     {
//       featureType: "administrative.land_parcel",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#ae9e90" }],
//     },
//     {
//       featureType: "landscape.natural",
//       elementType: "geometry",
//       stylers: [{ color: "#dfd2ae" }],
//     },
//     {
//       featureType: "poi",
//       elementType: "geometry",
//       stylers: [{ color: "#dfd2ae" }],
//     },
//     {
//       featureType: "poi",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#93817c" }],
//     },
//     {
//       featureType: "poi.park",
//       elementType: "geometry.fill",
//       stylers: [{ color: "#a5b076" }],
//     },
//     {
//       featureType: "poi.park",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#447530" }],
//     },
//     {
//       featureType: "road",
//       elementType: "geometry",
//       stylers: [{ color: "#f5f1e6" }],
//     },
//     {
//       featureType: "road.arterial",
//       elementType: "geometry",
//       stylers: [{ color: "#fdfcf8" }],
//     },
//     {
//       featureType: "road.highway",
//       elementType: "geometry",
//       stylers: [{ color: "#f8c967" }],
//     },
//     {
//       featureType: "road.highway",
//       elementType: "geometry.stroke",
//       stylers: [{ color: "#e9bc62" }],
//     },
//     {
//       featureType: "road.highway.controlled_access",
//       elementType: "geometry",
//       stylers: [{ color: "#e98d58" }],
//     },
//     {
//       featureType: "road.highway.controlled_access",
//       elementType: "geometry.stroke",
//       stylers: [{ color: "#db8555" }],
//     },
//     {
//       featureType: "road.local",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#806b63" }],
//     },
//     {
//       featureType: "transit.line",
//       elementType: "geometry",
//       stylers: [{ color: "#dfd2ae" }],
//     },
//     {
//       featureType: "transit.line",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#8f7d77" }],
//     },
//     {
//       featureType: "transit.line",
//       elementType: "labels.text.stroke",
//       stylers: [{ color: "#ebe3cd" }],
//     },
//     {
//       featureType: "transit.station",
//       elementType: "geometry",
//       stylers: [{ color: "#dfd2ae" }],
//     },
//     {
//       featureType: "water",
//       elementType: "geometry.fill",
//       stylers: [{ color: "#b9d3c2" }],
//     },
//     {
//       featureType: "water",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#92998d" }],
//     },
//   ],
// };

// export const Map = () => {
//   const [markers, setMarkers] = useState([]);

//   const [selectedMarker, setSelectedMarker] = useState(null);

//   const onMapClick = (event) => {
//     const newMarker = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//       comment: "",
//     };
//     setMarkers((current) => [...current, newMarker]);
//   };

//   const onMarkerClick = (marker) => {
//     setSelectedMarker(marker);
//   };

//   const handleCommentChange = (event) => {
//     setSelectedMarker({ ...selectedMarker, comment: event.target.value });
//   };

//   const handleCommentSubmit = () => {
//     setMarkers((current) =>
//       current.map((m) => (m === selectedMarker ? selectedMarker : m))
//     );
//     setSelectedMarker(null);
//   };

//   return (
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap
//         mapContainerClassName="my-map-container"
//         center={center}
//         zoom={4}
//         onClick={onMapClick}
//         options={{ styles: styles.retro }}>
//         {markers.map((marker, index) => (
//           <Marker
//             key={index}
//             position={{ lat: marker.lat, lng: marker.lng }}
//             onClick={() => onMarkerClick(marker)}
//           />
//         ))}

//         {selectedMarker && (
//           <InfoWindow
//             position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
//             onCloseClick={() => setSelectedMarker(null)}>
//             <div>
//               <textarea
//                 value={selectedMarker.comment}
//                 onChange={handleCommentChange}
//                 placeholder="Enter your comment here"
//               />
//               <button onClick={handleCommentSubmit}>Submit</button>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default memo(Map);

// export const Map = () => {
//   return (
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap
//         mapContainerClassName="my-map-container"
//         center={center}
//         zoom={4}>
//         {/* Child components, like markers, info windows, etc. */}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default memo(Map);

// function initMap() {
//   // Create the map with the "retro" style specified.
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 62.7507414, lng: 15.422574800000007 },
//     zoom: 4,
//     mapTypeControl: false,
//     styles: styles.retro, // Apply the "retro" style directly
//   });
// }

// const styles = {
//   retro: [
//     { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
//     { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
//     {
//       elementType: "labels.text.stroke",
//       stylers: [{ color: "#f5f1e6" }],
//     },
//     {
//       featureType: "administrative",
//       elementType: "geometry.stroke",
//       stylers: [{ color: "#c9b2a6" }],
//     },
//     {
//       featureType: "administrative.land_parcel",
//       elementType: "geometry.stroke",
//       stylers: [{ color: "#dcd2be" }],
//     },
//     {
//       featureType: "administrative.land_parcel",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#ae9e90" }],
//     },
//     {
//       featureType: "landscape.natural",
//       elementType: "geometry",
//       stylers: [{ color: "#dfd2ae" }],
//     },
//     {
//       featureType: "poi",
//       elementType: "geometry",
//       stylers: [{ color: "#dfd2ae" }],
//     },
//     {
//       featureType: "poi",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#93817c" }],
//     },
//     {
//       featureType: "poi.park",
//       elementType: "geometry.fill",
//       stylers: [{ color: "#a5b076" }],
//     },
//     {
//       featureType: "poi.park",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#447530" }],
//     },
//     {
//       featureType: "road",
//       elementType: "geometry",
//       stylers: [{ color: "#f5f1e6" }],
//     },
//     {
//       featureType: "road.arterial",
//       elementType: "geometry",
//       stylers: [{ color: "#fdfcf8" }],
//     },
//     {
//       featureType: "road.highway",
//       elementType: "geometry",
//       stylers: [{ color: "#f8c967" }],
//     },
//     {
//       featureType: "road.highway",
//       elementType: "geometry.stroke",
//       stylers: [{ color: "#e9bc62" }],
//     },
//     {
//       featureType: "road.highway.controlled_access",
//       elementType: "geometry",
//       stylers: [{ color: "#e98d58" }],
//     },
//     {
//       featureType: "road.highway.controlled_access",
//       elementType: "geometry.stroke",
//       stylers: [{ color: "#db8555" }],
//     },
//     {
//       featureType: "road.local",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#806b63" }],
//     },
//     {
//       featureType: "transit.line",
//       elementType: "geometry",
//       stylers: [{ color: "#dfd2ae" }],
//     },
//     {
//       featureType: "transit.line",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#8f7d77" }],
//     },
//     {
//       featureType: "transit.line",
//       elementType: "labels.text.stroke",
//       stylers: [{ color: "#ebe3cd" }],
//     },
//     {
//       featureType: "transit.station",
//       elementType: "geometry",
//       stylers: [{ color: "#dfd2ae" }],
//     },
//     {
//       featureType: "water",
//       elementType: "geometry.fill",
//       stylers: [{ color: "#b9d3c2" }],
//     },
//     {
//       featureType: "water",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#92998d" }],
//     },
//   ],
// };

// window.initMap = initMap;

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */

import { useState, useCallback, memo, useEffect } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import markerIcon from "../../assets/marker.png";

import "./Map.css";

const libraries = ["places"];

const styles = {
  retro: [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#f5f1e6" }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#c9b2a6" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [{ color: "#dcd2be" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ae9e90" }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#93817c" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [{ color: "#a5b076" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#447530" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#f5f1e6" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#fdfcf8" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#f8c967" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#e9bc62" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [{ color: "#e98d58" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [{ color: "#db8555" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#806b63" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8f7d77" }],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ebe3cd" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#b9d3c2" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#92998d" }],
    },
  ],
};

export const Map = () => {
  const [map, setMap] = useState(null);
  // const [markers, setMarkers] = useState([]);
  const [stories, setStories] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 62.7507414,
    lng: 15.422574800000007,
  });
  const [autocomplete, setAutocomplete] = useState(null);
  const [customMarkerIcon, setCustomMarkerIcon] = useState(null);

  // Fetch stories when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/stories")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched stories:", data);
        console.log("Example story:", data[0]);
        const validStories = data.filter((story) => story.lat && story.lng); // Filter out stories without valid lat/lng
        setStories(validStories);
      })
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
    const customMarker = {
      url: markerIcon, // URL or path to your custom marker image
      scaledSize: new window.google.maps.Size(30, 30), // Width and height of your marker
    };
    setCustomMarkerIcon(customMarker);
  }, []);

  const markers = stories.map((story) => ({
    lat: Number(story.location.lat),
    lng: Number(story.location.lng),
    title: story.title,
    description: story.content,
    id: story._id,
  }));

  console.log("Markers:", markers);

  const onMarkerClick = useCallback((marker) => {
    setSelectedMarker(marker);
  }, []);

  const onLoadAutocomplete = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMapCenter(newCenter);
        if (map) {
          map.setZoom(14);
        }
      } else {
        console.error("Place has no geometry");
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}>
      <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
        {/* // types={["(cities)", "address"]} */}
        <input
          className="search-input"
          type="text"
          placeholder="Search location"
        />
      </Autocomplete>
      <GoogleMap
        onLoad={onMapLoad}
        mapContainerClassName="my-map-container"
        center={mapCenter}
        zoom={4}
        // onClick={onMapClick}
        options={{ styles: styles.retro, streetViewControl: false }}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => onMarkerClick(marker)}
            icon={customMarkerIcon}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}>
            <div>
              <h3>{selectedMarker.title}</h3>
              <p>{selectedMarker.description}</p>
              <a href={`/stories/${selectedMarker.id}`}>Follow the whisper</a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default memo(Map);

// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable no-undef */

// import { useState, useCallback, memo } from "react";
// import {
//   LoadScript,
//   GoogleMap,
//   Marker,
//   InfoWindow,
//   Autocomplete,
// } from "@react-google-maps/api";
// import markerIcon from "../../assets/marker.png";
// // import StoryList from "../StoryList/StoryList";
// import "./Map.css";

// const libraries = ["places"];

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

// export const Map = ({ stories = [] }) => {
//   const [map, setMap] = useState(null);
//   // const [markers, setMarkers] = useState([]);
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const [mapCenter, setMapCenter] = useState({
//     lat: 62.7507414,
//     lng: 15.422574800000007,
//   });
//   const [autocomplete, setAutocomplete] = useState(null);
//   const [customMarkerIcon, setCustomMarkerIcon] = useState(null);

//   const onMapLoad = useCallback((mapInstance) => {
//     setMap(mapInstance);
//     const customMarker = {
//       url: markerIcon, // URL or path to your custom marker image
//       scaledSize: new window.google.maps.Size(30, 30), // Width and height of your marker
//     };
//     setCustomMarkerIcon(customMarker);
//   }, []);

//   // const onMapClick = useCallback((event) => {
//   //   const newMarker = {
//   //     lat: event.latLng.lat(),
//   //     lng: event.latLng.lng(),
//   //     comment: "",
//   //   };
//   //   setMarkers((current) => [...current, newMarker]);
//   // }, []);

//   const markers = stories.map((story) => ({
//     lat: story.lat,
//     lng: story.lng,
//     title: story.title,
//     description: story.description,
//     id: story.id,
//   }));

//   const onMarkerClick = useCallback((marker) => {
//     setSelectedMarker(marker);
//   }, []);

//   const onLoadAutocomplete = (autocomplete) => {
//     setAutocomplete(autocomplete);
//   };

//   const onPlaceChanged = () => {
//     if (autocomplete !== null) {
//       const place = autocomplete.getPlace();
//       if (place.geometry && place.geometry.location) {
//         const newCenter = {
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//         };
//         setMapCenter(newCenter); // Update the map center state
//         if (map) {
//           map.setZoom(14); // Optionally set the zoom on the map instance directly
//         }
//       } else {
//         console.error("Place has no geometry");
//       }
//     }
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
//       libraries={libraries}>
//       <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
//         {/* // types={["(cities)", "address"]} */}
//         <input
//           className="search-input"
//           type="text"
//           placeholder="Search location"
//         />
//       </Autocomplete>
//       <GoogleMap
//         onLoad={onMapLoad}
//         mapContainerClassName="my-map-container"
//         center={mapCenter}
//         zoom={4}
//         // onClick={onMapClick}
//         options={{ styles: styles.retro, streetViewControl: false }}>
//         {markers.map((marker, index) => (
//           <Marker
//             key={index}
//             position={{ lat: marker.lat, lng: marker.lng }}
//             onClick={() => onMarkerClick(marker)}
//             icon={customMarkerIcon}
//           />
//         ))}
//         {selectedMarker && (
//           <InfoWindow
//             position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
//             onCloseClick={() => setSelectedMarker(null)}>
//             <div>
//               <h3>{selectedMarker.title}</h3>
//               <p>{selectedMarker.description}</p>
//               <a href={`/stories/${selectedMarker.id}`}>Follow the whisper</a>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default memo(Map);

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { memo } from "react";
import "./Map.css";

const center = {
  lat: 62.7507414,
  lng: 15.422574800000007,
};

export const Map = () => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerClassName="my-map-container"
        center={center}
        zoom={4}>
        {/* Child components, like markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
  );
};

export default memo(Map);

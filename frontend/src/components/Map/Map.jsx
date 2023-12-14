/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const center = {
  lat: 59.334591,
  lng: 18.06324,
};

export const MyComponent = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerClassName="my-map-container"
        center={center}
        zoom={10}>
        {/* Child components, like markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(MyComponent);

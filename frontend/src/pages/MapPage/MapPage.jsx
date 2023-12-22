import { Map } from "../../components/Map/Map";
import "./MapPage.css";

export const MapPage = ({ stories }) => {
  return (
    <>
      <Map stories={stories} />
    </>
  );
};

/* eslint-disable no-unused-vars */
import { useLayoutEffect } from "react";
import usePlaygroundStore from "../stores/usePlaygroundStore";
import "../pages/Home/home.css"
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useTranslation } from "react-i18next";



const PlaygroundContainer = () => {
    const { t } = useTranslation();
    const { playgrounds, fetchPlaygrounds } = usePlaygroundStore();
  
    useLayoutEffect(() => {
      fetchPlaygrounds();
    }, []); // Fetch playgrounds on component mount
  
    return (
      <div className="flex-container">
        {playgrounds.map((playground, index) => {
          // Ensure that playground.id is defined
          if (playground.id) {
            // Use encodeURIComponent to handle spaces and special characters in the ID
            const encodedId = encodeURIComponent(playground.id);
  
            return (
              <div className="playground" key={index}>
                <h2>{playground.name}</h2>
                {/* <p>{playground.description}</p> */}
                <Link key={playground.id} to={`/playground/${playground.id}`}>
                <Button className={"more-details"} btnText={t("PlaygroundContainer.more-details")} />
                  </Link>
              </div>
            );
          } else {
            // Handle the case where playground.id is undefined
            console.error("Invalid playground ID format (undefined):", playground.id);
            return null;
          }
        })}
      </div>
    );
  };
  
  export default PlaygroundContainer;
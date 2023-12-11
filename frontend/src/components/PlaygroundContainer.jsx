import React, { useEffect } from "react";
import usePlaygroundStore from "../stores/usePlaygroundStore";
import "./playgroundcontainer.css"
import { Link } from "react-router-dom";

const PlaygroundContainer = () => {
    const { playgrounds, fetchPlaygrounds } = usePlaygroundStore();
  
    useEffect(() => {
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
                <p>{playground.description}</p>
                <Link key={playground.id} to={`/playground/${playground.id}`}>
                  <button>More Details</button>
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
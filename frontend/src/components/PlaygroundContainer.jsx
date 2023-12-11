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
          // Ensure that playground.name is defined
          if (playground.name) {
            // Use encodeURIComponent to handle spaces and special characters in the name
            const encodedName = encodeURIComponent(playground.name);
  
            return (
              <div className="playground" key={index}>
                <h2>{playground.name}</h2>
                <p>{playground.description}</p>
                <Link to={`/playground/${encodedName}`}>
                  <button>More Details</button>
                </Link>
              </div>
            );
          } else {
            // Handle the case where playground.name is undefined
            console.error("Invalid playground name format (undefined):", playground.name);
            return null;
          }
        })}
      </div>
    );
  };
  
  export default PlaygroundContainer;
  
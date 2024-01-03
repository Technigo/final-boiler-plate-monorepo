/* eslint-disable no-unused-vars */
import { useLayoutEffect } from "react";
import usePlaygroundStore from "../stores/usePlaygroundStore";
import "../pages/Home/home.css"
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import randomImage1 from "/Playgrounds/_08db1d05-2a11-457f-869e-4968d3d6cbe4.jpeg";
import randomImage2 from "/Playgrounds/_9df306ce-3682-4f2d-8087-dfda556b834e.jpeg";
import randomImage3 from "/Playgrounds/_35d32a2a-500a-4aab-a344-04a25fe00ffd.jpeg";
import randomImage4 from "/Playgrounds/_35ec44c2-2835-4037-8a7e-dbb44f2cac24.jpeg";
import randomImage5 from "/Playgrounds/_46d0ce84-1e85-491d-a3d4-d43fd3f2cd31.jpeg";
import randomImage6 from "/Playgrounds/_97615a78-0940-4823-8a95-8a7303e421b4.jpeg";
import randomImage7 from "/Playgrounds/_a39cc1fb-d9af-4c83-9f08-2ea34b201b21.jpeg";
import randomImage8 from "/Playgrounds/_cd57fb3f-75cc-4b93-8a5c-6bfd6c8ad512.jpeg";
import randomImage9 from "/Playgrounds/_eaef384b-c376-4bb9-992b-910a70bc7335.jpeg";
import randomImage10 from "/Playgrounds/_f2cae278-5f44-429e-aa72-d060285f8a0a.jpeg";
import randomImage11 from "/Playgrounds/_fe4998d3-f2fb-48bc-83c5-bbc166e9bca3.jpeg";
import randomImage12 from "/Playgrounds/_fecaffc0-b198-47ea-966e-a0211816e759.jpeg";


const PlaygroundContainer = () => {
    const { t } = useTranslation();
    const { playgrounds, fetchPlaygrounds } = usePlaygroundStore();
  
    useLayoutEffect(() => {
      fetchPlaygrounds();
    }, []); // Fetch playgrounds on component mount

      // Function to pick a random image from an array of images
  const getRandomImage = () => {
    const images = [randomImage1, randomImage2, randomImage3, randomImage4, randomImage5, randomImage6, randomImage7, randomImage8, randomImage9, randomImage10, randomImage11, randomImage12];
    // Add more images as needed
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  
    return (
      <div className="flex-container">
        {playgrounds.map((playground, index) => {
          // Ensure that playground.id is defined
          if (playground.id) {
            // Use encodeURIComponent to handle spaces and special characters in the ID
            const encodedId = encodeURIComponent(playground.id);

            // Generate a random image for each playground
          const randomImage = getRandomImage();

  
            return (
              <div className="playground" key={index}>
                <h2>{playground.name}</h2>
                 {/* Use the random image for each playground */}
                {/* <p>{playground.description}</p> */}
                <img src={randomImage} alt={`Random Image for ${playground.name}`} />
                <Link key={playground.id} to={`/playground/${playground.id}?randomImage=${encodeURIComponent(randomImage)}`}>
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
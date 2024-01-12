import { useEffect, useState } from "react";
import { plantStore } from "../../stores/plantStore";
import { ArticleBedroom } from "./articles/ArticleBedroom";
import { ArticleBalcony } from "./articles/ArticleBalcony";
import { PlantCardMini } from "../../components/plantCard/PlantCardMini";
import "./InspoPage.css";

export const InspoPage = () => {
  const { plants, fetchPlantsByIds } = plantStore();
  const [selectedPlantIndexes, setSelectedPlantIndexes] = useState([]);
  const [clickedButtonCoord, setClickedButtonCoord] = useState(null);

  const plantIds = [3, 21, 10, 2];

  //const plantIdsTwo = [2, 21];

  useEffect(() => {
    fetchPlantsByIds(plantIds);
  }, []);

  return (
    <>
      <section className="inspo-section">
        <h1 className="page-title">Plant Dreams</h1>
        <p className="h2-p">
          This is the place for green dreams of growing lushness! Press a button
          to reveal how your dreams will come true.
        </p>
        <ArticleBedroom />
        <p className="h2-p">Transform your bedroom into a green sanctuary with beautiful plants. Their leafy elegance not only adds aesthetic charm but also promotes a calm atmosphere, enhancing your well-being and connecting you to the soothing rhythms of nature. Embrace the beauty of a botanical haven in your personal space. 🌿✨ #GreenSanctuary #BedroomOasis</p>
        <ArticleBalcony />
        <p className="h2-p">Elevate your balcony into a vibrant botanical retreat. With plants adorning your space, experience the joy of outdoor serenity at your doorstep. From colorful blooms to lush greens, create a tranquil oasis in the heart of the city. 🌼🌿 #BalconyParadise #BalconyBeauties</p>
      </section>
    </>
  );
};

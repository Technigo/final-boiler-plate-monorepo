import { ArticleBedroom } from "./articles/ArticleBedroom";
import { ArticleBalcony } from "./articles/ArticleBalcony";
import { BestSellers } from "../homePage/sections/bestSellers/BestSellers";
import { Instagram } from "../homePage/sections/instagram/Instagram"; 
import "./InspoPage.css";

export const InspoPage = () => {
  return (
    <>
      <section className="inspo-section">
        <h1 className="page-title">Plant Dreams</h1>
        <p className="h2-p">
          This is the place for green dreams of growing lushness! Press a button
          to reveal how your dreams will come true.
        </p>
        <div className="illustration-container">
         <img className="monstera-illustration" src="./monstera-leaf.svg" alt="Illustration of a monstera leaf" />
        </div>
        <ArticleBedroom />
        <ArticleBalcony />
      </section>
      <BestSellers />
      <Instagram />
    </>
  );
};

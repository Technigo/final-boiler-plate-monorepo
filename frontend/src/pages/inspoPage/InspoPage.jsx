import { ArticleBedroom } from "./articles/ArticleBedroom";
import { ArticleBalcony } from "./articles/ArticleBalcony";
import { BestSellers } from "../homePage/sections/bestSellers/BestSellers";
import { Instagram } from "../homePage/sections/instagram/Instagram"; 
import "./InspoPage.css";

export const InspoPage = () => {
  return (
    <>
      <section className="inspo-page-wrapper">
        <div className="inspo-page-container">
          <div className="title-section">
            <h1 className="page-title">Plant Dreams</h1>
            <p className="inspo-page-p">
              This is the place for green dreams of growing lushness! Press a button
              to reveal how your dreams will come true.
            </p>
          </div>
          <div className="illustration-container">
           <img className="monstera-illustration" src="./monstera-leaf.svg" alt="Illustration of a monstera leaf" />
          </div>
          <div className="articles-wrapper">
            <ArticleBedroom />
            <ArticleBalcony />
          </div>
        </div>
      </section>
      <hr className="line"/>
      <BestSellers />
      <Instagram />
    </>
  );
};

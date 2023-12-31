import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation();

    return (
      <div className="hero">
        <img src="/girl-996635_1280.jpg" alt="Hero Image" className="hero-image" />
        <div className="hero-content">
          <h1 className="hero-title">{t("Hero.hero-title")}</h1>
          <p >Lorizzle ipsum rizzle boofron crackalackin, sure adipiscing elit. Nullam yo velizzle, crazy volutpizzle, suscipit quizzle, fo shizzle my nizzle vel, arcu. Pellentesque doggy boofron.</p>
        </div>
      </div>
    );
  };
  
  
import { Hero } from "./sections/hero/Hero";
import { Banner } from "./sections/banner/Banner";
import { BestSellers } from "./sections/bestSellers/BestSellers";
import { Inspo } from "./sections/inspo/Inspo";
import { ByCharacteristic } from "./sections/byCharacteristic/ByCharacteristic";
import { Instagram } from "./sections/instagram/Instagram";

export const Home = () => {
  return (
    <>
      <Hero />
      <Banner />
      <BestSellers />
      <Inspo />
      <ByCharacteristic />
      <Instagram />
    </>
  );
};

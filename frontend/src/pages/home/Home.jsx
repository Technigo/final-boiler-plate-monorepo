import { Hero } from "./sections/hero/Hero";
import { BestSellers } from "./sections/bestSellers/BestSellers";
import { Inspo } from "./sections/inspo/Inspo";
import { ByCharacteristic } from "./sections/byCharacteristic/ByCharacteristic";
import { Instagram } from "./sections/Instagram/Instagram";

export const Home = () => {
  return (
    <>
    <Hero />
    <BestSellers />
    <Inspo />
    <ByCharacteristic />
    <Instagram />
    </>
  );
};
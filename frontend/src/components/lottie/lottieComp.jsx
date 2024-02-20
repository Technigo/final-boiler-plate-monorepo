import Lottie from "lottie-react";
import AnimationPlantLoader from "../../animations/Animation-plant-loader.json";
import AnimationOrderSuccess from "../../animations/Animation-order-success.json";

export const PlantLoader = () => {
  return <Lottie animationData={AnimationPlantLoader} />;
};

export const Success = () => {
  return <Lottie animationData={AnimationOrderSuccess} />;
};

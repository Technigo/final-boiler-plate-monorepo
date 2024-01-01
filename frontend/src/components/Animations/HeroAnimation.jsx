import Lottie from "lottie-react";
import Hero from "./HeroAnimation.json";
import styled from "styled-components";

const StyledHeroAnimation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 450px) {
    width: 250px;
    height: 250px;
  }

  @media (min-width: 450px) {
    width: 350px;
    height: 350px;
  }

  /* @media (min-width: 450px) {
    width: 400px;
    height: 400px;
  } */
`;

export const HeroAnimation = () => {
  const options = {
    animationData: Hero,
    style: {
      height: "100%",
      width: "100%",
    },
    autoplay: true,
    loop: true,
  };

  return (
    <StyledHeroAnimation>
      <Lottie
        animationData={options.animationData}
        style={options.style}
        autoplay={options.autoplay}
        loop={options.loop}
      />
    </StyledHeroAnimation>
  );
};

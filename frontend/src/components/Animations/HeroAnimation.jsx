import Lottie from "lottie-react";
import Hero from "./HeroAnimation.json";
import styled from "styled-components";

// Styled component to contain and style the Lottie animation
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
`;

// Component rendering the Lottie animation
export const HeroAnimation = () => {
  // Options object to configure the Lottie animation
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

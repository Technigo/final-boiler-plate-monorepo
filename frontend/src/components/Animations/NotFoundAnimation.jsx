import Lottie from "lottie-react";
import NotFound from "./NotFoundAnimation.json";
import styled from "styled-components";

// Styled component to contain and style the 'Not Found' Lottie animation
const StyledNotFoundAnimation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 450px) {
    width: 250px;
    height: 250px;
  }

  @media (min-width: 450px) {
    width: 400px;
    height: 400px;
  }
`;

// Component rendering the 'Not Found' Lottie animation
export const NotFoundAnimation = () => {
  // Options object to configure the Lottie animation
  const options = {
    animationData: NotFound,
    style: {
      height: "100%",
      width: "100%",
    },
    autoplay: true,
    loop: true,
  };

  return (
    <StyledNotFoundAnimation>
      <Lottie
        animationData={options.animationData}
        style={options.style}
        autoplay={options.autoplay}
        loop={options.loop}
      />
    </StyledNotFoundAnimation>
  );
};

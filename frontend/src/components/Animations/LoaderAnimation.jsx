import Lottie from "lottie-react";
import Loading from "./LoaderAnimation.json";
import styled from "styled-components";

const Load = styled.div`
  display: flex;
  justify-content: center;
  background-color: transparent;
`;

// Component rendering the 'Loading' Lottie animation
export const LoaderAnimation = () => {
  const options = {
    animationData: Loading,
    style: {
      height: 150,
      width: 150,
    },
    loop: true,
  };

  return (
    <Load>
      <Lottie
        animationData={options.animationData}
        style={options.style}
        loop={options.loop}
      />
    </Load>
  );
};

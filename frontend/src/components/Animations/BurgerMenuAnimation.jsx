import Lottie from "lottie-react";
// import LottieInteractivity from "lottie-interactivity";
//import "@lottiefiles/lottie-player";
//import { create } from "@lottiefiles/lottie-interactivity";
import BurgerMenu from "./BurgerMenuAnimation.json";
//import { useEffect } from "react";
import styled from "styled-components";

const BurgerMenuButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: var(--lighttext);
  cursor: pointer;
  /* 
  @media (min-width: 667px) {
    display: hidden;
  } */
`;

export const BurgerMenuAnimation = ({ onClick, children }) => {
  const options = {
    animationData: BurgerMenu,
    style: {
      height: 40,
      width: 40,
    },
    // autoplay: true,
    // loop: true,
  };

  //   useEffect(() => {
  //     const interactivity = LottieInteractivity.
  //     create({
  //       player: "#burgerLottie",
  //       mode: "cursor",
  //       actions: [
  //         {
  //           type: "toggle",
  //         },
  //       ],
  //     });

  //     return () => {
  //       // Cleanup or remove interactivity if needed
  //       interactivity.destroy();
  //     };
  //  [];

  return (
    <BurgerMenuButton onClick={onClick}>
      <Lottie
        animationData={options.animationData}
        style={options.style}
        id="burgerLottie" // Add an ID for targeting
        // autoplay={options.autoplay}
        // loop={options.loop}
      />
      {children}
    </BurgerMenuButton>
  );
};

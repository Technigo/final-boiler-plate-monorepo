import Lottie from "lottie-react";
import BurgerMenu from "./BurgerMenuAnimation.json";
import styled from "styled-components";

const BurgerMenuButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: var(--lighttext);
  cursor: pointer;
`;

export const BurgerMenuAnimation = ({ onClick, children }) => {
  const options = {
    animationData: BurgerMenu,
    style: {
      height: 40,
      width: 40,
    },
  };

  return (
    <BurgerMenuButton onClick={onClick}>
      <Lottie animationData={options.animationData} style={options.style} />
      {children}
    </BurgerMenuButton>
  );
};

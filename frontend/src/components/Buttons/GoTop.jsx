import styled from "styled-components";
import { useState, useEffect } from "react";
import { IconButton } from "./IconButton";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const StyledGoTop = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
  z-index: 1000;

  .goTopButton {
    background-color: var(--button);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    width: 30px;
    height: 30px;
    border-radius: 25px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const GoTopButton = () => {
  const [showGoTop, setShowGoTop] = useState(false);

  const handleVisibleButton = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    setShowGoTop(scrollPosition > 50);
  };

  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
    return () => {
      window.removeEventListener("scroll", handleVisibleButton);
    };
  }, []);

  return (
    <StyledGoTop className={showGoTop ? "" : "goTopHidden"}>
      <IconButton
        className="goTopButton"
        color="primary"
        onClick={handleScrollUp}
      >
        <MdKeyboardDoubleArrowUp />
      </IconButton>
    </StyledGoTop>
  );
};

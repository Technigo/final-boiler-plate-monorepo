import styled from "styled-components";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
//import { Button } from "./Button";

const StyledGoTop = styled.div`
  position: fixed;
  bottom: 28%;
  right: 5%;
  z-index: 1000;

  .goTopIcon {
    background-color: var(--button);
    color: var(--lighttext);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    width: 40px;
    height: 40px;
    border-radius: 25px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
  // Adjust the position of the button on smaller screens
  @media screen and (min-width: 600px) and (max-width: 680px) {
    right: 2%;
  }
`;

// Button to scroll to the top of the page
export const GoTopButton = () => {
  const [showGoTop, setShowGoTop] = useState(false);

  // Show the button when the user scrolls down 900px from the top of the document
  const handleVisibleButton = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    setShowGoTop(scrollPosition > 900);
  };

  // Scroll to the top of the page
  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  // Add event listener when the component is mounted
  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
    return () => {
      window.removeEventListener("scroll", handleVisibleButton);
    };
  }, []);

  // Empty array as second argument to only run the effect once
  return (
    <StyledGoTop className={showGoTop ? "" : "goTopHidden"}>
      <MdOutlineKeyboardDoubleArrowUp
        className="goTopIcon"
        onClick={handleScrollUp}
        size={10}
      />
    </StyledGoTop>
  );
};

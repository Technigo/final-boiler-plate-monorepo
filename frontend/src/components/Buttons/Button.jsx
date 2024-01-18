import styled from "styled-components";

// Styled component for the button
const StyledButton = styled.button`
  background-color: var(--button);
  color: var(--lighttext);
  padding: 5px 15px;
  border-radius: 20px;
  margin: 10px;
  font-size: 20px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;

  &:hover {
    background-color: var(--buttonhover);
  }
  // When the button is pressed, but not released
  &:active {
    background-color: var(--buttonactive);
  }

  &.logout-button-navbar {
    font-size: 16px;
    background: transparent;
  }

  &.logout-button-burgermenu {
    font-size: 14px;
    background: transparent;
    margin: 0;
    padding: 0;
  }

  // Styling for the button to close the open modal
  &.close-modal-btn {
    position: absolute;
    background-color: transparent;
    top: 10px;
    right: 10px;
    border: none;
    border-radius: 10px;
    color: var(--darkgrey);
    font-weight: bold;
    cursor: pointer;

    // Styling for the button when hovering over it
    &:hover {
      background-color: var(--buttonhover);
    }

    // When the button is pressed, but not released
    &:active {
      background-color: var(--buttonactive);
    }
  }
`;

// Button component to be used in other components
export const Button = ({ buttonName, className, onClick }) => {
  return (
    <StyledButton className={className} onClick={onClick}>
      {buttonName}
    </StyledButton>
  );
};

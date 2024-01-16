import styled from "styled-components";

// Styled component for the button
const StyledButton = styled.button`
  background-color: var(--button);
  color: var(--lighttext);
  padding: 5px 15px;
  border-radius: 20px;
  margin: 10px;
  font-size: 16px;
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
`;

// Button component to be used in other components
export const Button = ({ buttonName, className, onClick }) => {
  return (
    <StyledButton className={className} onClick={onClick}>
      {buttonName}
    </StyledButton>
  );
};

import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Link as a button
const StyledButton = styled(Link)`
  background-color: var(--button);
  color: var(--lighttext);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;

  &:hover {
    background-color: var(--buttonhover);
  }
`;

// LinkButton component using the styled Link as a button
export const LinkButton = ({ to, buttonName, className, onClick }) => {
  return (
    <StyledButton to={to} className={className} onClick={onClick}>
      {buttonName}
    </StyledButton>
  );
};

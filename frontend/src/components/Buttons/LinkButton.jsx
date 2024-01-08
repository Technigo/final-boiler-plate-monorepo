import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Link as a button
const StyledButton = styled(Link)`
  background-color: var(--secondaryColor);
  color: #fff;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;

  &:hover {
    background-color: #899b64;
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

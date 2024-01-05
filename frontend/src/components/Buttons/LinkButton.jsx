import { Link } from "react-router-dom";
import styled from "styled-components";

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

// Mounta knappen enligt nedan där den behövs!
// <LinkButton
//   to = "/YourRoute";
//   className="YourClassName"
//   buttonName="YourButtonText"
// />;

// Radera bilddelen om det aldrig kommer till användning!
export const LinkButton = ({ to, buttonName, className, onClick }) => {
  return (
    <StyledButton to={to} className={className} onClick={onClick}>
      {buttonName}
    </StyledButton>
  );
};

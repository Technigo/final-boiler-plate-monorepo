import styled from "styled-components";

const StyledButton = styled.div`
  background-color: #eeb885;
  color: #000;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #9eb7bf;
  }
`;

// Mounta knappen enligt nedan där den behövs!
// <Button
//   className="YourClassName"
//   buttonName="YourButtonText"
// />;

// Radera bilddelen om det aldrig kommer till användning!
export const Button = ({ buttonName, className, onClick }) => {
  return (
    <StyledButton className={className} onClick={onClick}>
      {buttonName}
    </StyledButton>
  );
};

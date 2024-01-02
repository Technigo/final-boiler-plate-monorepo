import styled from "styled-components";

const StyledButton = styled.div`
  background-color: #64899b;
  color: #fff;
  padding: 5px 15px;
  border-radius: 20px;
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;

  &:hover {
    background-color: #899b64;
  }
`;

// Mounta knappen enligt nedan där den behövs!
{
  // <Button
  //   onClick={onClick}
  //   className="YourClassName"
  //   buttonName="YourButtonText"
  // />;
}

// Radera bilddelen om det aldrig kommer till användning!
export const Button = ({ buttonName, className, onClick }) => {
  return (
    <StyledButton className={className} onClick={onClick}>
      {buttonName}
    </StyledButton>
  );
};

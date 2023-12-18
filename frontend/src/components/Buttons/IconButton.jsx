import styled from "styled-components";

const StyledIconButton = styled.div`
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
//   iconAlt="YourAltText"
// />;

// Radera bilddelen om det aldrig kommer till användning!
export const IconButton = ({ buttonName, iconAlt, imgSrc, className }) => {
  return (
    <StyledIconButton>
      <div className={className} alt={iconAlt} src={imgSrc} />
      {buttonName}
    </StyledIconButton>
  );
};

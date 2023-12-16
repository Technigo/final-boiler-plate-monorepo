import styled from "styled-components";

const StyledIconButton = styled.div`
  background-color: #eeb885;
  color: #fff;
`;

// Mounta knappen enligt nedan där den behövs!
// <Button
//   className="YourClassName"
//   buttonName="YourButtonText"
//   iconAlt="YourAltText"
// />;

// Radera bilddelen om det aldrig kommer till användning!
export const Button = ({ buttonName, iconAlt, className }) => {
  return (
    <StyledIconButton>
      <div className={className} alt={iconAlt} />
      {buttonName}
    </StyledIconButton>
  );
};

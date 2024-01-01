import styled from "styled-components";

const StyledIconButton = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: #eeb885;
  color: #000;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;

  &:hover {
    background-color: #ebc5a2;
  }
`;

const StyledIcon = styled.img`
  width: 25px;
  height: 25px;
`;

// Mounta knappen enligt nedan där den behövs!
// <Button
//   className="YourClassName"
//   buttonName="YourButtonText"
//   iconAlt="YourAltText"
// />;

// Radera bilddelen om det aldrig kommer till användning!
export const IconButton = ({
  buttonName,
  iconAlt,
  src,
  className,
  onClick,
}) => {
  return (
    <>
      <StyledIconButton>
        <StyledIcon
          className={className}
          alt={iconAlt}
          src={src}
          onClick={onClick}
        />
        {buttonName}
      </StyledIconButton>
    </>
  );
};

import styled from "styled-components";

// Styled button with an icon
const StyledIconButton = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
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

const StyledIcon = styled.img`
  width: 25px;
  height: 25px;
`;

// IconButton component combining the button and icon
export const IconButton = ({
  buttonName,
  iconAlt,
  src,
  className,
  onClick,
}) => {
  return (
    <>
      <StyledIconButton onClick={onClick} className={className}>
        <StyledIcon alt={iconAlt} src={src} />
        {buttonName}
      </StyledIconButton>
    </>
  );
};

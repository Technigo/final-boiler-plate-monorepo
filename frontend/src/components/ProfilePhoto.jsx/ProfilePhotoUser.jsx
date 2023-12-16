import femaleUser from "/FemaleUser.png";
import maleUser from "/MaleUser.png";
import styled from "styled-components";

const StyledProfilePhotoUser = styled.img`
  height: 150px;
  width: 100px;
  object-fit: cover;
  border-radius: 20px 0 20px 20px;
`;

export const ProfilePhoto = ({ gender }) => {
  const selectedPhoto = gender === "female" ? femaleUser : maleUser;

  return (
    <StyledProfilePhotoUser src={selectedPhoto} alt="Photo of ${gender} user" />
  );
};

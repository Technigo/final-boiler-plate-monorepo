import profilePhotoSusanne from "/Susanne-img.jpg";
import profilePhotoAnna from "/Anna-img.webp";
import styled from "styled-components";

const StyledProfilePhotoFounder = styled.img`
  height: 400px;
  width: 300px;
  object-fit: cover;
  border-radius: 20px 0 20px 20px;
`;

export const ProfilePhotoFounder = ({ person }) => {
  const profilePhoto =
    person === "Anna" ? profilePhotoAnna : profilePhotoSusanne;
  return (
    <StyledProfilePhotoFounder
      src={profilePhoto}
      alt="Photo of ${person}, Founder of A Helping Hand"
    />
  );
};

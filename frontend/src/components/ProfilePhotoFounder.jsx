import profilePhotoSusanne from "/Susanne-img.jpg";
import profilePhotoAnna from "/Anna-img.webp";
import styled from "styled-components";

// Styled component for the founder's profile photo
const StyledProfilePhotoFounder = styled.img`
  height: 400px;
  width: 300px;
  object-fit: cover;
  border-radius: 20px 0 20px 20px;
  border: 2px solid var(--lighttext);
`;

// Component to display the founder's photo based on the person (Anna or Susanne)
export const ProfilePhotoFounder = ({ person }) => {
  // Determine which profile photo to display based on the person
  const profilePhoto =
    person === "Anna" ? profilePhotoAnna : profilePhotoSusanne;
  return (
    <StyledProfilePhotoFounder
      src={profilePhoto}
      alt="Photo of ${person}, Creator of A Helping Hand website"
    />
  );
};

import { SocialMediaLinks } from "../components/SocialMediaLinks";
import { ProfilePhotoFounder } from "../components/ProfilePhoto.jsx/ProfilePhotoFounder";
import styled from "styled-components";

const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
`;

const StyledVision = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;
`;

const StyledFounderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledFounders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;

  @media (min-width: 1050px) {
    flex-direction: row;
    gap: 100px;
  }

  @media (min-width: 1400px) {
    gap: 200px;
  }
`;

const StyledFounderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const About = () => {
  return (
    <StyledAbout>
      <StyledVision>
        <h2>Our vision</h2>
        <p>
          Welcome to our community of compassion and generosity! We believe in
          the power of uniting hearts and strive to create a world where every
          act of kindness matters. Our platform is a vibrant hub where those in
          need of help encounter those who are ready to offer their time and
          care without expecting anything in return.
        </p>
        <p>
          Here, it&apos;s about uplifting each other, where a simple gesture can
          make a tremendous difference. Perhaps there&apos;s an elderly neighbor
          who needs help raking leaves, someone requiring assistance with
          grocery shopping, or an individual unable to walk their four-legged
          friend. Our platform serves as a bridge connecting needs with helpful
          souls.
        </p>
        <p>
          We believe in fostering an inclusive community where goodwill and
          kindness are the currency. Here, commitment and generosity matter
          most. With us, every effort is a step towards a warmer, more
          empathetic world. Together, we&apos;re building a place where hearts
          meet to make a difference. Welcome to being a part of this beautiful
          movement of humanity.
        </p>
      </StyledVision>
      <StyledFounderSection>
        <h2>Founders</h2>
        <StyledFounders>
          <StyledFounderInfo>
            <ProfilePhotoFounder person="Susanne" />
            <h3>Susanne Ekenheim</h3>
            <SocialMediaLinks person="Susanne" />
          </StyledFounderInfo>
          <StyledFounderInfo>
            <ProfilePhotoFounder person="Anna" />
            <h3>Anna Robertsson</h3>
            <SocialMediaLinks person="Anna" />
          </StyledFounderInfo>
        </StyledFounders>
      </StyledFounderSection>
    </StyledAbout>
  );
};

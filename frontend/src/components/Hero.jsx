import { LinkButton } from "../components/Buttons/LinkButton";
import styled from "styled-components";

const StyledHero = styled.div`
  display: flex;
  gap: 40px;

  img {
    width: 40%;
    object-fit: cover;
  }
`;

const StyledHeroText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (min-width: 600px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 50px;
  }

  /* @media (min-width: 1050px) {
    gap: 100px;
  } */
`;

export const Hero = () => {
  // Define text content for the heading and subheading.
  const text = {
    heading: "Welcome",
    subheading: "Our mission is to help people connect with their community",
    intro:
      "Join a community of compassion and generosity, connecting people through simple acts of kindness. Together, we build a world where every effort makes a meaningful difference. Welcome to our movement of humanity.",
  };

  return (
    <StyledHero>
      <StyledHeroText>
        <h1 className="heading">{text.heading}</h1>
        <h2>{text.subheading}</h2>
        <p>{text.intro}</p>
        <StyledButtonWrapper>
          <LinkButton
            to="/login"
            className="login-button"
            buttonName="Log in"
          />
          <LinkButton
            to="/register"
            className="register-button"
            buttonName="Join the community"
          />
        </StyledButtonWrapper>
      </StyledHeroText>
      <img
        src="/placeholder-hero.jpg"
        alt="Man receiving groceries from woman"
      />
    </StyledHero>
  );
};

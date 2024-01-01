import { LinkButton } from "../components/Buttons/LinkButton";
import styled from "styled-components";
import { HeroAnimation } from "./Animations/HeroAnimation";

const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  @media (min-width: 950px) {
    display: flex;
    flex-direction: row;
    gap: 50px;
  }
`;

const StyledHeroText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (min-width: 950px) {
    width: 60%;
  }
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
`;

export const Hero = () => {
  const text = {
    heading: "Welcome",
    subheading: "We help people in Varberg connect with their community",
    intro:
      "Join a community of compassion and generosity, connecting the people in Varberg through simple acts of kindness. Together, we build a world where every effort makes a meaningful difference.",
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
      <HeroAnimation />
    </StyledHero>
  );
};

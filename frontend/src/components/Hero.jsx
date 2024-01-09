import { LinkButton } from "../components/Buttons/LinkButton";
import styled from "styled-components";
//import { HeroAnimation } from "./Animations/HeroAnimation";

const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  position: relative;
  align-items: flex-end;

  img {
    object-fit: cover;
    opacity: 0.8;
    border: 2px solid floralwhite;
    border-radius: 20px 0 20px 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    max-width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 950px) {
    display: flex;
    flex-direction: row;
    gap: 50px;
  }
`;

const HeroTextWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  padding: 8px 24px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.9);
  margin-bottom: 50px;

  @media screen and (min-width: 1024px) {
    padding: 24px;
    gap: 12px;
  }

  h1 {
    color: #213547;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.4px;
    text-transform: uppercase;
  }

  h2 {
    color: #213547;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }
`;

const StyledP = styled.div`
  p {
    width: 80%;
    color: floralwhite;
  }
`;

/* const StyledHeroText = styled.div`
  /*display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (min-width: 950px) {
    width: 60%;
  }
`; */

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
    // heading: "Welcome",
    // subheading: "We help people in Varberg connect with their community",
    heading: "We want the people of Varberg to connect",
    subheading: "Join our community of compassion and generosity",
    intro:
      "We help the people in Varberg to connect through simple acts of kindness. Together, we build a world where every effort makes a meaningful difference.",
  };

  return (
    <StyledHero>
      <Container>
        <img src="/Group-photo.jpg" alt="Group of people" />
        <HeroTextWrapper>
          <h1 className="heading">{text.heading}</h1>
          <h2>{text.subheading}</h2>
        </HeroTextWrapper>
      </Container>
      <StyledP>
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
      </StyledP>

      {/* <HeroAnimation /> */}
    </StyledHero>
  );
};

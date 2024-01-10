import { LinkButton } from "../components/Buttons/LinkButton";
import styled from "styled-components";

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
  background-image: url("/Group-photo.jpg");
  height: 250px;
  width: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  border: 2px solid var(--lighttext);
  border-radius: 20px 0 20px 20px;
  overflow: hidden;
  //alt="Group of people"

  @media screen and (min-width: 570px) {
    height: 400px;
  }

  @media screen and (min-width: 980px) {
    height: 500px;
  }

  @media screen and (min-width: 1500px) {
    height: 550px;
    max-width: 1000px;
  }

  /* img {
    object-fit: cover;
   
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    max-width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  } */

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
  gap: 2px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.9);
  //margin-bottom: 50px;

  h1 {
    color: var(--darktext);
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1.4px;
    text-transform: uppercase;
  }

  h2 {
    color: var(--darktext);
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    display: none;
  }

  @media screen and (min-width: 320px) {
    margin-bottom: 10px;
  }

  @media screen and (min-width: 570px) {
    margin-bottom: 20px;

    h2 {
      display: block;
    }
  }

  @media screen and (min-width: 980px) {
    padding: 24px;
    margin-bottom: 30px;
    // gap: 12px;

    h1 {
      font-size: 22px;
    }

    h2 {
      font-size: 18px;
    }
  }

  @media screen and (min-width: 1200px) {
    h1 {
      font-size: 24px;
    }

    h2 {
      font-size: 20px;
    }
  }
`;

const StyledP = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;

  p {
    width: 80%;
    color: var(--lighttext);
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
    </StyledHero>
  );
};

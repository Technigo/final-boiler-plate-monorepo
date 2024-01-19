import { useEffect } from "react";
import { LinkButton } from "../components/Buttons/LinkButton";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { Heading1 } from "../components/Typography/Heading1";
import { Heading2 } from "../components/Typography/Heading2";
import { BodyText } from "../components/Typography/BodyText";
import styled from "styled-components";

const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
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

  @media screen and (min-width: 320px) {
    margin-bottom: 10px;
  }

  @media screen and (min-width: 570px) {
    margin-bottom: 20px;
    padding: 16px 24px;
  }

  @media screen and (min-width: 980px) {
    padding: 24px;
    margin-bottom: 30px;
  }
`;

const StyledP = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 40px;
  margin: 20px 0;
  max-width: 1200px;
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
  const { isLoggedIn } = userStore();
  const navigate = useNavigate();

  // Text content for the Hero section
  const text = {
    heading: "We want the people in Varberg to connect",
    subheading: "Join our community of compassion and generosity",
    intro:
      "Welcome to our compassionate community! We unite hearts to create a world where every act of kindness matters. Our platform connects those in need with generous individuals ready to offer their time and care. Whether it is helping an elderly neighbor or assisting with groceries, we believe in fostering an inclusive community where goodwill is the currency. Join us in building a warmer, more empathetic world!",
    signup:
      "Sign up now to either ask for help or volunteer your time and kindness. Be a part of this beautiful movement and let your generosity shine!",
  };

  // Redirect to tasks page if user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <StyledHero>
      <Container>
        <HeroTextWrapper>
          <Heading1 className="heading1-hero" text={`${text.heading}`} />
          <Heading2 className={"heading2-hero"} text={`${text.subheading}`} />
        </HeroTextWrapper>
      </Container>
      <StyledP>
        <BodyText className={"bodytext-hero"} text={`${text.intro}`} />
        <BodyText className={"bodytext-hero"} text={`${text.signup}`} />
        {!isLoggedIn && ( // Render buttons only if not logged in
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
        )}
      </StyledP>
    </StyledHero>
  );
};

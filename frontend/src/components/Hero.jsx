import styled from "styled-components";
import { Button } from "./Button";
import { Link } from 'react-router-dom';

export const Hero = () => {
  const content = {
    heading: "Välkommen till PluggIn",
    intro: "Sidan där du kan förbättra dina kunskaper i olika skolämnen. Registrera dig för att spara dina framsteg i spelen.",
    heroImgUrl: "./hero.png",
    heroImgAlt: "Barn studerar i soffa",
  };

  return (
    <HeroContainer>
      <HeroImageContainer>
        <HeroImage src={content.heroImgUrl} alt={content.heroImgAlt} />
        <ImageCredit>
          Image by <a href="https://www.freepik.com/free-vector/girl-read-books-white-background_24459547.htm#fromView=search&page=1&position=8&uuid=d0b52126-bf6c-4124-b7c2-4ad78d4bbe9c">brgfx on Freepik</a>
        </ImageCredit>
      </HeroImageContainer>
      <TextContainer>
        <HeroHeading>{content.heading}</HeroHeading>
        <HeroIntro>{content.intro}</HeroIntro>
        <Link to={`/registering`}>
          <Button type="button">Registrera dig</Button>
        </Link>
      </TextContainer>
    </HeroContainer>
  );
};

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 700px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const TextContainer = styled.div`
  padding: 20px;
  text-align: center;

  @media (min-width: 700px) {
    flex: 1;
    text-align: left;
  }
`;

const HeroHeading = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;

  @media (min-width: 700px) {
    font-size: 2.5rem;
  }
`;

const HeroIntro = styled.p`
  font-size: 1rem;
  max-width: 500px;
  margin: 0 auto;

  @media (min-width: 700px) {
    font-size: 1.2rem;
    margin: 0;
  }
`;

const HeroImageContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;

  @media (min-width: 700px) {
    flex: 1;
    padding: 20px;
    text-align: right;
    margin-bottom: 0;
  }
`;

const HeroImage = styled.img`
  max-width: 400px;
  height: auto;
`;

const ImageCredit = styled.p`
  font-size: 0.7rem;
  margin-top: 10px;
  text-align: right;

  @media (min-width: 700px) {
    text-align: left;
  }
`;
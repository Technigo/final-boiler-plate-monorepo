import styled from "styled-components";

export const Hero = () => {
    const content = {
        heading: "Välkommen till PluggIn",
        intro: "Sidan där du kan förbättra dina kunskaper i olika skolämnen.",
        heroImgUrl: "./hero.jpg",
        heroImgAlt: "Barn studerar i soffa",
    };

  return (
    <HeroContainer>
        <TextContainer>
          <HeroHeading>{content.heading}</HeroHeading>
          <HeroIntro>{content.intro}</HeroIntro>
        </TextContainer>
        <HeroImageContainer>
          <HeroImage src={content.heroImgUrl} alt={content.heroImgAlt} />
          <ImageCredit>
          Image by <a href="https://www.freepik.com/free-vector/girl-read-books-white-background_24459547.htm#fromView=search&page=1&position=8&uuid=d0b52126-bf6c-4124-b7c2-4ad78d4bbe9c">brgfx on Freepik</a>
          </ImageCredit>
        </HeroImageContainer>
    </HeroContainer>
  )
};

const HeroContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const TextContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const HeroHeading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const HeroIntro = styled.p`
  font-size: 1.2rem;
`;

const HeroImageContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
`;

const ImageCredit = styled.p`
  font-size: 0.7rem;
  margin-top: 10px;
  text-align: right;
`;

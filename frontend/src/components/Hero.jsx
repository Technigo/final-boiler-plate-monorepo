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

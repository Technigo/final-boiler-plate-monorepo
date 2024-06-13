import styled from "styled-components";
import { useLogin } from "./../../contexts/UserContext";
import heroImgUrl from "/src/assets/ProgressHeaderWeb.jpg";
import heroImgUrlTabl from "/src/assets/ProgressHeaderTablet.jpg";

export const Hero = () => {
  const { user } = useLogin();
  console.log(user);
  const content = {
    heroTitle: `Hej ${user?.firstName} 👋`,
    intro:
      "Sidan där du kan förbättra dina kunskaper i olika skolämnen. Registrera dig för att spara dina framsteg i spelen.",
    heroImgUrl: "./ProgressHeader.png",
    heroImgAlt: "Barn studerar i soffa",
  };

  return (
    <HeroContainer>
      <HeroLeft>
        <HeroTitle>{content.heroTitle}</HeroTitle>
        <p>
          När du spelar spel och gör uppgifter här, sparas dina framsteg så att
          du kan se hur mycket du har lärt dig och blivit bättre på.
        </p>
        <p>
          Nedanför kan du se hur det har gått för dig i varje ämne, som matte,
          svenska och engelska.
        </p>
        <p>Ha kul och fortsätt lära dig nya saker varje dag! 🎓📚</p>
      </HeroLeft>
      {/* <HeroRight>
        <ProgressBox></ProgressBox>
      </HeroRight> */}
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 30px;
  min-height: 400px;
  background-image: none;
  background-size: cover;
  background-position-x: center;
  background-position-y: top;
  background-repeat: no-repeat;
  height: auto;

  @media (min-width: 500px) AND (max-width: 1025px) {
    background-image: url(${heroImgUrlTabl});
    
  }

  @media (min-width: 1025px) {
    background-image: url(${heroImgUrl});  
  }
`;

const HeroTitle = styled.h1`
  margin: 10px 0;
`;

const HeroLeft = styled.div`
  width: 50%;
`;

const HeroRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: #f1f1f1;
  border-radius: 30px;
`;

const ProgressBox = styled.div`
  padding: 30px;
  background-color: #f1f1f1;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

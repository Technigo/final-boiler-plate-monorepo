import styled from "styled-components";

export const Hero = ({ user }) => {
  return (
    <HeroContainer>
      <HeroLeft>
        <HeroTitle>Välkommen {user?.username} 👋</HeroTitle>
        <p>
          Här hittar du alla dina resultat från uppgifterna! Till höger har du
          en totalt resultat medans nedanför resultat för varje ämne.
        </p>
      </HeroLeft>
      <HeroRight>
        <ProgressBox></ProgressBox>
      </HeroRight>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  display: flex;
  padding: 60px 30px;
  min-height: 400px;
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

// Import necessary dependencies and components.
import { Hero } from "../components/Hero";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { Footer } from "../components/Footer";
import HeaderImg from "/src/assets/testheader.jpg";
import HeaderImgTabl from "/src/assets/testheader2.jpg";

// Define the 'Home' functional component.
export const Home = () => {
  // Render the component content.
  return (
    <HomeContainer>
      <Hero />
      <ContentWrapper>
      <Heading>VÄLJ ÄMNE</Heading>
        <GamesCards>
          <Link to={`/spela/matte`}>
            <GameCard math>Matte</GameCard>
          </Link>
          <Link to={`/spela/svenska`}>
            <GameCard swedish>Svenska</GameCard>
          </Link>
          <Link to={`/spela/engelska`}>
            <GameCard english>Engelska</GameCard>
          </Link>
        </GamesCards>
      </ContentWrapper>
      <Footer />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  background-image: none;
  background-size: cover;
  background-position-x: center;
  background-position-y: top;
  background-repeat: no-repeat;
  height: 90vh;


  @media (min-width: 500px) AND (max-width: 1025px){
    background-image: url(${HeaderImgTabl});
    
    }

  @media (min-width: 1025px) {
    background-image: url(${HeaderImg});
    background-size: cover;
    background-position: center;
    height: auto;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 27px;
  color: #363636;
  margin-top: -3px;
  z-index: 2;

  @media (min-width: 500px) AND (max-width: 700px){
    margin-top: 10px;
    }

  @media (min-width: 700px) AND (max-width: 1025px){
    margin-top: -10px;
    }

  @media (min-width: 1025px) {
    font-size: 40px;

    margin: 25px auto;
  }
`;

const GamesCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 17px;
  

  @media (min-width: 500px) AND (max-width: 1025px){
    margin: 0 auto 200px;
    padding-bottom: 30px;
  }
 
   @media (min-width: 1025px) {
    flex-direction: row;
    gap: 40px;
  }
`;

const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 290px;
  height: 80px;
  margin: 12px auto;
  color: white;
  background-color: var(--forest);
  font-size: 30px;

  @media (min-width: 400px) AND (max-width: 700px){
  height: 90px;
  margin: 20px auto;
  color: white;
  font-size: 40px;
  }


@media (min-width: 700px) AND (max-width: 1025px){
  height: 90px;
  margin: 20px auto;
  color: white;
  font-size: 40px;
  }

  @media (min-width: 1025px) {
    width: 250px;
    min-width: 200px;
    height: 100px;
    font-size: 50px;
  }

  &:hover {
    transition: 0.2s ease;
  }

  ${({ math }) =>
    math &&
    css`
      box-shadow: 10px 10px var(--oceanshadow);
      background-color: var(--ocean);

      &:hover {
        box-shadow: 15px 15px var(--oceanshadow);
      }
    `}

  ${({ swedish }) =>
    swedish &&
    css`
      background-color: var(--sunset);
      box-shadow: 10px 10px var(--sunsetshadow);

      &:hover {
        box-shadow: 15px 15px var(--sunsetshadow);
      }
    `}

  ${({ english }) =>
    english &&
    css`
      background-color: var(--forest);
      box-shadow: 10px 10px var(--forestshadow);

      &:hover {
        box-shadow: 15px 15px var(--forestshadow);
      }
    `}

`;

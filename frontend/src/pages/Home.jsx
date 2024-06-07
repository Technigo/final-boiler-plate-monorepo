// Import necessary dependencies and components.
import { Hero } from "../components/Hero";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { Footer } from "../components/Footer";

// Define the 'Home' functional component.
export const Home = () => {
  // Render the component content.
  return (
    <HomeContainer>
      <Hero />
      <GamesCards>
        <Link to={`/play/matte`}>
          <GameCard math>Matte</GameCard>
        </Link>
        <Link to={`/play/svenska`}>
          <GameCard swedish>Svenska</GameCard>
        </Link>
        <Link to={`/play/engelska`}>
          <GameCard english>Engelska</GameCard>
        </Link>
      </GamesCards>
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
  background-image: linear-gradient(to bottom, lightblue, lightgreen);
`;

const GamesCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;

   @media (min-width: 1025px) {
    flex-direction: row;
  }
`;

const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  gap: 30px;
  width: 290px;
  height: 130px;
  margin: 20px auto;
  color: white;
  background-color: var(--forest);
  font-size: 50px;

  @media (min-width: 1025px) {
    max-width: 600px;
    min-width: 200px;
    height: 220px;
    font-size: 60px;
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

   @media (min-width: 700px) {
    margin: 40px;
  }
`;

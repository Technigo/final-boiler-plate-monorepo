import styled, { css } from "styled-components";
import { useState } from "react";
import { LevelProgressBar } from "./LevelProgressBar";
import { useScore } from "../../contexts/ScoreContext";
import { Hero } from "./Hero";

export const Progress = () => {
  const { progress } = useScore();
  const [selectedSubject, setSelectedSubject] = useState(null);
  console.log(progress);
  if (!progress) {
    return <div>Loading...</div>;
  }

  const handleProgressButton = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <ProgressContainer>
      <Hero />
      <GamesCards>
        <GameCard math onClick={() => handleProgressButton("math")}>
          Matte
        </GameCard>
        <GameCard swedish onClick={() => handleProgressButton("swedish")}>
          Svenska
        </GameCard>
        <GameCard english onClick={() => handleProgressButton("english")}>
          Engelska
        </GameCard>
      </GamesCards>

      {selectedSubject && progress.progress[selectedSubject] && (
        <LevelProgressBar
          progress={progress.progress[selectedSubject]}
          selectedSubject={selectedSubject}
        />
      )}
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  margin: 0 auto;
`;

const GamesCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media (min-width: 700px) {
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

  @media (min-width: 700px) {
    max-width: 600px;
    min-width: 200px;
    height: 120px;
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

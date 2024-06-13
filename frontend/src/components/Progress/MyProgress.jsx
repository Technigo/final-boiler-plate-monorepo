import styled, { css } from "styled-components"
import { useState } from "react"
import { LevelProgressBar } from "./LevelProgressBar"
import { useScore } from "../../contexts/ScoreContext"
import { Hero } from "./Hero"

export const Progress = () => {
  const { progress } = useScore();
  const [selectedSubject, setSelectedSubject] = useState(null);

  if (!progress) {
    return <div>Loading...</div>
  }

  const handleProgressButton = (subject) => {
    setSelectedSubject(subject)
  }

  return (
    <ProgressContainer>
      <Hero />
      <GamesH2>VÄLJ ETT ÄMNE FÖR ATT SE DINA RESULTAT</GamesH2>
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
  )
}

const ProgressContainer = styled.div`
  margin: 0 auto;
`

const GamesH2 = styled.h2`
  text-align: center;
  @media (min-width: 1025px) {
    font-size: 35px;
  }
`;

const GamesCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media (min-width: 700px) {
    flex-direction: row;
    margin: -60px auto 0;
  }
`

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

  @media (min-width: 400px) AND (max-width: 700px) {
    height: 90px;
    margin: 20px auto;
    color: white;
    font-size: 40px;
  }

  @media (min-width: 700px) AND (max-width: 1025px) {
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

   @media (min-width: 700px) {
    margin: 40px;
  }
`

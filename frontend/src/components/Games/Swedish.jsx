import styled from "styled-components"
import { useState } from "react"
import { SwedishQuestion } from "./SwedishQuestion.jsx"

export const Swedish = () => {
  const [gameTypeNumber, setGameTypeNumber] = useState()

  const handleChoice = (type) => {
    setGameTypeNumber(type);
  }

  if (gameTypeNumber) {
    return (
      <SwedishGame>
        <SwedishTitle />
        <SwedishQuestion type={gameTypeNumber}/>
      </SwedishGame>
    ); 
  } else { 
    return (
      <SwedishGame>
        <SwedishTitle />
        <GameTypeButton
          value="0"
          onClick={(event) => handleChoice(event.target.value)}
        >
          Synonymer
        </GameTypeButton>
      </SwedishGame>   
    )
  }
}

const SwedishGame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
`

const SwedishTitle = styled.h2`
  color: black;
`

const GameTypeButton = styled.button`
  background-color: var(--sunset);
  color: white;
  width: 270px;
  height: 50px;
  margin: 10px auto;
  padding: 10px 0;
  z-index: 1;
  border-radius: 15px;
  border: none;
  z-index: 1;
  font-size: 20px;
  padding: 15px;
  cursor: pointer;
  box-shadow: 4px 4px var(--sunsetshadow);

  &:hover {
    background-color: var(--sunsethover);
    box-shadow: 6px 6px var(--sunsetshadow);
    transition: 0.2s ease;
  }

  &:disabled {
    cursor: default;
    border: none;

    &:hover {
      background-color: var(--sunset);
    }
  }

  @media (min-width: 700px) {
    width: 270px;
    height: 60px;
    padding: 20px;
  }
`

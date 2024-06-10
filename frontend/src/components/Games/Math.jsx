import styled from "styled-components"
import { useState, useRef } from "react"
import { MathQuestion } from "./MathQuestion"

export const Math = () => {
  const [gameTypeNumber, setGameTypeNumber] = useState()
  const focusRef = useRef(null)
  
  const handleChoice = (type) => {
    setGameTypeNumber(type)
  }

  if (gameTypeNumber) {
   return (
      <>
        <MathTitle />
        <MathQuestion focusRef={focusRef} type={gameTypeNumber}/>
      </>
    ) 
  } else { 
  return (
    <Choices>
      <MathTypeButton
        value="0"
        onClick={(event) => handleChoice(event.target.value)}
      >
        +
      </MathTypeButton>
      <MathTypeButton
        value="1"
        onClick={(event) => handleChoice(event.target.value)}
      >
        -
      </MathTypeButton>
      <MathTypeButton
        value="2"
        onClick={(event) => handleChoice(event.target.value)}
      >
        *
      </MathTypeButton>
      <MathTypeButton
        value="3"
        onClick={(event) => handleChoice(event.target.value)}
      >
        ÷
      </MathTypeButton>
    </Choices>
  )
}
}

const MathTitle = styled.h2`
  color: black;
`

const Choices = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  margin: 10px auto;

  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 580px;
  }
`;

const MathTypeButton = styled.button`
  background-color: var( --ocean);
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
  box-shadow: 4px 4px var(--oceanshadow);

  &:hover {
    background-color: var( --oceanhover);
    box-shadow: 6px 6px var(--oceanshadow);
    transition: 0.2s ease;
  }

  &:disabled {
    cursor: default;
    border: none;

    &:hover {
    background-color: var( --ocean);
  }
  }

   @media (min-width: 700px) {
    width: 270px;
    height: 60px;
    padding: 20px;
  }
`

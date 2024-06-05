import styled from "styled-components"
import { useState, useRef } from "react"
//import { useMath } from "../../contexts/MathContext"
import { MathQuestion } from "./MathQuestion"

export const Math = () => {
  //const { mathGame, generateQuestion } = useMath()
  const [gameType, setGameType] = useState()
  const [gameNumber, setGameNumber] = useState()
  const focusRef = useRef(null)
  
  const handleChoice = (type) => {
    setGameType(type)
    setGameNumber(type)
  }

  if (gameType) {
   return (
      <>
        <MathTitle />
        <MathQuestion focusRef={focusRef} type={gameNumber}/>
      </>
    ) 
  } else { 
  return (
    <>
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
    </>
  )
}
}

const MathTitle = styled.h2`
  color: black;
`

const MathTypeButton = styled.button`
  height: 150px;
  width: 150px;
  color: white;
  background-color: black;
`

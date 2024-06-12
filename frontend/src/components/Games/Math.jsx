import styled from "styled-components"
import { IoArrowBackCircleOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import { useState, useRef } from "react"
import { useMath } from "../../contexts/MathContext"
import { MathQuestion } from "./MathQuestion"

export const Math = () => {
  const { mathGame } = useMath()
  const [gameTypeNumber, setGameTypeNumber] = useState()
  const focusRef = useRef(null)
  
  const handleChoice = (type) => {
    setGameTypeNumber(type)
  }

  if (gameTypeNumber) {
    return (
      <>
        <BackButton onClick={() => setGameTypeNumber(null)}> 
          <BackIcon />
        </BackButton>
        <MathQuestion focusRef={focusRef} type={gameTypeNumber} />
      </>
    )
  } else { 
  return (
    <Choices>
      <Link to="/spela">
        <BackIcon />
      </Link>
      <MathTitle>VÄLJ SPEL</MathTitle>
      <MathTypeButton
        value="0"
        onClick={(event) => handleChoice(event.target.value)}
      >
        <ButtonText>Nivå {mathGame[0].level}</ButtonText>
        <ButtonText>Addition</ButtonText>
        <ButtonText>
          {mathGame[0].score}/{mathGame[0].levelScore}
        </ButtonText>
        +
      </MathTypeButton>
      <MathTypeButton
        value="1"
        onClick={(event) => handleChoice(event.target.value)}
      >
        <ButtonText>Nivå {mathGame[1].level}</ButtonText>
        <ButtonText>Subtraktion</ButtonText>
        <ButtonText>
          {mathGame[1].score}/{mathGame[1].levelScore}
        </ButtonText>
        -
      </MathTypeButton>
      <MathTypeButton
        value="2"
        onClick={(event) => handleChoice(event.target.value)}
      >
        <ButtonText>Nivå {mathGame[2].level}</ButtonText>
        <ButtonText>Multiplikation</ButtonText>
        <ButtonText>
          {mathGame[2].score}/{mathGame[2].levelScore}
        </ButtonText>
        *
      </MathTypeButton>
      <MathTypeButton
        value="3"
        onClick={(event) => handleChoice(event.target.value)}
      >
        <ButtonText>Nivå {mathGame[3].level}</ButtonText>
        <ButtonText>Division</ButtonText>
        <ButtonText>
          {mathGame[3].score}/{mathGame[3].levelScore}
        </ButtonText>
        ÷
      </MathTypeButton>
    </Choices>
  );
}
}

const MathTitle = styled.h2`
  color: black;
`

const BackButton = styled.button`
  background: none;
  border: none;
  height: 30px;
`

const BackIcon = styled(IoArrowBackCircleOutline)`
  font-size: 40px;
  color: #000000;
  cursor: pointer;
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
`

const MathTypeButton = styled.button`
  background-color: var(--ocean);
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
  display: flex;
  flex-direction: column;

  &:hover {
    background-color: var(--oceanhover);
    box-shadow: 6px 6px var(--oceanshadow);
    transition: 0.2s ease;
  }

  &:disabled {
    cursor: default;
    border: none;

    &:hover {
      background-color: var(--ocean);
    }
  }

  @media (min-width: 700px) {
    width: 270px;
    height: 100px;
    padding: 20px;
  }
`;

const ButtonText = styled.p`
  font-size: 20px;
  margin: 0;  
`

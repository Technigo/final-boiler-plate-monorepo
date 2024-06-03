import styled from "styled-components"
import { useRef } from "react"
import { useMath } from "../../contexts/MathContext"
import { MathQuestion } from "./MathQuestion"

export const Math = () => {
  const { 
    mathType, 
    setMathType, 
    question,
    correctAnswer,
    generateQuestion, 
    savedQuestion, 
    setSavedQuestion, 
    savedAnswer,
    setSavedAnswer
  } = useMath()
  const focusRef = useRef(null)
  
  const handleChoice = (type) => {
    setMathType(type)
    generateQuestion(type)
    if (focusRef.current) {
      focusRef.current.focus()
    }
    switch (mathType) {
      case "addition":
        setSavedQuestion({ ...savedQuestion, addition: question })
        setSavedAnswer({ ...savedAnswer, addition: correctAnswer });
        break;
      case "subtraction":
        setSavedQuestion({ ...savedQuestion, subtraction: question })
        setSavedAnswer({ ...savedAnswer, subtraction: correctAnswer });
        break
      case "multiplication":
        setSavedQuestion({ ...savedQuestion, multiplication: question })
        setSavedAnswer({ ...savedAnswer, multiplication: correctAnswer });
        break
      case "division":
        setSavedQuestion({ ...savedQuestion, division: question })
        setSavedAnswer({ ...savedAnswer, division: correctAnswer });
        break;
      default:
        setSavedQuestion({ ...savedQuestion, addition: question })
        setSavedAnswer({ ...savedAnswer, addition: correctAnswer });
    }
  }

  return (
    <>
      <MathTitle>Vad vill du öva på?</MathTitle>
      <MathTypeButton
        value="addition"
        onClick={(event) => handleChoice(event.target.value)}
      >
        +
      </MathTypeButton>
      <MathTypeButton
        value="subtraction"
        onClick={(event) => handleChoice(event.target.value)}
      >
        -
      </MathTypeButton>
      <MathTypeButton
        value="multiplication"
        onClick={(event) => handleChoice(event.target.value)}
      >
        *
      </MathTypeButton>
      <MathTypeButton
        value="division"
        onClick={(event) => handleChoice(event.target.value)}
      >
        ÷
      </MathTypeButton>
      <MathQuestion focusRef={focusRef}/>
    </>
  )
}

const MathTitle = styled.h2`
  color: black;
`

const MathTypeButton = styled.button`
  color: white;
  background-color: black;
`

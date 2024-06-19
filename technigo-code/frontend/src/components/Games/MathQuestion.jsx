import PropTypes from "prop-types"
import styled, { css } from "styled-components"

import { useState, useEffect } from "react"
import { useScore } from "../../contexts/ScoreContext"

export const MathQuestion = () => {
  const { mathType } = useScore()
  const [question, setQuestion] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState()
  const [message, setMessage] = useState("")
  const [answerInput, setAnswerInput] = useState("");
  const numPadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  //Generates different questions depending on the type of mathematical operation
  const generateAdditionQuestion = () => {
    const a = Math.floor (Math.random() * 100) + 1
    const b = Math.floor(Math.random() * 100) + 1
    setCorrectAnswer(a+b)
    setQuestion(`Vad är ${a}+${b}?`)
  }

  const generateSubtractionQuestion = () => {
    const a = Math.floor (Math.random() * 100) + 1
    const b = Math.floor(Math.random() * 100) + 1
    if (a >= b) {
      setCorrectAnswer(a-b)
      setQuestion(`Vad är ${a}-${b}?`)
    } else {
      setCorrectAnswer(b-a)
      setQuestion(`Vad är ${b}-${a}?`)
    }
  }

  const generateMultiplicationQuestion = () => {
    const a = Math.floor (Math.random() * 11)
    const b = Math.floor(Math.random() * 11)
    setCorrectAnswer(a*b)
    setQuestion(`Vad är ${a}*${b}?`)
  }
  
  const generateDivisionQuestion = () => {
    const a = Math.floor (Math.random() * 10) + 1
    const b = Math.floor(Math.random() * 11)
    const c = a*b
    setCorrectAnswer(c/a)
    setQuestion(`Vad är ${c}/${a}?`)
  }

  //Decides which type of problem to generate based on prop from Math.jsx
  const generateQuestion = () => {   
    setMessage("") 
    setAnswerInput("") 
    switch (mathType) {
      case "addition":
        generateAdditionQuestion()
        break;
      case "subtraction":
        generateSubtractionQuestion()
        break;
      case "multiplication":
        generateMultiplicationQuestion()
        break;
      case "division":
        generateDivisionQuestion()
        break;
      default:
        generateAdditionQuestion()

    }
  }
  
  useEffect(() => {
    generateQuestion()
  }, [])

  const checkAnswer = (event) => {
    event.preventDefault()
    console.log("Type", mathType)
    if (answerInput == correctAnswer){
      setMessage("✅ Rätt svar! Bra jobbat!")
    } else {
      setMessage(`❌ Fel svar. Rätt svar var ${correctAnswer}.`)
    }
    setTimeout(() => generateQuestion(), 3000)
  }

  const handleNumPadClick = (number) => {
    setAnswerInput((prev) => prev + number.toString());
  };

  const handleDeleteClick = () => {
    setAnswerInput("");
  };


  return (
    <div> 
      <MathTitle>Vad vill du öva på?</MathTitle>
      <QuestionCard>{question}</QuestionCard>
      <Answer onSubmit={(event) => checkAnswer(event)}>
        {message && <Message>{message}</Message>}
        <AnswerInput type="number" value={answerInput} onChange={(event) => setAnswerInput(event.target.value)}/>
        <AnswerBtn type="submit">SVARA</AnswerBtn>
      </Answer>
      {/*<Score>Du har {score} rätt hittills</Score>*/}
      <NumPad>
        {numPadNumbers.map((number) => (
          <NumPadBtn key={number} className="small" onClick={() => handleNumPadClick(number)}>{number}</NumPadBtn>
        ))}
        <NumPadBtn key="0" className="big" onClick={() => handleNumPadClick(0)}>0</NumPadBtn>
        <NumPadBtn className="delete" onClick={handleDeleteClick}>🗑️</NumPadBtn>
      </NumPad>
    </div>
  )
}

const MathTitle = styled.h2`
  color: black;
`;

const Answer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

const AnswerInput = styled.input`
  color: black;
  background-color: #afafaf;
  &::-webkit-inner-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  } 
  &::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
`;

const AnswerBtn = styled.button`
  color: black;
  background-color: #6d6d6d;
`;

const NumPad = styled.div`
  display: grid;
  grid-template-rows: 4;
  grid-template-columns: 3;
  gap: 10px;
  max-width: 270px;
  margin: 10px auto;
`;

const NumPadBtn = styled.button`
  
  ${props => props.className === 'small' && css`
  grid-column: span 1;
  grid-row: span 1;
  width: 80px;
  `}
  
  ${props => props.className === 'big' && css`
  grid-column: span 2;
  grid-row: 4;
  width: 175px;
  `}

  ${props => props.className === 'delete' && css`
  grid-column: 3;
  grid-row: 4;
  width: 80px;
  `}
`;


const QuestionCard = styled.div`
  width: 200px;
  background-color: green;
  color: white;
  padding: 20px;
  margin: 10px auto;
  z-index: 1;
`
const Message = styled.div`
  color: black;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  margin: -80px auto 0 auto;
  padding: 50px;
  background-color: white;
  z-index: 2;
  width: 100vh;
`;

/*const Score = styled.h3`
  color: black;
`;*/

MathQuestion.propTypes = {
  type: PropTypes.string
}
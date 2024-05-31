import PropTypes from "prop-types"
import styled, { css } from "styled-components"

import { useState, useEffect, useRef } from "react"
import { useMath } from "../../contexts/MathContext"

export const MathQuestion = () => {
  const { mathType, question, correctAnswer, generateQuestion } = useMath()
  const focusRef = useRef()

  const [message, setMessage] = useState("")
  const [answerInput, setAnswerInput] = useState("");
  const numPadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  useEffect(() => {
    generateQuestion()
    focusRef.current.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Checks if input matches correctAnswer and gives the user a message of "right/wrong"
  //Then starts a new question
  const checkAnswer = (event) => {
    event.preventDefault()
    if (answerInput == correctAnswer){
      setMessage("✅ Rätt svar! Bra jobbat!")
    } else {
      setMessage(`❌ Fel svar. Rätt svar var ${correctAnswer}.`)
    }
    setTimeout(() => newQuestion(), 3000)
  }
  //Resets message and input-field before generating new question
  const newQuestion = () => {
    setMessage("")
    setAnswerInput("")
    generateQuestion(mathType)
    focusRef.current.focus()
  }

  //Puts users click on number-buttons into the inputfield
  const handleNumPadClick = (number) => {
    setAnswerInput((prev) => prev + number.toString())
    focusRef.current.focus()
  }

  const handleDeleteClick = () => {
    setAnswerInput("")
    focusRef.current.focus()
  }

  

  return (
    <div>
      <QuestionCard>{question}</QuestionCard>
      <Answer onSubmit={(event) => checkAnswer(event)}>
        {message && <Message>{message}</Message>}
        <AnswerInput
          ref={focusRef}
          type="number"
          value={answerInput}
          onChange={(event) => setAnswerInput(event.target.value)}
        />
        <AnswerBtn type="submit">SVARA</AnswerBtn>
      </Answer>
      {/*<Score>Du har {score} rätt hittills</Score>*/}
      <NumPad>
        {numPadNumbers.map((number) => (
          <NumPadBtn
            key={number}
            className="small"
            onClick={() => handleNumPadClick(number)}
          >
            {number}
          </NumPadBtn>
        ))}
        <NumPadBtn key="0" className="big" onClick={() => handleNumPadClick(0)}>
          0
        </NumPadBtn>
        <NumPadBtn className="delete" onClick={handleDeleteClick}>
          🗑️
        </NumPadBtn>
      </NumPad>
    </div>
  );
}

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
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

import { useState, useEffect } from "react"
import { useMath } from "../../contexts/MathContext"

export const MathQuestion = ({ focusRef }) => {
  const { 
    mathType, 
    question, 
    correctAnswer, 
    generateQuestion, 
    mathScore, 
    setMathScore,
    savedQuestion,
  } = useMath()

  const [message, setMessage] = useState("")
  const [answerInput, setAnswerInput] = useState("");
  const numPadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  useEffect(() => {
    generateQuestion()
     if (focusRef.current) {
       focusRef.current.focus()
     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Checks if input matches correctAnswer and gives the user a message of "right/wrong"
  //Then starts a new question
  const checkAnswer = (event) => {
    event.preventDefault()
    if (answerInput == correctAnswer){
      setMessage("✅ Rätt svar! Bra jobbat!")
      //Updates the correct score
      switch (mathType) {
        case "addition":
          setMathScore({ ...mathScore, addition: mathScore.addition +1 })
          break;
        case "subtraction":
          setMathScore({ ...mathScore, subtraction: mathScore.subtraction +1 })
          break;
        case "multiplication":
          setMathScore({ ...mathScore, multiplication: mathScore.multiplication +1 })
          break;
        case "division":
          setMathScore({ ...mathScore, division: mathScore.division +1 })
          break;
        default:
          setMathScore({ ...mathScore, addition: mathScore.addition +1 })
      }
    } else {
      setMessage(`❌ Fel svar. Rätt svar var ${correctAnswer}.`)
    }
    setTimeout(() => newQuestion(), 2500)
  }
  //Resets message and input-field before generating new question
  const newQuestion = () => {
    setMessage("")
    setAnswerInput("")
    generateQuestion(mathType)
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }

  //Puts users click on number-buttons into the inputfield
  const handleNumPadClick = (number) => {
    setAnswerInput((prev) => prev + number.toString())
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }

  const handleDeleteClick = () => {
    setAnswerInput("")
    if (focusRef.current) {
      focusRef.current.focus();
    }
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
          placeholder="Skriv ditt svar här"
          onChange={(event) => setAnswerInput(event.target.value)}
        />
        <AnswerBtn type="submit">SVARA</AnswerBtn>
      </Answer>
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
       <Score>Addition: Du har {mathScore.addition} rätt hittills!</Score>
      <Score>Subtraktion: Du har {mathScore.subtraction} rätt hittills!</Score>
      <Score>Multiplikation: Du har {mathScore.multiplication} rätt hittills!</Score>
      <Score>Division: Du har {mathScore.division} rätt hittills!</Score>
    </div>
  );
}

const QuestionCard = styled.div`
  width: 300px;
  height: 110px;
  align-content: center;
  font-size: 30px;
  background-color: var( --ocean);
  color: white;
  padding: 20px;
  margin: 10px auto;
  z-index: 1;
  border-radius: 20px;
  text-align: center;

  @media (min-width: 700px) {
    width: 600px;
    height: 230px;
    font-size: 50px; 
  }
`
const Message = styled.div`
  color: black;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: white;
  z-index: 2;
  font-size: 20px;
  width: 240px;
  height: 230px;
  border-radius: 20px;

   @media (min-width: 700px) {
    width: 550px;
    height: 230px;
    font-size: 30px;
  }
`

const Answer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  align-items: center;

   @media (min-width: 700px) {
    gap: 20px;
  }
`

const AnswerInput = styled.input`
  color: #ffffff;
  background-color: var( --oceanhover);
  border-radius: 10px;
  width: 200px;
  height: 40px;
  border: none;
  padding: 20px;
  font-family: "Itim";
  &::-webkit-inner-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  } 
  &::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

   &::placeholder { 
    color: #d1ecf1;
  }

     @media (min-width: 700px) {
    width: 400px;
    height: 50px;
    font-size: 16px;
  }
`

const AnswerBtn = styled.button`
  color: white;
  background-color: var( --oceanactive);
  border-radius: 10px;
  border: none;
  width: 60px;
  height: 40px;
  cursor: pointer;
  

    @media (min-width: 700px) {
    width: 70px;
    height: 50px;
    font-size: 16px;
  }

  &:hover {
    background-color: var( --ocean);
  }
`

const NumPad = styled.div`
  display: grid;
  grid-template-rows: 4;
  grid-template-columns: 3;
  gap: 10px;
  max-width: 270px;
  margin: 10px auto;
`

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

  border-radius: 10px;
  border: none;
  background-color: var( --oceanactive);
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: var( --ocean);
  }
`

const Score = styled.h3`
  color: black;
`

MathQuestion.propTypes = {
  focusRef: PropTypes.any
}
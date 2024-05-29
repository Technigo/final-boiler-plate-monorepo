import styled from "styled-components";
import { useState, useEffect } from "react"
import { useScore } from "../../contexts/ScoreContext";
import englishData from "../../../data/EnglishGameData.json";


export const Question = () => {
  const { english } = englishData
  const { score, setScore } = useScore()
  const [randomNumber, setRandomNumber] = useState(4)
  const [message, setMessage] = useState("")
  const [disableButton, setDisableButton] = useState(false)

  const answers = []

  const generateAnswers = () => {
    english[randomNumber].wrongAnswer.map((answer) => answers.push(answer))
    answers.push(english[randomNumber].rightAnswer)
    answers.sort()
    /*for (let i = answers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    } return answers*/
  }

  generateAnswers()

  const generateQuestion = () => {
    setRandomNumber(Math.floor(Math.random() * english.length))
    generateAnswers()
    setDisableButton(false)
    setMessage("")
  }
  
  useEffect(() => {
    generateQuestion()
  }, [])

  
  
  //Takes users answer and compare it to right answer to generate right/wrong-message
  const handleChoice = (answer) => {
    const rightAnswer = english[randomNumber].rightAnswer
    if (answer === rightAnswer) {
      setScore(score + 1)
      setMessage("Det var rätt! Bra jobbat!")
    } else {
      setMessage(`Det var tyvärr fel svar. Rätt svar var ${rightAnswer}.`)
    }
    setDisableButton(true)
    setTimeout(() => generateQuestion(), 4000)
  }

  return (
    <div>
      <Title>Vad betyder ordet?</Title>
      <QuestionCard>{english[randomNumber].question}</QuestionCard>
      <Answers>
        {answers.map((answer, index) => (
          <AnswerButton disabled={disableButton} key={index} value={answer} onClick={(event) => handleChoice(event.target.value)}>{answer}</AnswerButton>
        ))}
      </Answers>
      {message && <Message>{message}</Message>}
      <Score>Du har {score} rätt hittills</Score>
    </div>
  )
}

const Title = styled.h2`
  margin: 0;
`

const QuestionCard = styled.div`
  width: 200px;
  background-color: green;
  color: white;
  padding: 20px;
  margin: 10px auto;
`
const Answers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const AnswerButton = styled.button`
  color: white;
  background-color: black;
  border: none;

  &:disabled {
    cursor: default;
    border: none;
  }
`;

const Message = styled.p`
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Score = styled.h3`
  color: black;
`;
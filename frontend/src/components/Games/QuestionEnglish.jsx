import styled from "styled-components";
import { useState, useEffect } from "react"
import { useScore } from "../../contexts/ScoreContext";
import englishData from "../../../data/EnglishGameData.json";


export const Question = () => {
  const { english } = englishData
  const { score, setScore } = useScore()
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * english.length))
  const [message, setMessage] = useState("")

  const answers = []
  
  useEffect(()=> {
    const generateAnswers = () => {
      english[randomNumber].wrongAnswer.map((answer) => answers.push(answer))
      answers.push(english[randomNumber].rightAnswer)
      for (let i = answers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      } return answers
    }
    generateAnswers(),[randomNumber]
  })

  
  



  //Kolla vilket svar användaren klickar på

  const handleChoice = (answer) => {
    console.log(answer)
    console.log("First", message)
    const rightAnswer = english[randomNumber].rightAnswer
    if (answer === rightAnswer) {
      setScore(score + 1)
      //alert("Det var rätt! Bra jobbat!")
      setMessage("Det var rätt! Bra jobbat!")
      
    } else {
      //alert(`Det var tyvärr fel svar. Rätt svar var ${rightAnswer}. Du tryckte på ${answer}`)
      setMessage(`Det var tyvärr fel svar. Rätt svar var ${rightAnswer}.`)
    }
    setTimeout(showAnswer, 2000)
    console.log(score)
    
  }

  const showAnswer = () => {
    console.log("Show", message)
  }

  return (
    <div>
      <Title>Vad betyder ordet?</Title>
      <QuestionCard>{english[randomNumber].question}</QuestionCard>
      <Answers>
        {answers.map((answer, index) => (
          <AnswerButton key={index} value={answer} onClick={(event) => handleChoice(event.target.value)}>{answer}</AnswerButton>
        ))}
      </Answers>
      <Message>{message}</Message>
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
`;

const Message = styled.p`
  color: red;
`;
import styled from "styled-components";
import englishData from "../../../data/EnglishGameData.json"

export const Question = () => {
  const { english } = englishData

  const number = Math.floor(Math.random() * english.length);
  
  const answers = []
  
  const generateAnswers = () => {
    english[number].wrongAnswer.map((answer) => answers.push(answer))
    answers.push(english[number].rightAnswer)
  }

  generateAnswers()
 
  const shuffleArray = () => {
    for (let i = answers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  shuffleArray()

  return (
    <div>
      <Title>Vad betyder ordet?</Title>
      <QuestionCard>{english[number].question}</QuestionCard>
      <Answers>
        {answers.map((answer, index) => (
          <AnswerButton key={index}>{answer}</AnswerButton>
        ))}
      </Answers>
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
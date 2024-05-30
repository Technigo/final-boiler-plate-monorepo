import styled from "styled-components";
import swedishData from "../../../data/SwedishGameData.json"

export const SwedishQuestion = () => {
  const { swedish } = swedishData

  const number = Math.floor(Math.random() * swedish.length);
  
  const answers = []
  
  const generateAnswers = () => {
    swedish[number].wrongAnswer.map((answer) => answers.push(answer))
    answers.push(swedish[number].rightAnswer)
    console.log(answers)
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
      <QuestionCard>{swedish[number].question}</QuestionCard>
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
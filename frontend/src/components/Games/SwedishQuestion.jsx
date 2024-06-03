import styled from "styled-components";
import { useState, useEffect } from "react";
import { useScore } from "../../contexts/ScoreContext";
import swedishData from "../../data/SwedishGameData.json";

export const SwedishQuestion = () => {
  const { swedish } = swedishData;
  const { score, setScore } = useScore();
  const [randomNumber, setRandomNumber] = useState(4);
  const [message, setMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [answers, setAnswers] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const generateAnswers = (index) => {
    const newAnswers = [...swedish[index].wrongAnswer, swedish[index].rightAnswer];
    shuffleArray(newAnswers);
    setAnswers(newAnswers);
  };

  const generateQuestion = () => {
    const newRandomNumber = Math.floor(Math.random() * swedish.length);
    setRandomNumber(newRandomNumber);
    generateAnswers(newRandomNumber);
    setDisableButton(false);
    setMessage("");
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleChoice = (answer) => {
    const rightAnswer = swedish[randomNumber].rightAnswer;
    if (answer === rightAnswer) {
      setTimeout(() => setMessage(`✅ Rätt svar! Bra jobbat!`), 1000);
      setTimeout(() => setScore(score + 1), 2000);
    } else {
      setTimeout(() => setMessage(`❌ Fel svar. Rätt svar var ${rightAnswer}.`), 1000);
    }
    setDisableButton(true);
    setTimeout(() => generateQuestion(), 5000);
  };

  return (
    <div>
      <Title>Vad betyder ordet?</Title>
      <QuestionCard>{swedish[randomNumber].question}</QuestionCard>
      <Answers>
        {message && <Message>{message}</Message>}
        {answers.map((answer, index) => (
          <AnswerButton
            disabled={disableButton}
            key={index}
            value={answer}
            onClick={(event) => handleChoice(event.target.value)}
          >
            {answer}
          </AnswerButton>
        ))}
      </Answers>
      <Score>Du har {score} rätt hittills</Score>
    </div>
  );
};

const Title = styled.h2`
  margin: 0;
`;

const QuestionCard = styled.div`
  width: 200px;
  background-color: green;
  color: white;
  padding: 20px;
  margin: 10px auto;
  z-index: 1;
`;

const Answers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  z-index: 1;
`;

const AnswerButton = styled.button`
  color: white;
  background-color: black;
  border: none;
  z-index: 1;

  &:disabled {
    cursor: default;
    border: none;
  }
`;

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

const Score = styled.h3`
  color: black;
`;

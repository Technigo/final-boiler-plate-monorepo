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
    <>
      <Title>Vad betyder ordet?</Title>
      {message && <Message>{message}</Message>}
      <QuestionCard>{swedish[randomNumber].question}</QuestionCard>
      <Answers>
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
    </>
  );
};

const Title = styled.h2`
  margin: 0;
`;


const QuestionCard = styled.div`
  width: 300px;
  height: 110px;
  align-content: center;
  font-size: 40px;
  background-color: var( --raspberry);
  color: white;
  padding: 20px;
  margin: 10px auto;
  z-index: 1;
  border-radius: 20px;

  @media (min-width: 700px) {
    width: 600px;
    height: 230px;
    font-size: 50px;
  }

`;


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
`;

const Answers = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  margin: 10px auto;

   @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 580px;
    margin: 20px auto;
  }
`;

const AnswerButton = styled.button`
  background-color: var( --raspberry);
  color: white;
  width: 270px;
  margin: 10px auto;
  padding: 10px 0;
  z-index: 1;
  border-radius: 15px;
  border: none;
  z-index: 1;
  font-size: 20px;
  padding: 15px;
  cursor: pointer;

  &:hover {
    background-color: var( --raspberryhover);
  }

  

  &:disabled {
    cursor: default;
    border: none;

    &:hover {
    background-color: var( --raspberry);
  }
  }

   @media (min-width: 700px) {
    width: 270px;
    padding: 20px;
  }

`;

const Score = styled.h3`
  color: black;
`;

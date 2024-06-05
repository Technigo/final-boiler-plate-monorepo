import styled from "styled-components";
import { useState, useEffect } from "react";
import { useScore } from "../../contexts/ScoreContext";
import swedishData from "../../data/SwedishGameData.json";
import Lottie from "lottie-react";
import Right from "../../assets/Right.json";
import Wrong from "../../assets/Wrong.json";

export const SwedishQuestion = () => {
  const { swedish } = swedishData;
  const { score, setScore } = useScore();
  const [randomNumber, setRandomNumber] = useState(4);
  const [message, setMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [rightLottie, setRightLottie] = useState(false);
  const [wrongLottie, setWrongLottie] = useState(false);

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
      setTimeout(() => setRightLottie(true), 1000);
      setTimeout(() => setScore(score + 1), 3000);
      setTimeout(() => setRightLottie(false), 5000)
    } else {
      setTimeout(() => setWrongLottie(true), 1000);
      setTimeout(() => setMessage(`Rätt svar var ${rightAnswer}.`), 3000);
      setTimeout(() => setWrongLottie(false), 5000);
    }
    setDisableButton(true);
    setTimeout(() => generateQuestion(), 5000);
  };

  return (
    <>
      <HeaderDiv>
        <Progress>
          <Level>Nivå 2</Level>
          <Score>⭐{score}/25</Score>
        </Progress>
        <Title>Hitta synonymen</Title>
      </HeaderDiv>
      <QuestionCard>{swedish[randomNumber].question}</QuestionCard>
      {rightLottie && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}><Lottie animationData={Right} loop={false} /></div>)}
      {wrongLottie && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}><Lottie animationData={Wrong} loop={false} /></div>)}
<Answers>
  {answers.map((answer, index) => {
    const capsAnswer = answer.charAt(0).toUpperCase() + answer.slice(1);
    return (
      <AnswerButton
        disabled={disableButton}
        key={index}
        value={answer}
        onClick={(event) => handleChoice(event.target.value)}
      >
        {capsAnswer}
      </AnswerButton>
    );
  })}
</Answers>
      {message && <Message>{message}</Message>}
    </>
  );
};

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto 10px;
  width: 300px;
  gap: 10px;

  @media (min-width: 700px) {
    flex-direction: row-reverse;
    width: 600px;
    margin: 25px auto;
    padding: 0 30px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 40px;

  @media (min-width: 700px) {
    font-size: 45px;

  }
`;

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  gap: 10px;

   @media (min-width: 700px) {
    flex-direction: column;
    width: 50px;
  }
`;

const Level = styled.h3`
  color: black;
`;

const Score = styled.h3`
  color: black;
`;

const QuestionCard = styled.div`
  width: 300px;
  height: 100px;
  align-content: center;
  font-size: 40px;
  background-color: var( --sunset);
  color: white;
  padding: 20px;
  margin: 10px auto;
  z-index: 1;
  border-radius: 20px;

  @media (min-width: 700px) {
    width: 600px;
    height: 210px;
    font-size: 50px;
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
  }
`;

const AnswerButton = styled.button`
  background-color: var( --sunset);
  color: white;
  width: 270px;
  height: 50px;
  margin: 10px auto;
  padding: 10px 0;
  z-index: 1;
  border-radius: 15px;
  border: none;
  z-index: 1;
  font-size: 20px;
  padding: 15px;
  cursor: pointer;
  box-shadow: 4px 4px var(--sunsetshadow);

  &:hover {
    background-color: var( --sunsethover);
    box-shadow: 6px 6px var(--sunsetshadow);
    transition: 0.2s ease;
  }

  &:disabled {
    cursor: default;
    border: none;

    &:hover {
    background-color: var( --sunset);
  }
  }

   @media (min-width: 700px) {
    width: 270px;
    height: 60px;
    padding: 20px;
  }
`;

const Message = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: white;
  z-index: 2;
  font-size: 25px;
  border-radius: 20px;
`;



import styled from "styled-components";
import { useState, useEffect } from "react";
import { useScore } from "../../contexts/ScoreContext";
import englishData from "../../data/EnglishGameData.json";
import Lottie from "lottie-react";
import Right from "../../assets/Right.json";
import Wrong from "../../assets/Wrong.json";

export const EnglishQuestion = () => {
  const { english } = englishData;
  const { score, setScore } = useScore();
  const [randomNumber, setRandomNumber] = useState(4);
  const [message, setMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
    const [rightLottie, setRightLottie] = useState(false);
  const [wrongLottie, setWrongLottie] = useState(false);

  const answers = [];

  const generateAnswers = () => {
    english[randomNumber].wrongAnswer.map((answer) => answers.push(answer));
    answers.push(english[randomNumber].rightAnswer);
    answers.sort();
    /*for (let i = answers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    } return answers*/
  };

  generateAnswers();

  const generateQuestion = () => {
    setRandomNumber(Math.floor(Math.random() * english.length));
    generateAnswers();
    setDisableButton(false);
    setMessage("");
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  //Takes users answer and compare it to right answer to generate right/wrong-message
  const handleChoice = (answer) => {
    const rightAnswer = english[randomNumber].rightAnswer;
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
      <Title>Vad betyder ordet?</Title>
      <QuestionCard>{english[randomNumber].question}</QuestionCard>
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
      <Score>Du har {score} rätt hittills</Score>
      {message && <Message>{message}</Message>}
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
  background-color: var( --forest);
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
  background-color: var( --forest);
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
  box-shadow: 4px 4px var(--forestshadow);

  &:hover {
    background-color: var( --foresthover);
    box-shadow: 6px 6px var(--forestshadow);
    transition: 0.2s ease;
  }

  &:disabled {
    cursor: default;
    border: none;

    &:hover {
    background-color: var( --forest);
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

const Message = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  background-color: white;
  z-index: 2;
  font-size: 20px;
  border-radius: 20px;
`;

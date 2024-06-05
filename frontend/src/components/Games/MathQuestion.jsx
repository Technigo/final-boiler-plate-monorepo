import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import { useMath } from "../../contexts/MathContext";
import Lottie from "lottie-react";
import Right from "../../assets/Right.json";
import Wrong from "../../assets/Wrong.json";

export const MathQuestion = ({ focusRef, type }) => {
  const { mathGame, setMathGame, generateQuestion } = useMath()
  const currentScore = mathGame[Number(type)].score

  const [message, setMessage] = useState("")
  const [answerInput, setAnswerInput] = useState("")
  const numPadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [rightLottie, setRightLottie] = useState(false)
  const [wrongLottie, setWrongLottie] = useState(false)
 
  useEffect(() => {
    generateQuestion(Number(type))
    if (focusRef.current) {
      focusRef.current.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Checks if input matches correctAnswer and gives the user a message of "right/wrong"
  //Then starts a new question
  const checkAnswer = (event) => {
    event.preventDefault();
    if (answerInput == mathGame[Number(type)].correctAnswer) {
      setTimeout(() => setRightLottie(true), 1000);
      setTimeout(() => setRightLottie(false), 5000);

      const newGame = [...mathGame]
      newGame[Number(type)].score = currentScore + 1
      setTimeout(() => setMathGame(newGame), 3000)
    } else {
      setTimeout(() => setWrongLottie(true), 1000);
      setTimeout(
        () =>
          setMessage(
            `Rätt svar var ${mathGame[Number(type)].correctAnswer}.`
          ),
        3000
      )
      setTimeout(() => setWrongLottie(false), 5000)
    }
    setTimeout(() => newQuestion(), 5000)
  }

  //Resets message and input-field before generating new question
  const newQuestion = () => {
    setMessage("")
    setAnswerInput("")
    generateQuestion(Number(type))
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }

  //Puts users click on number-buttons into the inputfield
  const handleNumPadClick = (number) => {
    setAnswerInput((prev) => prev + number.toString())
    if (focusRef.current) {
      focusRef.current.focus()
    }
  };

  const handleDeleteClick = () => {
    setAnswerInput("")
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }

  return (
    <div>
      <HeaderDiv>
        <Title>{mathGame[Number(type)].mathType}</Title>
        <Progress>
          <Level>Nivå {mathGame[Number(type)].level}</Level>
          <Score>{currentScore}/25⭐</Score>
        </Progress>
      </HeaderDiv>
      <QuestionCard>{mathGame[Number(type)].question}</QuestionCard>
      {rightLottie && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          <Lottie animationData={Right} loop={false} />
        </div>
      )}
      {wrongLottie && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          <Lottie animationData={Wrong} loop={false} />
        </div>
      )}
      <Answer onSubmit={(event) => checkAnswer(event)}>
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
      {message && <Message>{message}</Message>}
    </div>
  );
}

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
  width: 300px;

  @media (min-width: 700px) {
    width: 600px;
    margin: 25px auto;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 26px;

  @media (min-width: 700px) {
    font-size: 36px;
  }
`;

const Progress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: center;
`;

const Level = styled.h3`
  color: black;
`;

const Score = styled.h3`
  color: black;
`;

const QuestionCard = styled.div`
  width: 300px;
  height: 110px;
  align-content: center;
  font-size: 30px;
  background-color: var(--ocean);
  color: white;
  padding: 20px;
  margin: 10px auto;
  z-index: 1;
  border-radius: 20px;
  text-align: center;

  @media (min-width: 700px) {
    width: 600px;
    height: 150px;
    font-size: 50px;
  }
`;
const Answer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  align-items: center;

  @media (min-width: 700px) {
    gap: 20px;
  }
`;

const AnswerInput = styled.input`
  color: #ffffff;
  background-color: var(--oceanhover);
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
    height: 54px;
    font-size: 16px;
  }
`;

const AnswerBtn = styled.button`
  color: white;
  background-color: var(--ocean);
  border-radius: 10px;
  border: none;
  width: 60px;
  height: 40px;
  margin-top: -4px;
  cursor: pointer;
  box-shadow: 4px 4px var(--oceanshadow);

  @media (min-width: 700px) {
    width: 70px;
    height: 50px;
    font-size: 16px;
  }

  &:hover {
    background-color: var(--oceanhover);
    background-color: var(--oceanhover);
    box-shadow: 6px 6px var(--oceanshadow);
    transition: 0.2s ease;
  }
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
  ${(props) =>
    props.className === "small" &&
    css`
      grid-column: span 1;
      grid-row: span 1;
      width: 80px;
    `}

  ${(props) =>
    props.className === "big" &&
    css`
      grid-column: span 2;
      grid-row: 4;
      width: 175px;
    `}

  ${(props) =>
    props.className === "delete" &&
    css`
      grid-column: 3;
      grid-row: 4;
      width: 80px;
    `}

  border-radius: 10px;
  border: none;
  background-color: var(--ocean);
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 3px 3px var(--oceanshadow);

  &:hover {
    background-color: var(--oceanhover);
    box-shadow: 4px 4px var(--oceanshadow);
    transition: 0.2s ease;
  }
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

MathQuestion.propTypes = {
  focusRef: PropTypes.any,
  type: PropTypes.string,
};

import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"

const MathContext = createContext()

export const MathProvider = ({ children }) => {
  const [mathType, setMathType] = useState("");
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState();

  //Generates different questions depending on the type of mathematical operation
  const generateAdditionQuestion = () => {
    const a = Math.floor(Math.random() * 100) + 1;
    const b = Math.floor(Math.random() * 100) + 1;
    setCorrectAnswer(a + b);
    setQuestion(`Vad är ${a}+${b}?`);
  };

  const generateSubtractionQuestion = () => {
    const a = Math.floor(Math.random() * 100) + 1;
    const b = Math.floor(Math.random() * 100) + 1;
    if (a >= b) {
      setCorrectAnswer(a - b);
      setQuestion(`Vad är ${a}-${b}?`);
    } else {
      setCorrectAnswer(b - a);
      setQuestion(`Vad är ${b}-${a}?`);
    }
  };

  const generateMultiplicationQuestion = () => {
    const a = Math.floor(Math.random() * 11);
    const b = Math.floor(Math.random() * 11);
    setCorrectAnswer(a * b);
    setQuestion(`Vad är ${a}*${b}?`);
  };

  const generateDivisionQuestion = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 11);
    const c = a * b;
    setCorrectAnswer(c / a);
    setQuestion(`Vad är ${c}/${a}?`);
  };

  //Decides which type of problem to generate based on prop from Math.jsx
  const generateQuestion = (type) => {
    switch (type) {
      case "addition":
        generateAdditionQuestion();
        break;
      case "subtraction":
        generateSubtractionQuestion();
        break;
      case "multiplication":
        generateMultiplicationQuestion();
        break;
      case "division":
        generateDivisionQuestion();
        break;
      default:
        generateAdditionQuestion();
    }
  };

  return (
    <MathContext.Provider
      value={{
        mathType,
        setMathType,
        question,
        setQuestion,
        correctAnswer,
        setCorrectAnswer,
        generateQuestion
      }}
    >
      {children}
    </MathContext.Provider>
  );
};

export const useMath = () => useContext(MathContext);

MathProvider.propTypes = {
  children: PropTypes.any,
}

/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"

const MathContext = createContext()

export const MathProvider = ({ children }) => {
  const [mathType, setMathType] = useState("addition")
  const [question, setQuestion] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState()
  /*const [mathLevel, setMathLevel] = useState({
    addition: 1,
    subtraction: 1,
    multiplication: 1,
    division: 1,
  })*/
  const [mathScore, setMathScore] = useState({
    addition: 0,
    subtraction: 0,
    multiplication: 0,
    division: 0,
  })
  const [savedQuestion, setSavedQuestion] = useState({
    addition: "",
    subtraction: "",
    multiplication: "",
    division: "",
  })
  const [savedAnswer, setSavedAnswer] = useState({
    addition: "",
    subtraction: "",
    multiplication: "",
    division: "",
  });

  //Generates different questions depending on the type of mathematical operation
  const generateAdditionQuestion = () => {
    const a = Math.floor(Math.random() * 100) + 1
    const b = Math.floor(Math.random() * 100) + 1
    setCorrectAnswer(a + b)
    setQuestion(`Vad är ${a}+${b}?`)
  }

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
    if (type === "addition" && savedQuestion.addition) {
      setQuestion(savedQuestion.addition)
      setCorrectAnswer(savedAnswer.addition)
      setSavedQuestion({ ...savedQuestion, addition: "" })
      setSavedAnswer({ ...savedAnswer, addition: "" })
    } else if (type === "subtraction" && savedQuestion.subtraction) {
      setQuestion(savedQuestion.subtraction)
      setCorrectAnswer(savedAnswer.subtraction)
      setSavedQuestion({ ...savedQuestion, subtraction: "" });
      setSavedAnswer({ ...savedAnswer, subtraction: "" });
    } else {
      switch (type) {
        case "addition":
          console.log("New addition")
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
    }
  }

  return (
    <MathContext.Provider
      value={{
        mathType,
        setMathType,
        question,
        setQuestion,
        correctAnswer,
        setCorrectAnswer,
        mathScore,
        setMathScore,
        savedQuestion,
        setSavedQuestion,
        savedAnswer,
        setSavedAnswer,
        generateQuestion
      }}
    >
      {children}
    </MathContext.Provider>
  )
}

export const useMath = () => useContext(MathContext);

MathProvider.propTypes = {
  children: PropTypes.any,
}

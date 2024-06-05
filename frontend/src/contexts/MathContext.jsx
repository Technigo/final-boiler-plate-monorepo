/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"

const MathContext = createContext()

export const MathProvider = ({ children }) => {
  const [mathGame, setMathGame] = useState([
    {
      mathType: "Addera",
      question: "",
      correctAnswer: null,
      level: 1,
      score: 0,
    },
    {
      mathType: "Subtrahera",
      question: "",
      correctAnswer: null,
      level: 1,
      score: 0,
    },
    {
      mathType: "Multiplicera",
      question: "",
      correctAnswer: null,
      level: 1,
      score: 0,
    },
    {
      mathType: "Dividera",
      question: "",
      correctAnswer: null,
      level: 1,
      score: 0,
    }
  ])

  //Generates different questions depending on the type of mathematical operation
  const generateAdditionQuestion = () => {
    const a = Math.floor(Math.random() * 100) + 1
    const b = Math.floor(Math.random() * 100) + 1
    const newGame = [...mathGame]
    newGame[0].question = `Vad är ${a}+${b}?`
    newGame[0].correctAnswer = a + b

    setMathGame(newGame)
  }

  const generateSubtractionQuestion = () => {
    const a = Math.floor(Math.random() * 100) + 1
    const b = Math.floor(Math.random() * 100) + 1
    if (a >= b) {
      const newGame = [...mathGame]
      newGame[1].question = `Vad är ${a}-${b}?`
      newGame[1].correctAnswer = a - b

      setMathGame(newGame)
    } else {
      const newGame = [...mathGame]
      newGame[1].question = `Vad är ${b}-${a}?`
      newGame[1].correctAnswer = b - a

      setMathGame(newGame);
    }
  }

  const generateMultiplicationQuestion = () => {
    const a = Math.floor(Math.random() * 11)
    const b = Math.floor(Math.random() * 11)
   
    const newGame = [...mathGame]
    newGame[2].question = `Vad är ${a}*${b}?`
    newGame[2].correctAnswer = a * b

    setMathGame(newGame)
  }

  const generateDivisionQuestion = () => {
    const a = Math.floor(Math.random() * 10) + 1
    const b = Math.floor(Math.random() * 11)
    const c = a * b

    const newGame = [...mathGame];
    newGame[3].question = `Vad är ${c}/${a}?`
    newGame[3].correctAnswer = c / a

    setMathGame(newGame)
  }

  //Decides which type of problem to generate based on prop from Math.jsx
  const generateQuestion = (type) => {
    switch (type) {
      case 0:
        generateAdditionQuestion();
        break;
      case 1:
        generateSubtractionQuestion();
        break;
      case 2:
        generateMultiplicationQuestion();
        break;
      case 3:
        generateDivisionQuestion();
        break;
      default:
        generateAdditionQuestion();
    }
  }
  
  return (
    <MathContext.Provider
      value={{
        mathGame,
        setMathGame,
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
/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"

const MathContext = createContext()

export const MathProvider = ({ children }) => {
  const [mathGame, setMathGame] = useState([
    {
      title: "Addera",
      question: "",
      correctAnswer: null,
      level: 1,
      score: 0,
      levelScore: 20,
    },
    {
      title: "Subtrahera",
      question: "",
      correctAnswer: null,
      level: 1,
      score: 0,
      levelScore: 20,
    },
    {
      title: "Multiplicera",
      question: "",
      correctAnswer: null,
      level: 1,
      score: 0,
      levelScore: 20,
    },
    {
      title: "Dividera",
      question: "",
      correctAnswer: null,
      level: 1,
      score: 0,
      levelScore: 20,
    },
  ])

  //Generates different questions depending on the type of mathematical operation
  const generateAdditionQuestion = () => {
    let a = 0
    let b = 0

    //Setting different numbers depending on level
    if (mathGame[0].level === 1) {
      a = Math.floor(Math.random() * 20) + 1
      b = Math.floor(Math.random() * 20) + 1
    } else if (mathGame[0].level === 2) {
      a = Math.floor(Math.random() * 50) + 1;
      b = Math.floor(Math.random() * 50) + 1;
    } else {
      a = Math.floor(Math.random() * 100) + 1;
      b = Math.floor(Math.random() * 100) + 1;
    }

    //Using numbers to create question and answer
    const newGame = [...mathGame]
    newGame[0].question = `Vad är ${a}+${b}?`
    newGame[0].correctAnswer = a + b
    setMathGame(newGame)
  }

  const generateSubtractionQuestion = () => {
    let a = 0
    let b = 0

    //Setting different numbers depending on level
    if (mathGame[1].level === 1) {
      a = Math.floor(Math.random() * 20) + 1;
      b = Math.floor(Math.random() * 20) + 1;
    } else if (mathGame[1].level === 2) {
      a = Math.floor(Math.random() * 50) + 1;
      b = Math.floor(Math.random() * 50) + 1;
    } else {
      a = Math.floor(Math.random() * 100) + 1;
      b = Math.floor(Math.random() * 100) + 1;
    }

    //Using numbers to create question and answer
    if (a >= b) {
      const newGame = [...mathGame];
      newGame[1].question = `Vad är ${a}-${b}?`;
      newGame[1].correctAnswer = a - b;

      setMathGame(newGame);
    } else {
      const newGame = [...mathGame];
      newGame[1].question = `Vad är ${b}-${a}?`;
      newGame[1].correctAnswer = b - a;

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
    //use next line for testing/demoing (only three questions before level-change)
    if (mathGame[type].score >= 3) {
    //if (mathGame[type].score >= mathGame[type].levelScore) {
      const newGame = [...mathGame]
      newGame[type].level = mathGame[type].level + 1
      newGame[type].score = 0
      setMathGame(newGame)
    }
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
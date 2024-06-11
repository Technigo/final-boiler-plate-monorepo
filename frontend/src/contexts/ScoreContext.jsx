/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"
import englishData from "../data/EnglishGameData.json"
import swedishData from "../data/SwedishGameData.json"

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [swedishGame, setSwedishGame] = useState([
    {
      title: "Hitta synonymen",
      level: 1,
      score: 0,
      levelScore: 20,
    },
  ]);
  const [englishGame, setEnglishGame] = useState([
    {
      title: "Översätt",
      level: 1,
      score: 0,
      levelScore: 20,
    },
  ]);

  const { english } = englishData;
  const { swedish } = swedishData;

  const [randomNumber, setRandomNumber] = useState(4)
  const [dataset, setDataset] = useState(english.filter((question) => question.level === 1))
  const [rightAnswer, setRightAnswer] = useState("")

  //Number to choose a question and answers-options to present
  const [answers, setAnswers] = useState([]);

  //States to handle right/wrong answer
  const [message, setMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false)

  //Shuffles array with both correct and wrong answers
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  //Puts corract and wrong answers in same array, shuffles them and sets them as options
  const generateAnswers = (index) => {
    //console.log(dataset)
    const newAnswers = [
      ...dataset[index].wrongAnswer,
      dataset[index].rightAnswer,
    ];
    setRandomNumber(dataset[index].question)
    setRightAnswer(dataset[index].rightAnswer)
    shuffleArray(newAnswers);
    setAnswers(newAnswers);
  }

  const generateQuestion = () => {
    if (englishGame[0].score >= 5) {
      const newGame = [...englishGame]
      newGame[0].level = englishGame[0].level + 1
      newGame[0].score = 0
      setEnglishGame(newGame)
    }
    const newList = english.filter((question) => question.level === englishGame[0].level)
    setDataset(newList)
    const newRandomNumber = Math.floor(Math.random() * newList.length);
    generateAnswers(newRandomNumber);
    setDisableButton(false);
    setMessage("");
  }

  return (
    <ScoreContext.Provider
      value={{
        swedishGame,
        setSwedishGame,
        englishGame,
        setEnglishGame,
        english,
        swedish,
        randomNumber,
        setRandomNumber,
        shuffleArray,
        answers,
        setAnswers,
        generateAnswers,
        message,
        setMessage,
        disableButton,
        setDisableButton,
        generateQuestion,
        rightAnswer
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export const useScore = () => useContext(ScoreContext)

ScoreProvider.propTypes = {
  children: PropTypes.any,
}

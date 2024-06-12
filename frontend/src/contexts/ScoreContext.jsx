/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"
import englishData from "../data/EnglishGameData.json"
import swedishData from "../data/SwedishGameData.json"

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  //Object for swedish-game
  const [swedishGame, setSwedishGame] = useState([
    {
      title: "Hitta synonymen",
      level: 1,
      score: 0,
      levelScore: 20,
    },
  ]);
  //Object for english-game
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

  const [question, setQuestion] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  //Message with feedback to user after each choice
  const [message, setMessage] = useState("");
  //Disables buttons when feedback is given
  const [disableButton, setDisableButton] = useState(false);

  //Shuffles array with both correct and wrong answers
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  //Puts corract and wrong answers in same array and sets them as options
  const generateAnswers = (index, list) => {
    const newAnswers = [...list[index].wrongAnswer, list[index].rightAnswer];
    setQuestion(list[index].question);
    setRightAnswer(list[index].rightAnswer);
    shuffleArray(newAnswers);
    setAnswers(newAnswers);
  };

  //Sets the basics before generating a question
  const generateQuestion = (language) => {
    let game = "";
    let list = [];
    let setGame = null;

    //Sets which datasets to use depending on language
    if (language === "english") {
      game = englishGame;
      list = english;
      setGame = setEnglishGame;
    }
    if (language === "swedish") {
      game = swedishGame;
      list = swedish;
      setGame = setSwedishGame;
    }

    //Checks the score and handles level-change
    //use next line for testing/demoing (only three questions before level-change)
    //if (game[0].score >= 3) {
    if (game[0].score >= game[0].levelScore) {
      const newGame = [...game];
      newGame[0].level = game[0].level + 1
      newGame[0].score = 0
      setGame(newGame)
    }

    //Filters the dataset depending on level
    const newList = list.filter((question) => question.level === game[0].level);
    const newRandomNumber = Math.floor(Math.random() * newList.length);
    generateAnswers(newRandomNumber, newList);
    setDisableButton(false);
    setMessage("");
  };

  return (
    <ScoreContext.Provider
      value={{
        swedishGame,
        setSwedishGame,
        englishGame,
        setEnglishGame,
        question,
        answers,
        message,
        setMessage,
        disableButton,
        setDisableButton,
        generateQuestion,
        rightAnswer,
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

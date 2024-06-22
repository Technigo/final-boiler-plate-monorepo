/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"
import englishData from "../data/EnglishGameData.json"
import swedishData from "../data/SwedishGameData.json"

const ScoreContext = createContext()

export const ScoreProvider = ({ children }) => {
  //Variables for handling connection to backend
  const accessToken = localStorage.getItem("accessToken")
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000"
  const [loading, setLoading] = useState(false)

  //Object for swedish-game
  const [swedishGame, setSwedishGame] = useState([
    {
      title: "Hitta synonymen",
      level: 1,
      score: 0,
      levelScore: 20,
    },
  ])
  //Object for english-game
  const [englishGame, setEnglishGame] = useState([
    {
      title: "Översätt",
      level: 1,
      score: 0,
      levelScore: 20,
    },
  ])

  //Gets data from right json-file
  const { english } = englishData
  const { swedish } = swedishData

  const [question, setQuestion] = useState("")
  const [rightAnswer, setRightAnswer] = useState("")
  const [answers, setAnswers] = useState([])
  const [progress, setProgress] = useState({})

  //Message with feedback to user after each choice
  const [message, setMessage] = useState("")

  //Disables buttons when feedback is given
  const [disableButton, setDisableButton] = useState(false)

  //Handles animation on level-change
  const [celebrateLottie, setCelebrateLottie] = useState(false)

  //Functions to generate questions and answers
  //Shuffles array with both correct and wrong answers
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  //Puts corract and wrong answers in same array and sets them as options
  const generateAnswers = (index, list) => {
    const newAnswers = [...list[index].wrongAnswer, list[index].rightAnswer]
    setQuestion(list[index].question)
    setRightAnswer(list[index].rightAnswer)
    shuffleArray(newAnswers)
    setAnswers(newAnswers)
  }

  //Sets the basics before generating a question
  const generateQuestion = (language) => {
    let game = ""
    let list = []
    let setGame = null

    //Sets which datasets to use depending on language
    if (language === "english") {
      game = englishGame
      list = english
      setGame = setEnglishGame
    }
    if (language === "swedish") {
      game = swedishGame
      list = swedish
      setGame = setSwedishGame
    }

    //Checks the score and handles level-change
    //use next line for testing/demoing (only three questions before level-change)
    //if (game[0].score >= 3) {
    if (game[0].score >= game[0].levelScore) {
      setCelebrateLottie(true)
      const newGame = [...game]
      newGame[0].level = game[0].level + 1
      newGame[0].score = 0
      setGame(newGame)
      setTimeout(() => setCelebrateLottie(false), 3000)
    }

    //Filters the dataset depending on level
    const newList = list.filter((question) => question.level === game[0].level)
    const newRandomNumber = Math.floor(Math.random() * newList.length)
    generateAnswers(newRandomNumber, newList)
    setDisableButton(false)
    setMessage("")
  }

  const registerAnswer = async ({
    subject,
    level,
    subcategory,
    score,
  }) => {
    try {
      const response = await fetch(`${apiUrl}/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({
          subject,
          subcategory,
          level,
          score,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save progress")
      }

      const data = await response.json()
      fetchProgress()
      console.log(data)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  // Fetching progress data from db
  const fetchProgress = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/progress`, {
        headers: {
          Authorization: accessToken,
        },
      })

      if (!response.ok) {
        console.log("Could not fetch")
        throw new Error("Failed to fetch progress")
      }

      const data = await response.json()
      setProgress(data.progress)
      const scoreOneEnglishTranslate = data.progress.progress.english.translate.levels[0].score
      const scoreTwoEnglishTranslate = data.progress.progress.english.translate.levels[1].score
      const scoreThreeEnglishTranslate = data.progress.progress.english.translate.levels[2].score

      const scoreOneSwedishSynonyms = data.progress.progress.swedish.synonyms.levels[0].score
      const scoreTwoSwedishSynonyms = data.progress.progress.swedish.synonyms.levels[1].score
      const scoreThreeSwedishSynonyms = data.progress.progress.swedish.synonyms.levels[2].score

      const levelScore = 20

      if (scoreOneEnglishTranslate < levelScore) {
        console.log("Engelska nivå 1")
        const newGame = [...englishGame]
        newGame[0].level = 1
        newGame[0].score = scoreOneEnglishTranslate
        setEnglishGame(newGame)
      } else if (scoreTwoEnglishTranslate < levelScore) {
        console.log("Engelska nivå 2")
        const newGame = [...englishGame]
        newGame[0].level = 2
        newGame[0].score = scoreTwoEnglishTranslate
        setEnglishGame(newGame)
      } else if (scoreThreeEnglishTranslate < levelScore) {
        console.log("Engelska nivå 3")
        const newGame = [...englishGame]
        newGame[0].level = 3
        newGame[0].score = scoreThreeEnglishTranslate
        setEnglishGame(newGame)
      } else {
        console.log("Engelska nivå Klar")
        const newGame = [...englishGame]
        newGame[0].level = 3
        newGame[0].score = levelScore
        setEnglishGame(newGame)
      }

      if (scoreOneSwedishSynonyms < levelScore) {
        console.log("Svenska nivå 1")
        const newGame = [...swedishGame]
        newGame[0].level = 1
        newGame[0].score = scoreOneSwedishSynonyms
        setSwedishGame(newGame)
      } else if (scoreTwoSwedishSynonyms < levelScore) {
        console.log("Svenska nivå 2")
        const newGame = [...swedishGame]
        newGame[0].level = 2
        newGame[0].score = scoreTwoSwedishSynonyms
        setSwedishGame(newGame)
      } else if (scoreThreeSwedishSynonyms < levelScore) {
        console.log("Svenska nivå 3")
        const newGame = [...swedishGame]
        newGame[0].level = 3
        newGame[0].score = scoreThreeSwedishSynonyms
        setSwedishGame(newGame)
      } else {
        console.log("Svenska nivå Klar")
        const newGame = [...swedishGame]
        newGame[0].level = 3
        newGame[0].score = levelScore
        setSwedishGame(newGame)
      }     
      
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

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
        progress,
        celebrateLottie,
        fetchProgress,
        loading,
        registerAnswer
      }}
    >
      {children}
    </ScoreContext.Provider>
  )
}

export const useScore = () => useContext(ScoreContext)

ScoreProvider.propTypes = {
  children: PropTypes.any,
}

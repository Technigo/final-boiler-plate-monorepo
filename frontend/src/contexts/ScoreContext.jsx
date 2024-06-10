/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [swedishGame, setSwedishGame] = useState([
    {
      title: "Hitta synonymen",
      level: 1,
      score: 0,
      levelScore: 20,
    },
  ])
  const [englishGame, setEnglishGame] = useState([
    {
      title: "Översätt",
      level: 1,
      score: 0,
      levelScore: 20,
    },
  ])

  return (
    <ScoreContext.Provider
      value={{
        swedishGame,
        setSwedishGame,
        englishGame,
        setEnglishGame
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

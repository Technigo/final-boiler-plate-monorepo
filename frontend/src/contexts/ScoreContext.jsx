import { createContext, useContext, useState } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {

  const [score, setScore] = useState(0);
  const [mathType, setMathType] = useState("");


  return (
    <ScoreContext.Provider
      value={{
        score,
        setScore,
        mathType,
        setMathType,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);

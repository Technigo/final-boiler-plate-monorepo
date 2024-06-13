import styled from "styled-components";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LanguageQuestion } from "./LanguageQuestion.jsx";

export const English = () => {
  const [gameTypeNumber, setGameTypeNumber] = useState();

  const handleChoice = (type) => {
    setGameTypeNumber(type);
  };

  if (gameTypeNumber) {
    return (
      <EnglishGame>
        <BackButton onClick={() => setGameTypeNumber(null)}>
          <BackIcon />
        </BackButton>
        <LanguageQuestion
          type={gameTypeNumber}
          language="english"
          color="forest"
          subcategory="translate"
        />
      </EnglishGame>
    );
  } else {
    return (
      <EnglishGame>
        <Link to="/spela">
          <BackIcon />
        </Link>
        <EnglishTitle>VÄLJ SPEL</EnglishTitle>
        <GameTypeButton
          value="0"
          onClick={(event) => handleChoice(event.target.value)}
        >
          Översätt
        </GameTypeButton>
      </EnglishGame>
    );
  }
};

const EnglishGame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  height: 30px;
`;

const BackIcon = styled(IoArrowBackCircleOutline)`
  font-size: 40px;
  color: #000000;
  cursor: pointer;
`;

const EnglishTitle = styled.h2`
  color: black;
`;

const GameTypeButton = styled.button`
  background-color: var(--forest);
  color: white;
  width: 270px;
  height: 50px;
  margin: 10px auto;
  padding: 10px 0;
  z-index: 1;
  border-radius: 15px;
  border: none;
  z-index: 1;
  font-size: 20px;
  padding: 15px;
  cursor: pointer;
  box-shadow: 4px 4px var(--forestshadow);

  &:hover {
    background-color: var(--foresthover);
    box-shadow: 6px 6px var(--forestshadow);
    transition: 0.2s ease;
  }

  &:disabled {
    cursor: default;
    border: none;

    &:hover {
      background-color: var(--forest);
    }
  }

  @media (min-width: 700px) {
    width: 270px;
    height: 60px;
    padding: 20px;
  }
`;

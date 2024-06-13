import styled from "styled-components"
import { IoArrowBackCircleOutline } from "react-icons/io5"
import { LiaReadme } from "react-icons/lia"
import Lottie from "lottie-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useScore } from "../../contexts/ScoreContext.jsx"
import { LanguageQuestion } from "./LanguageQuestion.jsx"
import Celebrate from "../../assets/Celebrate.json"

export const Swedish = () => {
  const { swedishGame, celebrateLottie } = useScore()
  const [gameTypeNumber, setGameTypeNumber] = useState()

  const handleChoice = (type) => {
    setGameTypeNumber(type)
  }

  if (gameTypeNumber) {
    return (
      <SwedishGameSite>
        <HeaderDiv>
          <TitleDiv>
            <BackButton onClick={() => setGameTypeNumber(null)}>
              <BackIcon />
            </BackButton>
            <Title>{swedishGame[Number(gameTypeNumber)].title}</Title>
            {celebrateLottie && (
              <Lottie
                animationData={Celebrate}
                loop={false}
                autoplay
                style={{
                  width: 150,
                  height: 150,
                  position: "absolute",
                  left: 568,
                  top: -50,
                }}
              />
            )}
          </TitleDiv>
          <Progress>
            <Level>Nivå {swedishGame[Number(gameTypeNumber)].level}</Level>
            <Score>
              ⭐{swedishGame[Number(gameTypeNumber)].score}/
              {swedishGame[Number(gameTypeNumber)].levelScore}
            </Score>
          </Progress>
        </HeaderDiv>

        <LanguageQuestion
          type={gameTypeNumber}
          language="swedish"
          color="sunset"
          subcategory="synonyms"
        />
      </SwedishGameSite>
    )
  } else {
    return (
      <SwedishGameSite>
        <HeaderDiv>
          <TitleDiv>
            <BackButton>
              <Link to="/spela">
                <BackIcon />
              </Link>
            </BackButton>
            <Title>VÄLJ SPEL</Title>
          </TitleDiv>
        </HeaderDiv>
        <Choices>
          <GameTypeButton
            value="0"
            onClick={(event) => handleChoice(event.target.value)}
          >
            Nivå {swedishGame[0].level}
            <ButtonTextDiv>
              <ButtonTitle>Synonymer</ButtonTitle>
              <ButtonSign>
                <LiaReadme />
              </ButtonSign>
            </ButtonTextDiv>
            {swedishGame[0].score}/{swedishGame[0].levelScore}
          </GameTypeButton>
        </Choices>
      </SwedishGameSite>
    )
  }
}

const SwedishGameSite = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
`

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto 10px;
  width: 300px;
  gap: 10px;

  @media (min-width: 700px) {
    flex-direction: row;
    width: 600px;
    margin: 35px auto 25px;
    padding: 0 30px;
  }
`

const TitleDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  position: relative;
  right: 130px;

  @media (min-width: 700px) {
    width: 540px;
  }
`

const BackButton = styled.button`
  background: none;
  border: none;
  height: 60px;
  padding: 0 20px;
`

const BackIcon = styled(IoArrowBackCircleOutline)`
  font-size: 40px;
  color: #000000;
  cursor: pointer;

  @media (min-width: 700px) {
    font-size: 60px;
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: 40px;

  @media (min-width: 700px) {
    font-size: 45px;
  }
`

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  gap: 10px;

  @media (min-width: 700px) {
    flex-direction: column;
    width: 60px;
  }
`

const Level = styled.h3`
  color: black;
`

const Score = styled.h3`
  color: black;
`

const Choices = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  margin: 10px auto;

  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 580px;
  }
`

const GameTypeButton = styled.button`
  background-color: var(--sunset);
  color: white;
  font-size: 18px;
  width: 270px;
  height: 60px;
  margin: 10px auto;
  padding: 10px 0;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  box-shadow: 4px 4px var(--sunsetshadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  &:hover {
    background-color: var(--sunsethover);
    box-shadow: 6px 6px var(--sunsetshadow);
    transition: 0.2s ease;
  }

  &:disabled {
    cursor: default;
    border: none;

    &:hover {
      background-color: var(--sunset);
    }
  }

  @media (min-width: 700px) {
    width: 270px;
    height: 120px;
    padding: 10px 20px;
  }
`

const ButtonTextDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 220px;
  height: 20px;
`

const ButtonTitle = styled.p`
  font-size: 30px;
  text-align: center;
`

const ButtonSign = styled.p`
  font-size: 50px;
`

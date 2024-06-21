import styled from "styled-components"
import { IoArrowBackCircleOutline } from "react-icons/io5"
import { PiTranslate } from "react-icons/pi"
import Lottie from "lottie-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useScore } from "../../contexts/ScoreContext.jsx"
import { useUser } from "../../contexts/UserContext.jsx"
import { LanguageQuestion } from "./LanguageQuestion.jsx"
import { Footer } from "../Footer"
import Celebrate from "../../assets/Celebrate.json"

export const English = () => {
  const { englishGame, celebrateLottie, showProgress} = useScore()
  const { isLoggedIn} = useUser()
  const [gameTypeNumber, setGameTypeNumber] = useState()

  //Start by checking for progress
  useEffect(() => {
    if (isLoggedIn) { 
      showProgress()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChoice = (type) => {
    setGameTypeNumber(type)
  }

  if (gameTypeNumber) {
    return (
      <EnglishGameSite>
        <HeaderDiv>
          <TitleDiv>
            <BackButton onClick={() => setGameTypeNumber(null)}>
              <BackIcon />
            </BackButton>
            <Title>{englishGame[Number(gameTypeNumber)].title}</Title>
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
            <Level>Nivå {englishGame[Number(gameTypeNumber)].level}</Level>
            <Score>
              ⭐{englishGame[Number(gameTypeNumber)].score}/
              {englishGame[Number(gameTypeNumber)].levelScore}
            </Score>
          </Progress>
        </HeaderDiv>

        <LanguageQuestion
          type={gameTypeNumber}
          language="english"
          color="forest"
          subcategory="translate"
        />
      </EnglishGameSite>
    )
  } else {
    return (
      <>
        <EnglishGameSite>
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
              <ButtonTextDiv>
                <ButtonTitle>Översätt</ButtonTitle>
                <ButtonSign>
                  <PiTranslate />
                </ButtonSign>
              </ButtonTextDiv>
              <ProgressDiv>
                <p>Nivå {englishGame[0].level}</p>
                <p>
                  {englishGame[0].score}/{englishGame[0].levelScore}
                </p>
              </ProgressDiv>
            </GameTypeButton>
          </Choices>
        </EnglishGameSite>
        <Footer />
      </>
    )
  }
}

const EnglishGameSite = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
`

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;
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
  align-items: center;
  position: relative;
  right: 20px;

  @media (min-width: 700px) {
    width: 540px;
    gap: 30px;
    position: relative;
    right: 130px;
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
  font-size: 35px;

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
  background-color: var(--forest);
  color: white;
  font-size: 18px;
  width: 270px;
  height: 70px;
  margin: 10px auto;
  padding: 20px 0;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  box-shadow: 4px 4px var(--forestshadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

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
    height: 120px;
    padding: 10px 20px;
    gap: 20px;
  }
`

const ProgressDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 20px;
  font-size: 15px;

  @media (min-width: 700px) {
    width: 220px;
    height: 20px;
    font-size: 20px;
  }
`

const ButtonTextDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 20px;

  @media (min-width: 700px) {
    width: 220px;
    height: 20px;
    margin: 10px auto;
  }
`

const ButtonTitle = styled.p`
  font-size: 20px;

  @media (min-width: 700px) {
    font-size: 30px;
  }
`

const ButtonSign = styled.p`
  font-size: 30px;
  position: relative;
  display: flex;
  align-items: center;

  @media (min-width: 700px) {
    font-size: 50px;
  }
`

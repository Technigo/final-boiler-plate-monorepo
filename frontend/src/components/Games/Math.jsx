import styled from "styled-components"
import { IoArrowBackCircleOutline } from "react-icons/io5"
import Lottie from "lottie-react"
import { Link } from "react-router-dom"
import { useState, useRef } from "react"
import { useMath } from "../../contexts/MathContext"
import { MathQuestion } from "./MathQuestion"
import Celebrate from "../../assets/Celebrate.json"

export const Math = () => {
  const { mathGame, celebrateLottie } = useMath()
  const [gameTypeNumber, setGameTypeNumber] = useState()
  const focusRef = useRef(null)

  const handleChoice = (type) => {
    setGameTypeNumber(type)
  }

  if (gameTypeNumber) {
    return (
      <MathGameSite>
        <HeaderDiv>
          <TitleDiv>
            <BackButton onClick={() => setGameTypeNumber(null)}>
              <BackIcon />
            </BackButton>
            <Title>{mathGame[Number(gameTypeNumber)].title}</Title>
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
            <Level>Nivå {mathGame[Number(gameTypeNumber)].level}</Level>
            <Score>
              ⭐{mathGame[Number(gameTypeNumber)].score}/
              {mathGame[Number(gameTypeNumber)].levelScore}
            </Score>
          </Progress>
        </HeaderDiv>
        <MathQuestion focusRef={focusRef} type={gameTypeNumber} />
      </MathGameSite>
    )
  } else {
    return (
      <MathGameSite>
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
            Nivå {mathGame[0].level}
            <ButtonTextDiv>
              <ButtonTitle>Addition</ButtonTitle>
              <ButtonSign>+</ButtonSign>
            </ButtonTextDiv>
            {mathGame[0].score}/{mathGame[0].levelScore}
          </GameTypeButton>
          <GameTypeButton
            value="1"
            onClick={(event) => handleChoice(event.target.value)}
          >
            Nivå {mathGame[1].level}
            <ButtonTextDiv>
              <ButtonTitle>Subtraktion</ButtonTitle>
              <ButtonSign>-</ButtonSign>
            </ButtonTextDiv>
            {mathGame[1].score}/{mathGame[1].levelScore}
          </GameTypeButton>
          <GameTypeButton
            value="2"
            onClick={(event) => handleChoice(event.target.value)}
          >
            Nivå {mathGame[2].level}
            <ButtonTextDiv>
              <ButtonTitle>Multiplikation</ButtonTitle>
              <MultiplySign>*</MultiplySign>
            </ButtonTextDiv>
            {mathGame[2].score}/{mathGame[2].levelScore}
          </GameTypeButton>
          <GameTypeButton
            value="3"
            onClick={(event) => handleChoice(event.target.value)}
          >
            Nivå {mathGame[3].level}
            <ButtonTextDiv>
              <ButtonTitle>Division</ButtonTitle>
              <ButtonSign>÷</ButtonSign>
            </ButtonTextDiv>
            {mathGame[3].score}/{mathGame[3].levelScore}
          </GameTypeButton>
        </Choices>
      </MathGameSite>
    )
  }
}

const MathGameSite = styled.div`
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
  background-color: var(--ocean);
  color: white;
  font-size: 18px;
  width: 270px;
  height: 60px;
  margin: 10px auto;
  padding: 10px 0;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  box-shadow: 4px 4px var(--oceanshadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  &:hover {
    background-color: var(--oceanhover);
    box-shadow: 6px 6px var(--oceanshadow);
    transition: 0.2s ease;
  }

  &:disabled {
    cursor: default;
    border: none;

    &:hover {
      background-color: var(--ocean);
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
`

const ButtonSign = styled.p`
  font-size: 50px;
  position: relative;
  bottom: 7px;
`

const MultiplySign = styled.p`
  font-size: 50px;
  position: relative;
  bottom: -3px;
`

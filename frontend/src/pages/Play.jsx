import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useUser } from "../contexts/UserContext"
import { Footer } from "../components/Footer"

export const Play = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useUser()

  useEffect(() => {
    const firstName = localStorage.getItem("firstName")
    if (firstName) {
      setUser({ firstName: firstName })
    }
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      setIsLoggedIn(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PlayContainer>
        <PlayTitle>
          {isLoggedIn ? (
            <>
              Välkommen till PluggIn, {user.firstName}. Redo att spela några
              spel?
            </>
          ) : (
            <>Du är inte inloggad. <br /> Dina framsteg kommer inte att sparas.</>
          )}
        </PlayTitle>
        <GamesCards>
          <Link to={`/spela/matte`}>
            <GameCard $math>Matte</GameCard>
          </Link>
          <Link to={`/spela/svenska`}>
            <GameCard $swedish>Svenska</GameCard>
          </Link>
          <Link to={`/spela/engelska`}>
            <GameCard $english>Engelska</GameCard>
          </Link>
        </GamesCards>
      </PlayContainer>
      <Footer />
    </>
  )
}

const PlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
`

const PlayTitle = styled.h2`
  color: black;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  text-align: center;
  margin: 40px auto 20px;
  width: 300px;

  @media (min-width: 700px) {
    width: 600px;
  }
`

const GamesCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media (min-width: 700px) {
    flex-direction: row;
  }
`

const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  gap: 30px;
  width: 290px;
  height: 130px;
  margin: 20px auto;
  color: white;
  background-color: var(--forest);
  font-size: 50px;

  @media (min-width: 700px) {
    max-width: 600px;
    min-width: 200px;
    height: 220px;
    font-size: 60px;
  }

  &:hover {
    transition: 0.2s ease;
  }

  ${({ $math }) =>
    $math &&
    css`
      box-shadow: 10px 10px var(--oceanshadow);
      background-color: var(--ocean);

      &:hover {
        box-shadow: 15px 15px var(--oceanshadow);
      }
    `}

  ${({ $swedish }) =>
    $swedish &&
    css`
      background-color: var(--sunset);
      box-shadow: 10px 10px var(--sunsetshadow);

      &:hover {
        box-shadow: 15px 15px var(--sunsetshadow);
      }
    `}

  ${({ $english }) =>
    $english &&
    css`
      background-color: var(--forest);
      box-shadow: 10px 10px var(--forestshadow);

      &:hover {
        box-shadow: 15px 15px var(--forestshadow);
      }
    `}

   @media (min-width: 700px) {
    margin: 40px;
  }
`
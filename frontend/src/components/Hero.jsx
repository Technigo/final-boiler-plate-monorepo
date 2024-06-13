import styled from "styled-components"
import { Button } from "./Button"
import { Link } from "react-router-dom"

export const Hero = () => {
  const content = {
    heading: "Välkommen till Pluggin'",
    intro:
      "Sidan där du kan förbättra dina kunskaper i olika skolämnen. Registrera dig för att spara dina framsteg i spelen.",
    heroImgUrl: "./hero.png",
    heroImgAlt: "Barn studerar i soffa",
  }

  return (
    <HeroContainer>
      <TextContainer>
        <HeroHeading>{content.heading}</HeroHeading>
        <HeroIntro>{content.intro}</HeroIntro>
        <Link to={`/registering`}>
          <Button type="button">Registrera dig</Button>
        </Link>
      </TextContainer>
    </HeroContainer>
  )
}

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 220px;

  @media (min-width: 700px) {
    flex-direction: column;
    justify-content: space-between;
    min-height: 310px;
  }
`

const TextContainer = styled.div`
  padding: 15px;
  text-align: center;
  margin-top: 10px;

  @media (min-width: 700px) {
    flex: 1;
    margin-top: 40px;
    padding: 20px;
  }
`

const HeroHeading = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;

  @media (min-width: 700px) {
    font-size: 2.5rem;
  }
`

const HeroIntro = styled.p`
  font-size: 1rem;
  max-width: 500px;
  margin: 0 auto;

  @media (min-width: 700px) {
    font-size: 1.2rem;
  }
`

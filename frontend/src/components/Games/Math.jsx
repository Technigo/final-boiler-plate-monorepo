import styled from "styled-components";
import { useMath } from "../../contexts/MathContext";
import { MathQuestion } from "./MathQuestion";

export const Math = () => {
  const { setMathType, generateQuestion } = useMath()
  
  const handleChoice = (type) => {
    setMathType(type)
    generateQuestion(type)
  }

  return (
    <>
      <MathTitle>Matte</MathTitle>
      <MathTitle>Vad vill du öva på?</MathTitle>
      <MathTypeButton
        value="addition"
        onClick={(event) => handleChoice(event.target.value)}
      >
        +
      </MathTypeButton>
      <MathTypeButton
        value="subtraction"
        onClick={(event) => handleChoice(event.target.value)}
      >
        -
      </MathTypeButton>
      <MathTypeButton
        value="multiplication"
        onClick={(event) => handleChoice(event.target.value)}
      >
        *
      </MathTypeButton>
      <MathTypeButton
        value="division"
        onClick={(event) => handleChoice(event.target.value)}
      >
        ÷
      </MathTypeButton>
      <MathQuestion />
    </>
  );
};
const MathTitle = styled.h2`
  color: black;
`

const MathTypeButton = styled.button`
  color: white;
  background-color: black;
`


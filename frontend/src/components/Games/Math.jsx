import styled from "styled-components";
import { Question } from "./Question";

export const Math = () => {
  return (
    <>
      <MathTitle>Let&apos;s play a math game!</MathTitle>
      <Question />
    </>
  )
};
const MathTitle = styled.h2`
  color: black;
`;


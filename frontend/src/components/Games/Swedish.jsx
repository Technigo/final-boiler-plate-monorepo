import styled from "styled-components";
import { Question } from "./QuestionSwedish.jsx";

export const Swedish = () => {
  return (
    <>
      <SwedishTitle>Let&apos;s play a Swedish game!</SwedishTitle>
      <Question />
    </>
  )
};
const SwedishTitle = styled.h2`
  color: black;
`;

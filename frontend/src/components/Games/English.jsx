import styled from "styled-components";
import { Question } from "./QuestionEnglish.jsx";

export const English = () => {
  return (
    <>
      <EnglishTitle>Let&apos;s play an English game!</EnglishTitle>
      <Question />
    </>
  )
};
const EnglishTitle = styled.h2`
  color: black;
`;

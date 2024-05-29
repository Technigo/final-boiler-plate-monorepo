import styled from "styled-components";
import { Question } from "./Question.jsx";

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

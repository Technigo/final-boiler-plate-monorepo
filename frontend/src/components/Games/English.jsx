import styled from "styled-components";
import { EnglishQuestion } from "./EnglishQuestion.jsx";

export const English = () => {
  return (
    <>
      <EnglishTitle>Engelska</EnglishTitle>
      <EnglishQuestion />
    </>
  );
};
const EnglishTitle = styled.h2`
  color: black;
`;

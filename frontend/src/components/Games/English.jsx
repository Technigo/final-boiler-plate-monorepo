import styled from "styled-components";
import { EnglishQuestion } from "./EnglishQuestion.jsx";

export const English = () => {
  return (
    <EnglishGame>
      <EnglishTitle />
      <EnglishQuestion />
    </EnglishGame>
  );
};

const EnglishGame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
`;

const EnglishTitle = styled.h2`
  color: black;
`;

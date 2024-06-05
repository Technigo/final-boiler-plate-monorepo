import styled from "styled-components";
import { SwedishQuestion } from "./SwedishQuestion.jsx";

export const Swedish = () => {
  return (
    <SwedishGame>
      <SwedishTitle />
      <SwedishQuestion />
    </SwedishGame>
  );
};

const SwedishGame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
`;

const SwedishTitle = styled.h2`
  color: black;
`;

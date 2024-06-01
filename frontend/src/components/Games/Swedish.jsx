import styled from "styled-components";
import { SwedishQuestion } from "./SwedishQuestion.jsx";

export const Swedish = () => {
  return (
    <>
      <SwedishTitle>Svenska</SwedishTitle>
      <SwedishQuestion />
    </>
  );
};
const SwedishTitle = styled.h2`
  color: black;
`;

import LogoText from "../LogoText";
import { Navbar } from "./Navbar";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  //align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #9eb7bf;
  border-radius: 0 0 20px 20px;
  /* position: fixed;
  top: 0;
  width: 100%; */
  padding: 10px 5px 0 10px;

  @media (min-width: 1100px) {
    padding: 10px 30px 0 10px;
  }
`;

export const Header = () => {
  return (
    <StyledHeader>
      <LogoText />
      <Navbar />
    </StyledHeader>
  );
};

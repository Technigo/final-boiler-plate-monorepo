import LogoText from "../LogoText";
import { Navbar } from "./Navbar";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <LogoText />
      <Navbar />
    </StyledHeader>
  );
};

import { LogoText } from "../LogoText";
import { Navbar } from "./Navbar";
import styled from "styled-components";

const StyledHeader = styled.div``;

export const Header = () => {
  return (
    <StyledHeader>
      <LogoText />
      <Navbar />
    </StyledHeader>
  );
};

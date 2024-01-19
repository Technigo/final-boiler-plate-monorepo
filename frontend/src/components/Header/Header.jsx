import LogoText from "../LogoText";
import { Navbar } from "./Navbar";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 30px 0;
  background: var(--purple);
`;

// Define the Header component as a functional component.
export const Header = () => {
  return (
    <StyledHeader>
      <LogoText /> {/* LogoText component */}
      <Navbar /> {/* Navbar component */}
    </StyledHeader>
  );
};

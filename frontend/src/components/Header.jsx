import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../contexts/UserContext";
import logo from "/src/assets/Logo-header.png";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export const Header = () => {
  const { isLoggedIn, signout } = useLogin();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} />
      </Link>
      <MenuIcon onClick={toggleHamburger}>
        {hamburgerOpen ? <FaTimes /> : <FaBars />}
      </MenuIcon>
      <NavMenu open={hamburgerOpen}>
        {isLoggedIn ? (
          <LoggedIn>
            <Link to="/play" onClick={toggleHamburger}>
              <Play>Spela</Play>
            </Link>
            <Link to="/progress" onClick={toggleHamburger}>
              <MyProgress>Min sida</MyProgress>
            </Link>
            <SignOut onClick={signout}>
              <SignOutText>Logga ut</SignOutText>
              <SignOutIcon />
            </SignOut>
          </LoggedIn>
        ) : (
          <StartPage>
            <Link to="/play" onClick={toggleHamburger}>
              <Play>Spela</Play>
            </Link>
            <Link to="/registering" onClick={toggleHamburger}>
              <Register>Registera dig</Register>
            </Link>
            <Link to="/logga-in" onClick={toggleHamburger}>
              <Login>Logga in</Login>
            </Link>
          </StartPage>
        )}
      </NavMenu>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  background-color: var(--daffodil);
  width: 100%;
  height: 60px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-weight: 500;

  @media (min-width: 700px) {
    height: 80px;
    padding: 0 120px;
  }
`;

const Logo = styled.img`
  width: auto;
  height: 55px;
  margin-top: 5px;
  align-items: center;
`;

const MenuIcon = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 24px;
  color: #363636;

  @media (min-width: 700px) {
    display: none;
  }
`;

const NavMenu = styled.div`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 60px;
  right: 0;
  background-color: var(--daffodilhover);
  width: 50%;
  padding: 20px;

  @media (min-width: 700px) {
    background-color: var(--daffodil);
    display: flex;
    flex-direction: row;
    position: static;
    width: auto;
    padding: 0;
  }
`;

const LoggedIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (min-width: 700px) {
    flex-direction: row;
    gap: 60px;
  }
`;

const StartPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (min-width: 700px) {
    flex-direction: row;
    gap: 60px;
  }
`;

const Register = styled.p`
  color: #363636;
  cursor: pointer;

  &:hover {
    color: var(--oceanhover);
  }

  &:active {
    color: var(--oceanactive);
  }
`;

const Login = styled.p`
  color: #363636;
  cursor: pointer;

  &:hover {
    color: var(--oceanhover);
  }

  &:active {
    color: var(--oceanactive);
  }
`;

const Play = styled.p`
  color: #363636;
  cursor: pointer;

  &:hover {
    color: var(--oceanhover);
  }

  &:active {
    color: var(--oceanactive);
  }
`;

const MyProgress = styled.p`
  color: #363636;
  cursor: pointer;

  &:hover {
    color: var(--oceanhover);
  }

  &:active {
    color: var(--oceanactive);
  }
`;

const SignOut = styled.div`
  display: flex;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
`;

const SignOutText = styled.p`
  color: #363636;
  cursor: pointer;
  
  &:hover {
    color: var(--oceanhover);
  }

  &:active {
    color: var(--oceanactive);
  }
`;

const SignOutIcon = styled(FiLogOut)`
  font-size: 22px;
  color: #363636;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: var(--oceanhover);
  }

  &:active {
    color: var(--oceanactive);
  }
`;
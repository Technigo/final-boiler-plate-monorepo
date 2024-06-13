import { Link } from "react-router-dom"
import styled from "styled-components"
import { useLogin } from "../contexts/UserContext"
import logo from "/src/assets/pluggin-logo.png"
import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import { SlideInPanel } from "./SlideInPanel"
import { RegistrationForm } from "./RegistrationForm"
import { Login } from "./Login"

export const Header = () => {
  const { isLoggedIn, signout } = useLogin()
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState({ register: false, login: false })

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen)
  }

  const openPanel = (type) => {
    setPanelOpen({ ...panelOpen, [type]: true })
    setHamburgerOpen(false)
  }

  const closePanel = () => {
    setPanelOpen({ register: false, login: false })
  }

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
            <Link to="/spela" onClick={toggleHamburger}>
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
            <Link to="/spela" onClick={toggleHamburger}>
              <Play>Spela</Play>
            </Link>
            <StyledButton onClick={() => openPanel("register")}>
              Registrera dig
            </StyledButton>
            <StyledButton onClick={() => openPanel("login")}>
              Logga in
            </StyledButton>
          </StartPage>
        )}
      </NavMenu>

      <SlideInPanel isOpen={panelOpen.register} onClose={closePanel}>
        <SlidingPanelContent>
          <RegistrationForm />
        </SlidingPanelContent>
      </SlideInPanel>

      <SlideInPanel isOpen={panelOpen.login} onClose={closePanel}>
        <SlidingPanelContent>
          <Login />
        </SlidingPanelContent>
      </SlideInPanel>
    </HeaderContainer>
  )
}

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
  z-index: 10;
  position: sticky;
  top: 0;

  @media (min-width: 700px) {
    height: 80px;
    padding: 0 120px;
  }
`

const Logo = styled.img`
  width: auto;
  height: 55px;
  margin-top: 5px;
  align-items: center;
`

const MenuIcon = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 24px;
  color: #363636;

  @media (min-width: 700px) {
    display: none;
  }
`

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
`

const LoggedIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (min-width: 700px) {
    flex-direction: row;
    gap: 60px;
  }
`

const StartPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (min-width: 700px) {
    flex-direction: row;
    gap: 60px;
  }
`
/*
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
`;*/

const Play = styled.p`
  color: #363636;
  cursor: pointer;

  &:hover {
    color: var(--oceanhover);
  }

  &:active {
    color: var(--oceanactive);
  }
`

const MyProgress = styled.p`
  color: #363636;
  cursor: pointer;

  &:hover {
    color: var(--oceanhover);
  }

  &:active {
    color: var(--oceanactive);
  }
`

const SignOut = styled.div`
  display: flex;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
`

const SignOutText = styled.p`
  color: #363636;
  cursor: pointer;

  &:hover {
    color: var(--oceanhover);
  }

  &:active {
    color: var(--oceanactive);
  }
`

const SignOutIcon = styled(FiLogOut)`
  font-size: 22px;
  color: #363636;
  align-items: center;
  cursor: pointer;
`

const SlidingPanelContent = styled.div`
  padding: 10px 20px;
`

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  font-size: inherit;

  color: #363636;
  cursor: pointer;

  &:hover {
    color: var(--oceanhover);
  }

  &:active {
    color: var(--oceanactive);
  }
`

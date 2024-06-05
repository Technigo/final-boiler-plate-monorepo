import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../contexts/UserContext";
import signoutIcon from "/src/assets/signouticon.png";
import logo from "/src/assets/Logo-header.png";

export const Header = () => {
  const { isLoggedIn, signout } = useLogin();

  if (isLoggedIn) {
    return (
      <HeaderContainer>
      <Logo src={logo}/>
        <LoggedIn className="loggedIn">
          <Link to={`/play`}>
            <Play>SPEL</Play>
          </Link>
          <Link to={`/progress`}>
            <MyProgress>MIN SIDA</MyProgress>
          </Link>
          <SignOut>
            <SignOutText onClick={signout}>LOGGA UT</SignOutText>
            <SignOutIcon onClick={signout} src={signoutIcon} />
          </SignOut>
        </LoggedIn>
      </HeaderContainer>
    );
  } else {
    return (
      <HeaderContainer>
        <StartPage className="startPage">
          <Link to={`/registering`}>
            <Register>Registera dig</Register>
          </Link>
          <Link to={`/logga-in`}>
            <Login>Logga in</Login>
          </Link>
        </StartPage>
      </HeaderContainer>
    );
  }
};

const HeaderContainer = styled.div`
  background-color: var(--daffodil);
  width: 100%;
  height: 50px;
  position: relative;
  /* margin: -8px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
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

const StartPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100vh;
`;

const Register = styled.p`
  color: var(--ocean);
  cursor: pointer;

  &:hover {
    color: var(--oceanhover);
  }

  &:active {
    color: var(--oceanactive);
  }
`;

const Login = styled.p`
  color: var(--ocean);
  cursor: pointer;

  &:hover {
    color: var(--oceanhover);
  }

  &:active {
    color: var(--oceanactive);
  }
`;

const LoggedIn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 60px;
  padding: 20px;
  width: 100vh;
  color: white;
`;

const Play = styled.p`
  color: var(--ocean);
  cursor: pointer;

  &:hover {
    color: var(--oceanhover);
  }

  &:active {
    color: var(--oceanactive);
  }
`;

const MyProgress = styled.p`
  color: var(--ocean);
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

  &:hover {
    opacity: 70%;
  }
`;

const SignOutText = styled.p`
  color: var(--ocean);
  cursor: pointer;

  &:active {
    color: var(--oceanactive);
  }
`;

const SignOutIcon = styled.img`
  width: 17px;
  height: 22px;
  align-items: center;
  /* padding-top: 17px; */
  opacity: 100%;
`;

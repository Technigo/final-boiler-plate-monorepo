import styled from "styled-components";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Button } from "./Button";
import Loading from "../assets/Loading.json";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login({ username, password });
      navigate("/spela");
    } catch (error) {
      console.log("Error");
      setError("Ogiltigt användarnamn eller lösenord");
    }
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleSubmit}>
        <Heading>Logga in</Heading>
        {error && <Error>{error}</Error>}
        <label className="username">
          <Input
            type="text"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="password">
          <Input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <Button type="submit" className="loginBtn">
          Logga in
        </Button>
      </Form>
      {loading && (
        <Lottie
          animationData={Loading}
          loop={true}
          autoplay
          style={{
            width: 300,
            height: 300,
            zIndex: 2,
            position: "absolute",
            right: 10,
            bottom: 1,
          }}
        />
      )}
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  border-radius: 20px;
  max-width: fit-content;
  height: fit-content;
  margin: 0 auto;
  padding-top: 80px;
  position: relative;

  @media (min-width: 700px) {
    padding-top: 50px;
  }
`;

const Heading = styled.h1`
  color: white;
  text-align: center;
  margin-top: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: var(--forest);
  border-radius: 20px;

  @media (min-width: 700px) {
    padding: 2rem 2.5rem;
  }
`;

const Input = styled.input`
  border-radius: 20px;
  padding: 10px 30px;
  border: none;
  background-color: white;
`;

const Error = styled.h3`
  color: black;
  margin: 5px 0;
  font-size: 0.9rem;
`;

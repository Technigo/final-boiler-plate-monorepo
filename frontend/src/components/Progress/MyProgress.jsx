import styled from "styled-components";
import { useLogin } from "./../../contexts/UserContext";
import { Hero } from "./Hero";

const data = {
  _id: "adf456456545",
  username: "pillan",
  password: "losenord321!",
  firstName: "Pernilla",
  lastName: "Svensson",
  age: "8",
  email: "mamma.svensson@example.com",
  accessToken: "943588945",
  progress: {
    math: {
      level: 2,
      score: 15,
      totalScore: 20,
    },
    swedish: {
      level: 1,
      score: 40,
      totalScore: 40,
    },
    english: {
      level: 3,
      score: 18,
      totalScore: 20,
    },
  },
};

export const Progress = () => {
  const { user } = useLogin();
  console.log(data);
  const { progress } = data;

  //TODO:
  // Räkna ut totala resultatet av varje ämne

  return (
    <ProgressContainer>
      <Hero user={user} progress={progress} />

      <ProgressWrapper>
        <div className="progress__subject math">
          <ProgressTitle>MATTE</ProgressTitle>
          <ProgressBox>
            {/* <p>Poäng: {progress.math.score}</p> */}
            <ProgressCircel>
              <ProgressScore>
                <p>Nivå: {progress.math.level}</p>
                <p>73%</p>
              </ProgressScore>
            </ProgressCircel>
          </ProgressBox>
        </div>
        <div className="progress__subject swedish">
          <ProgressTitle>SVENSKA</ProgressTitle>
          <ProgressBox>
            {/* <p>Poäng: {progress.swedish.score}</p> */}
            <ProgressCircel>
              <ProgressScore>
                <p>Nivå: {progress.swedish.level}</p>
                <p>23%</p>
              </ProgressScore>
            </ProgressCircel>
          </ProgressBox>
        </div>
        <div className="progress__subject english">
          <ProgressTitle>ENGELSKA</ProgressTitle>
          <ProgressBox>
            {/* <p>Poäng: {progress.english.score}</p> */}
            <ProgressCircel>
              <ProgressScore>
                <p>Nivå: {progress.english.level}</p>
                <p>45%</p>
              </ProgressScore>
            </ProgressCircel>
          </ProgressBox>
        </div>
      </ProgressWrapper>

      <LevelContainer>
        <h2>Matte</h2>
        <LevelWrapper>
          <LevelProgress>
            <p>Nivå: 1 - 10 / 20</p>
            Här ska finnas två bars, en som alltid är 100% och den andra ska
            ligga ovanpå och visa hur många % som är kvar
          </LevelProgress>
        </LevelWrapper>
      </LevelContainer>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  margin: 0 auto;
`;

const ProgressWrapper = styled.div`
  padding: 30px;
  display: flex;
  justify-content: space-around;
  background-color: lightpink;
`;

const ProgressTitle = styled.h2`
  margin: 10px 0;
  text-align: center;
`;

const ProgressBox = styled.div`
  padding: 30px;
  background-color: #f1f1f1;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressCircel = styled.div`
  background-color: lightcoral;
  position: relative;
  border-radius: 100%;
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressScore = styled.div`
  color: white;
  font-size: 2rem;
  position: absolute;
  text-align: center;
`;

const LevelContainer = styled.div`
  padding: 30px;
  background-color: #f1f1f1;
`;

const LevelWrapper = styled.div`
  padding: 20px 0;
  background-color: lightgreen;
`;

const LevelProgress = styled.div`
  padding: 0 20px;
  background-color: yellow;
`;

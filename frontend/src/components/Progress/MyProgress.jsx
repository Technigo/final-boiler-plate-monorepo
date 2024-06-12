import styled from "styled-components";
import { useLogin } from "./../../contexts/UserContext";
import { Hero } from "./Hero";
import { LevelProgressBar } from "./LevelProgressBar";
import { useScore } from "../../contexts/ScoreContext";

export const Progress = () => {
  const { user } = useLogin();
  const { progress } = useScore();

  console.log(progress);
  return (
    <ProgressContainer>
      <Hero user={user} />
      {/* <ProgressWrapper> */}
      {/* <div className="progress__subject math">
          <ProgressTitle>matte</ProgressTitle>
          <ProgressBox>
            <ProgressCircel className="crl-math">
              <ProgressScore>
                <p>Nivå: {math.addition.levels.length}</p>
                <p>{calcSubjectResult(math).toFixed(0)}%</p>
              </ProgressScore>
            </ProgressCircel>a
          </ProgressBox>
        </div> */}
      {/* <div className="progress__subject swedish">
          <ProgressTitle>svenska</ProgressTitle>
          <ProgressBox>
            <ProgressCircel className="crl-swedish">
              <ProgressScore>
                <p>Nivå: {swedish.levels.length}</p>
                <p>{swedish.levels[swedish.levels.length - 1].score} / 20</p>
              </ProgressScore>
            </ProgressCircel>
          </ProgressBox>
        </div>
        <div className="progress__subject english">
          <ProgressTitle>engelska</ProgressTitle>
          <ProgressBox>
            <ProgressCircel className="crl-english">
              <ProgressScore>
                <p>Nivå: {english.levels.length}</p>
                <p>{english.levels[english.levels.length - 1].score} / 20</p>
              </ProgressScore>
            </ProgressCircel>
          </ProgressBox>
        </div>
      </ProgressWrapper> */}
      <LevelProgressBar progress={progress.progress} />
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  margin: 0 auto;
`;

// const ProgressWrapper = styled.div`
//   padding: 30px;
//   display: flex;
//   justify-content: space-around;
//   background-color: #e5e5e5;
// `;

// const ProgressTitle = styled.h2`
//   margin: 10px 0;
//   text-align: center;
//   text-transform: uppercase;
// `;

// const ProgressBox = styled.div`
//   padding: 30px;
//   background-color: #f1f1f1;
//   border-radius: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ProgressCircel = styled.div`
//   position: relative;
//   border-radius: 100%;
//   width: 250px;
//   height: 250px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ProgressScore = styled.div`
//   color: white;
//   font-size: 2rem;
//   position: absolute;
//   text-align: center;
// `;

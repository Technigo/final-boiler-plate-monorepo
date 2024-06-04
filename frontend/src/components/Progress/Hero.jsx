import styled from "styled-components";

// Function that will calculate the total result and return %
const calcTotalResult = (progress) => {
  // Get all subjects from object
  const subjects = Object.values(progress);
  // Need to get totalScore and totalMaxScore to get the total result in percentage
  const totalScore = subjects.reduce((acc, subject) => acc + subject.score, 0);
  const totalMaxScore = subjects.reduce(
    (acc, subject) => acc + subject.totalScore,
    0
  );
  console.log(subjects);
  console.log(totalMaxScore);

  return (totalScore / totalMaxScore) * 100;
};

export const Hero = ({ user, progress }) => {
  const totalResultPercentage = calcTotalResult(progress);
  return (
    <HeroContainer>
      <HeroLeft>
        <HeroTitle>Hej {user?.username} 👋</HeroTitle>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
          voluptatibus voluptates velit voluptate nam, minus aperiam totam quos
          recusandae eos debitis iusto atque asperiores sunt animi consequatur
          quidem quibusdam sequi.
        </p>
      </HeroLeft>
      <HeroRight>
        <ProgressTitle>Totala resultatet</ProgressTitle>
        <ProgressBox>
          <ProgressCircel>
            <ProgressScore>
              <p>{totalResultPercentage.toFixed(2)}%</p>
            </ProgressScore>
          </ProgressCircel>
        </ProgressBox>
      </HeroRight>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  display: flex;
  padding: 60px 30px;
  min-height: 400px;
`;

const HeroTitle = styled.h1`
  margin: 10px 0;
`;

const HeroLeft = styled.div`
  width: 50%;
`;

const HeroRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: #f1f1f1;
  border-radius: 30px;
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

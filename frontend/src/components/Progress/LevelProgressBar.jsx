import styled from "styled-components";
import PropTypes from "prop-types";
import translations from "./translations.json";

// User json file to translate subjects and subcategories
const translateSubject = (subject) => {
  return translations.subjects[subject] || subject;
};

const translateSubcategory = (subcategory) => {
  return translations.subcategories[subcategory] || subcategory;
};

export const LevelProgressBar = ({ progress, selectedSubject }) => {
  if (!progress) {
    return null;
  }

  // Remove '_id' from subjects, else it will display in the score list
  const subjects = Object.keys(progress).filter((subject) => subject !== "_id");

  return (
    <LevelContainer>
      <LevelProgressH1>
        {translateSubject(selectedSubject).toUpperCase()}
      </LevelProgressH1>
      {subjects.map((subject) => (
        <div key={subject}>
          <h2>{translateSubcategory(subject)}</h2>
          <LevelWrapper>
            {progress[subject].levels.map((level, index) => {
              const isMaxScore = level.score === level.levelScore;
              return (
                <LevelProgress key={index}>
                  <p>
                    Nivå: {level.level} - {level.score} / {level.levelScore}
                    {isMaxScore && (
                      <span role="img" aria-label="trophy">
                        🏆
                      </span>
                    )}
                  </p>
                  <ProgressBar>
                    <ProgressForSubjects
                      className={`crl-${selectedSubject}`}
                      style={{
                        width: `${(level.score / level.levelScore) * 100}%`,
                      }}
                    ></ProgressForSubjects>
                  </ProgressBar>
                </LevelProgress>
              );
            })}
          </LevelWrapper>
        </div>
      ))}
    </LevelContainer>
  );
};

LevelProgressBar.propTypes = {
  progress: PropTypes.object.isRequired,
};

const LevelProgressH1 = styled.h1`
  margin-bottom: 10px;
`;

const LevelContainer = styled.div`
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const LevelWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const LevelProgress = styled.div`
  margin: 10px 0;
`;

const ProgressBar = styled.div`
  border-radius: 30px;
  margin: 5px 0;
  background-color: lightgray;
  height: 15px;
`;

const ProgressForSubjects = styled.div`
  height: 100%;
  border-radius: 30px;
`;

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
  console.log(progress);
  return (
    <LevelContainer>
      <h1>{translateSubject(selectedSubject).toUpperCase()}</h1>
      {subjects.map(([subject, data]) => (
        <div key={subject}>
          <h2>{translateSubcategory(subject)}</h2>
          <LevelWrapper>
            {data.levels.map((level, index) => (
              <LevelProgress key={index}>
                <p>
                  Nivå: {level.level} - {level.score} / {level.levelScore}
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
            ))}
          </LevelWrapper>
        </div>
      ))}
    </LevelContainer>
  );
};

LevelProgressBar.propTypes = {
  progress: PropTypes.object.isRequired,
};

const LevelContainer = styled.div`
  padding: 30px;
  background-color: #f1f1f1;
`;

const LevelWrapper = styled.div`
  padding: 20px 0;
`;

const LevelProgress = styled.div`
  padding: 0 20px;
`;

const ProgressBar = styled.div`
  border-radius: 30px;
  margin: 5px 0;
  background-color: lightgray;
  height: 10px;
`;

const ProgressForSubjects = styled.div`
  height: 100%;
`;

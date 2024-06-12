import styled from "styled-components";
import PropTypes from "prop-types";

// Function that will translate subject titles
const translateSubject = (subject) => {
  switch (subject) {
    case "math":
      return "Matte";
    case "swedish":
      return "Svenska";
    case "english":
      return "Engelska";
    default:
      return subject;
  }
};

export const LevelProgressBar = ({ progress, selectedSubject }) => {
  if (!progress) {
    return null;
  }

  // Remove '_id' from subjects, else it will display in the score list
  const subjects = Object.keys(progress).filter((subject) => subject !== "_id");

  return (
    <LevelContainer>
      {/* Mapping through all subjects */}
      {subjects.map((subject) => (
        <div key={subject}>
          <h1>{translateSubject(subject)}</h1>
          <LevelWrapper>
            {/* Show levels if the subject has direct levels and no subcategories */}
            {progress[subject].levels
              ? progress[subject].levels.map((level, index) => (
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
                ))
              : // Handle subjects with subcategories
                Object.keys(progress[subject]).map((subcategory) => {
                  let subcategoryHeader = false;
                  return progress[subject][subcategory].levels
                    ? progress[subject][subcategory].levels.map(
                        (level, index) => {
                          // Show subcategoryHeader = Matte only once
                          if (!subcategoryHeader) {
                            subcategoryHeader = true;
                            return (
                              <>
                                <h2 key={subcategory}>{subcategory}</h2>
                                <LevelProgress key={index}>
                                  <p>
                                    Nivå: {level.level} - {level.score} /{" "}
                                    {level.levelScore}
                                  </p>
                                  <ProgressBar>
                                    <ProgressForSubjects
                                      className={`crl-${selectedSubject}`}
                                      style={{
                                        width: `${
                                          (level.score / level.levelScore) * 100
                                        }%`,
                                      }}
                                    ></ProgressForSubjects>
                                  </ProgressBar>
                                </LevelProgress>
                              </>
                            );
                          } else {
                            return (
                              <LevelProgress key={index}>
                                <p>
                                  Nivå: {level.level} - {level.score} /
                                  {level.levelScore}
                                </p>
                                <ProgressBar>
                                  <ProgressForSubjects
                                    className={`crl-${selectedSubject}`}
                                    style={{
                                      width: `${
                                        (level.score / level.levelScore) * 100
                                      }%`,
                                    }}
                                  ></ProgressForSubjects>
                                </ProgressBar>
                              </LevelProgress>
                            );
                          }
                        }
                      )
                    : null;
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

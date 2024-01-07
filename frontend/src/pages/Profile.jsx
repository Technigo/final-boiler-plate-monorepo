import { userStore } from "../stores/userStore";
import { taskStore } from "../stores/taskStore";
import styled from "styled-components";
import { useEffect } from "react";
import { Button } from "../components/Buttons/Button";

const StyledProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #9eb7bf;
  padding: 30px;
  gap: 20px;
`;

const ProfilePhotoUserWrapper = styled.div`
  border: 2px solid #9eb7bf;
  padding: 10px;
`;

// Styled component for the header container
const HeaderContainer = styled.div`
  padding: 20px;
`;

// Styled component for the task container div
const TasksContainer = styled.div`
  margin-top: 20px;
`;

// Styled component for the unordered list
const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

// Styled component for list items
const StyledListItem = styled.li`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 20px 0 20px 20px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

// Styled component for task title
const TaskTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

// Styled component for task description
const TaskDescription = styled.div`
  color: #555;
  margin-bottom: 10px;
`;

// Styled component for "Created by" section
const CreatedBySection = styled.div`
  font-weight: bold;
  color: #333;
`;

// Styled component for "Volunteers" section
const VolunteersSection = styled.div`
  color: #555;
`;

export const Profile = () => {
  const { username, selectedGender, handleGenderChange } = userStore(); // Destructure selectedGender and setSelectedGender from Zustand store
  const { userTasks, fetchUserTasks, volunteeredTasks, fetchVolunteeredTasks } =
    taskStore();

  useEffect(() => {
    fetchUserTasks();
    fetchVolunteeredTasks();
  }, [fetchUserTasks, fetchVolunteeredTasks]);

  console.log(userTasks);
  const onGenderChange = (event) => {
    const gender = event.target.value;
    handleGenderChange(gender);
  };

  const { deleteTaskById } = taskStore();

  // const handleGenderChange = (event) => {
  //   setSelectedGender(event.target.value); // Update selected gender based on checkbox
  // };

  // const {
  //   username,
  //   //userImage,
  //   //city,
  //   //description,
  //   // createdTasks,
  //   // volunteeredTasks,
  // } = userStore();

  // Filter tasks created by the current user

  return (
    <div>
      <HeaderContainer>
        <h2>Hi {username}!</h2>
        <p>
          This page gives you an overview over all the Needs you&apos;ve created
          and those you have volunteered for.
        </p>
      </HeaderContainer>
      {/* <StyledProfileInfo>
        <h3>Your profile</h3> */}
      {/* Render ProfilePhoto component based on selected gender */}
      {/* <ProfilePhotoUserWrapper>
          <ProfilePhotoUser gender={selectedGender} />
        </ProfilePhotoUserWrapper> */}

      {/* Checkboxes for gender selection */}
      {/* <div>
          <label>
            <input
              type="checkbox"
              value="male"
              checked={selectedGender === "male"}
              onChange={onGenderChange}
            />
            Male
          </label>
          <label>
            <input
              type="checkbox"
              value="female"
              checked={selectedGender === "female"}
              onChange={onGenderChange}
            />
            Female
          </label>
        </div>
      </StyledProfileInfo> */}
      {/* <p>City: {city}</p>
      <p>Description: {description}</p> */}

      <div>
        <h3>Tasks you have created:</h3>
        <StyledList>
          {userTasks.map((task) => (
            <StyledListItem key={task._id}>
              <TaskTitle>{task.task}</TaskTitle>
              <TaskDescription>{task.description}</TaskDescription>
              <VolunteersSection>
                <strong>Volunteers: </strong>{" "}
                {task.volunteers.length > 0
                  ? task.volunteers
                      .filter(
                        (volunteer) =>
                          volunteer &&
                          (typeof volunteer === "object"
                            ? volunteer._id
                            : volunteer) &&
                          task.user &&
                          task.user._id &&
                          (typeof volunteer === "object"
                            ? volunteer._id.toString()
                            : volunteer.toString()) !== task.user._id.toString()
                      )
                      // map over the volunteers array and return the username of each volunteer
                      .map((volunteer) =>
                        typeof volunteer === "object"
                          ? volunteer.username
                          : volunteer
                      )
                      .join(", ")
                  : "No Volunteers"}
              </VolunteersSection>
              {/* Delete button for tasks you have created */}
              <Button
                buttonName="Delete"
                className="delete-button"
                onClick={() => deleteTaskById(task._id)}
              />
            </StyledListItem>
          ))}
        </StyledList>
      </div>

      <TasksContainer>
        <h3>Tasks you have volunteered to:</h3>
        <StyledList>
          {volunteeredTasks.map((task) => (
            <StyledListItem key={task._id}>
              <TaskTitle>{task.task}</TaskTitle>
              <TaskDescription>{task.description}</TaskDescription>
              <CreatedBySection>
                <strong>Created by: </strong>
                {task.user?.username || "Unknown User"}
                {/* Show the name of the autor or Unknown user if the task is missing username */}
              </CreatedBySection>
            </StyledListItem>
          ))}
        </StyledList>
      </TasksContainer>
    </div>
  );
};

import { ProfilePhotoUser } from "../components/ProfilePhoto/ProfilePhotoUser";
import { userStore } from "../stores/userStore";
import { taskStore } from "../stores/taskStore";
import styled from "styled-components";
import { useEffect } from "react";

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

// Styled component for the container div
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

export const Profile = () => {
  const { username, selectedGender, handleGenderChange } = userStore(); // Destructure selectedGender and setSelectedGender from Zustand store
  const { userTasks, fetchUserTasks, volunteeredTasks, fetchVolunteeredTasks } =
    taskStore();

  useEffect(() => {
    fetchUserTasks();
    fetchVolunteeredTasks();
  }, [fetchUserTasks, fetchVolunteeredTasks]);

  //const tasks = userTasks;
  console.log(userTasks);
  const onGenderChange = (event) => {
    const gender = event.target.value;
    handleGenderChange(gender);
  };
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
      <h2>Welcome to your space, {username}!</h2>
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
            </StyledListItem>
          ))}
        </StyledList>
      </div>

      <TasksContainer>
        <h3>Tasks you have volunteered to:</h3>
        <StyledList>
          {volunteeredTasks.map((task) => (
            <StyledListItem key={task._id}>
              <TaskTitle>
                <strong>Task: </strong> {task.task}
              </TaskTitle>
              <TaskDescription>
                <strong>Description: </strong> {task.description}
              </TaskDescription>
              <CreatedBySection>
                <strong>Created by: </strong>
                {task.user?.username || "Unknown User"}
              </CreatedBySection>
            </StyledListItem>
          ))}
        </StyledList>
      </TasksContainer>
    </div>
  );
};

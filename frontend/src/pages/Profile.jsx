import { ProfilePhotoUser } from "../components/ProfilePhoto/ProfilePhotoUser";
//import { FeedTaskCard } from "../components/TaskCards/FeedTaskCard";
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

export const Profile = () => {
  const { username, selectedGender, handleGenderChange } = userStore(); // Destructure selectedGender and setSelectedGender from Zustand store
  const { userTasks, fetchUserTasks } = taskStore();

  useEffect(() => {
    fetchUserTasks();
  }, [fetchUserTasks]);

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
      <StyledProfileInfo>
        <h3>Your profile</h3>
        {/* Render ProfilePhoto component based on selected gender */}
        <ProfilePhotoUserWrapper>
          <ProfilePhotoUser gender={selectedGender} />
        </ProfilePhotoUserWrapper>

        {/* Checkboxes for gender selection */}
        <div>
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
      </StyledProfileInfo>
      {/* <p>City: {city}</p>
      <p>Description: {description}</p> */}

      <div>
        <h3>Created Tasks</h3>
        <ul>
          {userTasks.map((task) => (
            <li key={task._id}>
              {task.task}
              {task.description}
            </li>
            //<FeedTaskCard key={task._id} task={task} />
          ))}
        </ul>
      </div>

      <div>
        <h3>Volunteered Tasks</h3>
        <ul>
          {/* {volunteeredTasks.map((task) => (
            <li key={task._id}>{task.task}</li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

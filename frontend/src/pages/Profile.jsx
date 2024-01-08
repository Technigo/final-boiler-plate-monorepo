import { userStore } from "../stores/userStore";
import { taskStore } from "../stores/taskStore";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useEffect } from "react";
import { Button } from "../components/Buttons/Button";
import styled from "styled-components";
import "../components/Tabs/TabsStyling.css";

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
  const { username } = userStore(); // Destructure username from Zustand store
  const { userTasks, fetchUserTasks, volunteeredTasks, fetchVolunteeredTasks } =
    taskStore();

  useEffect(() => {
    fetchUserTasks();
    fetchVolunteeredTasks();
  }, [fetchUserTasks, fetchVolunteeredTasks]);

  const { deleteTaskById } = taskStore();

  // Filter tasks created by the current user

  return (
    <div>
      <HeaderContainer>
        <h2>Hi {username}!</h2>
        <p>
          Here you can find an overview over all the Needs you&apos;ve created
          and those you have volunteered for. Keep an eye on the{" "}
          <strong>Your Needs</strong> tab where you will see if someone offers
          their help. Here you can also delete your created Needs if you no
          longer require help. On the <strong>Your Deeds</strong> tab you can
          see all the Needs of others that you have volunteered for.
        </p>
      </HeaderContainer>

      <Tabs>
        <TabList>
          <Tab>Your Needs</Tab>
          <Tab>Your Deeds</Tab>
        </TabList>
        <TabPanel>
          <div>
            {/* <h3>Tasks you have created:</h3> */}
            <StyledList>
              {userTasks.map((task) => (
                <StyledListItem key={task._id}>
                  <TaskTitle>{task.task}</TaskTitle>
                  <TaskDescription>{task.description}</TaskDescription>
                  <VolunteersSection>
                    <strong>Volunteers: </strong>{" "}
                    {task.volunteers && task.volunteers.length > 0
                      ? task.volunteers
                          .filter(
                            (volunteer) =>
                              volunteer._id.toString() !==
                              task.user._id.toString()
                          )
                          // map over the volunteers array and return the username of each volunteer
                          .map(
                            (volunteer) =>
                              `${volunteer.username} (${volunteer.email})`
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
        </TabPanel>

        <TabPanel>
          <TasksContainer>
            {/* <h3>Tasks you have volunteered to:</h3> */}
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
        </TabPanel>
      </Tabs>
    </div>
  );
};

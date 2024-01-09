import { userStore } from "../stores/userStore";
import { taskStore } from "../stores/taskStore";
import { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Button } from "../components/Buttons/Button";
import styled from "styled-components";
import "../components/Tabs/TabsStyling.css";

const HeaderContainer = styled.div`
  padding: 20px;
`;

const TasksContainer = styled.div`
  margin-top: 20px;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 20px 0 20px 20px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const TaskTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const TaskDescription = styled.div`
  color: #555;
  margin-bottom: 10px;
`;

const CreatedBySection = styled.div`
  font-weight: bold;
  color: #333;
`;

const VolunteersSection = styled.div`
  color: #555;
`;

export const Profile = () => {
  // Accessing data from Zustand stores
  const { username } = userStore();
  const {
    userTasks,
    fetchUserTasks,
    volunteeredTasks,
    fetchVolunteeredTasks,
    deleteTaskById,
  } = taskStore();

  // Fetch user's tasks and volunteered tasks on component mount
  useEffect(() => {
    fetchUserTasks();
    fetchVolunteeredTasks();
  }, [fetchUserTasks, fetchVolunteeredTasks]);

  // Filter tasks created by the current user

  return (
    <div>
      <HeaderContainer>
        <h1>Hi {username}!</h1>
        <p>
          Here you can find an overview over all the Needs you&apos;ve created
          and those you have volunteered for. Keep an eye on the{" "}
          <strong>Your Needs</strong> tab where you will see if someone offers
          their help. Here you can also delete your created Needs if you no
          longer require help. On the <strong>Your Deeds</strong> tab you can
          see all the Needs of others that you have volunteered for.
        </p>
      </HeaderContainer>

      {/* Tabs to display different sections */}
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
                    <strong>Volunteers: </strong>
                    {task.volunteers && task.volunteers.length > 0
                      ? task.volunteers
                          .filter(
                            (volunteer) =>
                              volunteer._id.toString() !==
                              task.user._id.toString()
                          )
                          // map over the volunteers array and return the username and email of each volunteer
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
            {/* List of tasks the user volunteered for */}
            <StyledList>
              {volunteeredTasks.map((task) => (
                <StyledListItem key={task._id}>
                  {/* Task details */}
                  <TaskTitle>{task.task}</TaskTitle>
                  <TaskDescription>{task.description}</TaskDescription>
                  <CreatedBySection>
                    {/* Display task creator's username */}
                    <strong>Created by: </strong>
                    {task.user?.username || "Unknown User"}
                    {/* Show the name of the author or 'Unknown User' if the task is missing username */}
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

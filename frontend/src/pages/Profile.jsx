import { userStore } from "../stores/userStore";
import { taskStore } from "../stores/taskStore";
import { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Button } from "../components/Buttons/Button";
import { Heading1 } from "../components/Typography/Heading1";
import { BodyText } from "../components/Typography/BodyText";
import { GoTopButton } from "../components/Buttons/GoTop";
import styled from "styled-components";
import "../components/Tabs/TabsStyling.css";

const StyledProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  padding: 20px;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TasksContainer = styled.div`
  margin-top: 20px;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
  background-color: var(--grey);
  border: 1px solid #ddd;
  border-radius: 20px 0 20px 20px;
  padding: 15px;
  width: 250px;
  height: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  .delete-button {
    align-items: flex-end;
  }

  @media screen and (min-width: 600px) {
    width: 400px;
  }

  @media screen and (min-width: 1000px) {
    width: 700px;
  }
`;

const DeleteButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TaskTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--darktext);
  overflow-wrap: break-word;
`;

const TaskDescription = styled.div`
  color: var(--darkgrey);
  margin-bottom: 10px;
  overflow-wrap: break-word;
`;

const CreatedBySection = styled.div`
  color: var(--darktext);
`;

const VolunteersSection = styled.div`
  color: var(--darktext);
  overflow-wrap: break-word;
`;

// Define the 'Profile' functional component.
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
  }, [fetchUserTasks, fetchVolunteeredTasks]); // Call the fetch functions when the component mounts

  // Filter tasks created by the current user
  return (
    <StyledProfilePage>
      <HeaderContainer>
        <Heading1 className={"heading1-profile"} text={`Hi ${username}!`} />
        <BodyText
          className={"bodytext-profile"}
          text={
            "Here you can find an overview over all the Needs you have created and those you have volunteered for! Keep an eye on the Your Needs tab, where you will see if someone offers their help. If someone volunteers you will receive their email so you can reach out to them and make arrangements. Here you can also delete your created Needs if you no longer require help. On the Your Deeds tab you can see all the Needs of others that you have volunteered for."
          }
        />
      </HeaderContainer>

      {/* Tabs to display different sections */}
      <Tabs>
        <TabList>
          <Tab>Your Needs</Tab>
          <Tab>Your Deeds</Tab>
        </TabList>
        <TabPanel>
          <>
            {/* List of tasks the user created */}
            <StyledList>
              {userTasks.map(
                // map over the userTasks array and return the task/need details
                (task) => (
                  <StyledListItem key={task._id}>
                    {/* Gives each task/need its own unique ID */}
                    <TaskTitle>{task.task}</TaskTitle>
                    {/* Title of task/need */}
                    <TaskDescription>{task.description}</TaskDescription>
                    <VolunteersSection>
                      <strong>Volunteers: </strong>
                      {task.volunteers && task.volunteers.length > 0 // check if the task object has volunteers and that the array is not empty
                        ? task.volunteers // if there are volunteers, return the volunteers array
                            .filter(
                              // filter out the user who created the task to avoid displaying the creator as a volunteer
                              (volunteer) =>
                                volunteer._id.toString() !==
                                task.user._id.toString()
                            )
                            // map over the volunteers array and return the username and email of each volunteer
                            .map(
                              (volunteer) =>
                                `${volunteer.username} (${volunteer.email})`
                            )
                            .join(", ") // join the usernames and emails with a comma and space
                        : "No Volunteers"}
                      {/* If there are no volunteers, display that */}
                    </VolunteersSection>
                    <DeleteButton>
                      {/* Delete button for tasks you have created */}
                      <Button
                        buttonName="Delete"
                        className="delete-button"
                        onClick={() => deleteTaskById(task._id)}
                      />
                    </DeleteButton>
                  </StyledListItem>
                )
              )}
            </StyledList>
          </>
        </TabPanel>

        <TabPanel>
          <TasksContainer>
            {/* List of tasks the user volunteered for */}
            <StyledList>
              {volunteeredTasks.map(
                (
                  task // map over the volunteeredTasks array and return the task details
                ) => (
                  <StyledListItem key={task._id}>
                    {/* Task details */}
                    <TaskTitle>{task.task}</TaskTitle>
                    <TaskDescription>{task.description}</TaskDescription>
                    <CreatedBySection>
                      {/* Show the name of the author or 'Unknown User' if the task is missing username */}
                      <strong>Created by: </strong>
                      {task.user?.username || "Unknown User"}
                    </CreatedBySection>
                  </StyledListItem>
                )
              )}
            </StyledList>
          </TasksContainer>
        </TabPanel>
      </Tabs>
      <GoTopButton />
    </StyledProfilePage>
  );
};

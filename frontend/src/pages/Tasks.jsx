import { useEffect } from "react";
import { taskStore } from "../stores/taskStore";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { FeedTaskCard } from "../components/TaskCards/FeedTaskCard";
import { TaskTabs } from "../components/Tabs/TaskTabs";
import styled from "styled-components";
import { GoTopButton } from "../components/Buttons/GoTop";

const StyledTaskPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    margin-bottom: 20px;
  }
`;

const StyledTaskFields = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 250px;
  gap: 10px;

  @media screen and (min-width: 600px) {
    width: 500px;
  }

  @media screen and (min-width: 1000px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    width: 750px;
  }
`;

const StyledTaskCreator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const StyledTaskText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 20px;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);

    p {
      grid-column: 1 / 3;
      text-align: center;
    }
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);

    p {
      grid-column: 1 / 5;
    }
  }

  @media screen and (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// Define the 'Tasks' functional component.
export const Tasks = () => {
  // Text content for the heading and paragraphs.
  const text = {
    heading: "In Need, In Deed",
    intro: "Do you need a helping hand? Or do you want to help someone?",
    p: "Then Deed Hub is the place to be!",
    deeds: "Help requested",
  };

  // Access the 'tasks' and 'fetchTasks' functions from the 'taskStore'.
  const { tasks, fetchTasks } = taskStore();
  // Access the 'accessToken' and 'isLoggedIn' from the 'userStore'.
  const { accessToken, isLoggedIn } = userStore();
  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();

  useEffect(() => {}, [tasks]);

  // Use the 'useEffect' hook to fetch tasks when 'tasks' or 'accessToken' change.
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, accessToken]);

  // useEffect hook to check user authentication status.
  useEffect(() => {
    if (!isLoggedIn) {
      // If the user is not logged in, show an alert and navigate to the login route.
      alert("You need to log in to see all the content");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Render the component content.
  return (
    <StyledTaskPage>
      <StyledTaskFields>
        <StyledTaskCreator>
          <StyledTaskText>
            {/* Display the heading and paragraphs. */}
            <h2>{text.heading}</h2>
            <p>{text.intro}</p>
            <p>{text.p}</p>
          </StyledTaskText>
          <TaskTabs />
        </StyledTaskCreator>
      </StyledTaskFields>
      <h3>{text.deeds}</h3>
      <CardWrapper>
        {/* Conditional rendering based on the number of tasks. */}
        {tasks.length === 0 ? (
          <p>Nothing to volunteer for yet!</p>
        ) : (
          // Map through 'tasks' and render task items.
          tasks.map((task) => <FeedTaskCard key={task._id} task={task} />)
        )}
      </CardWrapper>
      <GoTopButton />
    </StyledTaskPage>
  );
};

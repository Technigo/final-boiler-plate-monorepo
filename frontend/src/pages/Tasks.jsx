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

  h2 {
    margin-bottom: 20px;
  }
`;

// const StyledTaskFields = styled.div`
//   display: flex;
//   flex-direction: column;
//   text-align: center;
//   width: 250px;
//   gap: 10px;

//   @media screen and (min-width: 600px) {
//     width: 500px;
//   }

//   @media screen and (min-width: 1000px) {
//     flex-direction: row;
//     align-items: flex-start;
//     justify-content: center;
//     width: 750px;
//   }
// `;

// const StyledTaskCreator = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 20px;
//   margin-bottom: 30px;
// `;

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  margin-bottom: 20px;

  h1 {
    margin: 0;
  }

  /* @media screen and (min-width: 450px) {
    h1 {
      font-size: 24px;
    }
  } */

  @media screen and (min-width: 600px) {
    &:after {
      content: "\\A"; /* Add a line break using a pseudo-element */
      white-space: pre; /* Preserve white space */
    }
  }

  @media screen and (min-width: 600px) {
    //flex-direction: column;
    justify-content: flex-start;
    border-right: 5px solid var(--lighttext);
    padding-right: 20px;
    width: 40%;
  }

  h1::after {
    content: "\\A"; /* Add a line break using a pseudo-element */
    white-space: pre; /* Preserve white space */
  }
`;

const StyledTaskText = styled.div`
  display: flex;
  //flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  margin-bottom: 40px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
    headingleft: "In Need,",
    headingright: "In Deed",
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
      {/* <StyledTaskFields>
        <StyledTaskCreator>
          <StyledTaskText>
            {/* Display the heading and paragraphs. */}
      {/*</StyledTaskPage><h2>{text.heading}</h2>
            <p>{text.intro}</p>
            <p>{text.p}</p>
          </StyledTaskText>
          <TaskTabs />
        </StyledTaskCreator>
      </StyledTaskFields> */}

      {/* <StyledTaskFields> */}
      {/* <StyledTaskCreator> */}
      <>
        <StyledTaskText>
          {/* Display the heading and paragraphs. */}
          <HeadingWrapper>
            <h1>
              In Need,
              <br />
              In Deed
            </h1>
            {/* <h1>{text.headingleft}</h1> */}
            {/* <h1>{text.headingright}</h1> */}
          </HeadingWrapper>
          <TextWrapper>
            <p>{text.intro}</p>
            <p>{text.p}</p>
          </TextWrapper>
        </StyledTaskText>
      </>
      <TaskTabs />
      {/* </StyledTaskCreator> */}
      {/* </StyledTaskFields> */}

      <h2>{text.deeds}</h2>
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

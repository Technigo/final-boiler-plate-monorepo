// Import necessary dependencies, components, and stores.
import { useEffect } from "react";
import { taskStore } from "../stores/taskStore";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
// import { CreateTask } from "../components/CreateTask";
import { FeedTaskCard } from "../components/TaskCards/FeedTaskCard";
// import { FilterTaskFeed } from "../components/FilterTaskFeed";
import { HandleTaskTabs } from "../components/HandleTaskTabs";
import styled from "styled-components";

const StyledTaskPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledTaskFields = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  /* align-items: center; */
  /*justify-content: center; */
  width: 250px;
  gap: 10px;

  @media screen and (min-width: 600px) {
    width: 500px;
  }

  @media screen and (min-width: 1000px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    //gap: 100px;
    //margin-bottom: 30px;
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
  gap: 10px;
  //margin-bottom: 20px;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  /* width: 250px; */
  /* align-items: center;
  justify-content: center; */
  gap: 10px;

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
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
    intro: "Do you need an extra hand? Or do you want to help someone?",
    p: "Then Deed Hub is the place to be!",
    // p: "Share it with the community and get the assistance you need!",
    deeds: "Up-for-grabs",
  };

  // Access the 'tasks' and 'fetchTasks' functions from the 'taskStore'.
  const { tasks, fetchTasks } = taskStore();
  // Access the 'accessToken' and 'isLoggedIn' from the 'userStore'.
  const { accessToken, isLoggedIn } = userStore();
  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();

  useEffect(() => {
    //console.log("useEffect", tasks);
  }, [tasks]);

  // Use the 'useEffect' hook to fetch tasks when 'tasks' or 'accessToken' change.
  useEffect(() => {
    //console.log("useEffect", accessToken);
    fetchTasks();
  }, [fetchTasks, accessToken]);

  // Access the 'handleLogout' function from the 'userStore'.
  //const storeHandleLogout = userStore((state) => state.handleLogout);

  // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
  //const { isLoggedIn } = userStore();
  //console.log(isLoggedIn);
  //console.log(accessToken);

  // useEffect hook to check user authentication status.
  useEffect(() => {
    if (!isLoggedIn) {
      // If the user is not logged in, show an alert and navigate to the login route.
      alert("You need to log in to see all the content");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // // Function to handle the click event of the logout button.
  // const onLogoutClick = () => {
  //   storeHandleLogout();
  //   // Additional logic after logout can be added here.
  //   alert("Log out successful");
  //   navigate("/"); // You can change this to the login route
  // };

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
          {/* Render the 'CreateTask' component to add new tasks. */}
          {/* <CreateTask /> */}
          <HandleTaskTabs />
        </StyledTaskCreator>
        {/* <FilterTaskFeed /> */}
      </StyledTaskFields>
      <h3>{text.deeds}</h3>
      <CardWrapper>
        {/* Conditional rendering based on the number of tasks. */}
        {tasks.length === 0 ? (
          <p>No Needs to offer your helping hand to!</p>
        ) : (
          // Map through 'tasks' and render task items.
          tasks.map((task) => <FeedTaskCard key={task._id} task={task} />)
        )}
      </CardWrapper>
    </StyledTaskPage>
  );
};

// SUMMARY

// This code defines the Tasks component, which handles the display of tasks, their creation, editing, and deletion. It imports necessary components, hooks, and stores, and it uses React Router to navigate between routes. The component also fetches tasks from the server using the fetchTasks function and updates the display based on the user's authentication status. Additionally, it renders text content and conditionally displays tasks or a message when there are no tasks.

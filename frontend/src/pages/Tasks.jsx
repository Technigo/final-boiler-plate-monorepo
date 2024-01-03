// Import necessary dependencies, components, and stores.
import { useEffect } from "react";
//import { LogoText } from "../components/LogoText";
import { CreateTask } from "../components/CreateTask";
import { taskStore } from "../stores/taskStore";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { FeedTaskCard } from "../components/TaskCards/FeedTaskCard";
//import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledTaskText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

// Define the 'Tasks' functional component.
export const Tasks = () => {
  // Text content for the heading and paragraphs.
  const text = {
    heading: "In Need, In Deed",
    intro: "Do you need an extra hand?",
    p: "Share it with the community and get the assistance you need! ",
  };

  // Access the 'tasks', 'fetchTasks', 'handleEdit', and 'deleteTaskById' functions from the 'taskStore'.
  const { tasks, fetchTasks, handleEdit, deleteTaskById } = taskStore();
  // Access the 'accessToken' from the 'userStore'.
  const { accessToken } = userStore();

  useEffect(() => {
    console.log("useEffect", tasks);
  }, [tasks]);

  // Use the 'useEffect' hook to fetch tasks when 'tasks' or 'accessToken' change.
  useEffect(() => {
    //console.log("useEffect", accessToken);
    fetchTasks();
  }, [fetchTasks, accessToken]);

  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();
  // Access the 'handleLogout' function from the 'userStore'.
  const storeHandleLogout = userStore((state) => state.handleLogout);

  // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
  const { isLoggedIn } = userStore();
  //console.log(isLoggedIn);
  //console.log(accessToken);

  // useEffect hook to check user authentication status.
  useEffect(() => {
    if (!isLoggedIn) {
      // If the user is not logged in, show an alert and navigate to the login route.
      alert("no permission - here");
      navigate("/"); // You can change this to the login route
    }
  }, [isLoggedIn, navigate]);

  // Function to handle the click event of the logout button.
  const onLogoutClick = () => {
    storeHandleLogout();
    // Additional logic after logout can be added here.
    alert("Log out successful");
    navigate("/"); // You can change this to the login route
  };

  // Render the component content.
  return (
    <>
      {/* Render the 'LogoText' component. */}
      {/* <LogoText /> */}

      <div>
        <StyledTaskText>
          {/* Display the heading and paragraphs. */}
          <h2>{text.heading}</h2>
          <p>{text.intro}</p>
          <p>{text.p}</p>
        </StyledTaskText>
        {/* Render the 'CreateTask' component to add new tasks. */}
        <CreateTask />
        {/* Conditional rendering based on the number of tasks. */}
        {tasks.length === 0 ? (
          <>
            <p>No Needs to offer your helping hand to!</p>
          </>
        ) : (
          // Map through 'tasks' and render task items.
          tasks.map((task) => (
            <FeedTaskCard key={task._id} task={task} />
            // <div key={task._id} className="card-wrapper">
            //   <div
            //     className={`card-container ${
            //       task.done ? "green-border" : "red-border"
            //     }`}
            //     onClick={() => handleEdit(task._id)}
            //   >
            //     <p>{task.task}</p>
            //     <p>{task.category}</p>
            //     <p>{task.area}</p>
            //     <p>{task.description}</p>
            //     {/* <p>{task.done ? "Task is Completed" : "Not Completed"}</p>
            //     <button onClick={() => deleteTaskById(task._id)}>Delete</button> */}
            //   </div>
            // </div>
          ))
        )}
      </div>
    </>
  );
};

// SUMMARY

// This code defines the Tasks component, which handles the display of tasks, their creation, editing, and deletion. It imports necessary components, hooks, and stores, and it uses React Router to navigate between routes. The component also fetches tasks from the server using the fetchTasks function and updates the display based on the user's authentication status. Additionally, it renders text content and conditionally displays tasks or a message when there are no tasks.

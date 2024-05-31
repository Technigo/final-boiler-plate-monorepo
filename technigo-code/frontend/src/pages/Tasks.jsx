// Import necessary dependencies, components, and stores.
import { useEffect } from "react";
import Logos from "../components/Logos";
import { CreateTask } from "../components/CreateTask";
import { taskStore } from "../stores/taskStore";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Define the 'Tasks' functional component.
export const Tasks = () => {
  // Text content for the heading and paragraphs.
  const text = {
    heading: "Tasks Page",
    intro: "Tasks Here",
    loremIpsum:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, vitae fugit ipsam quo accusantium autem officia necessitatibus ullam voluptati",
  };

  // Access the 'tasks', 'fetchTasks', 'handleEdit', and 'deleteTaskById' functions from the 'taskStore'.
  const { tasks, fetchTasks, handleEdit, deleteTaskById } = taskStore();
  // Access the 'accessToken' from the 'userStore'.
  const { accessToken } = userStore();

  // Use the 'useEffect' hook to fetch tasks when 'tasks' or 'accessToken' change.
  useEffect(() => {
    fetchTasks();
  }, [tasks, accessToken]);

  // Initialize the 'navigate' function from React Router.
  const navigate = useNavigate();
  // Access the 'handleLogout' function from the 'userStore'.
  const storeHandleLogout = userStore((state) => state.handleLogout);

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
      <nav>
        {/* Create a navigation menu with links to the home, tasks, and sign-out routes. */}
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/home">Home</Link>
          </li>
          <li className="app-li">
            <Link to="/tasks">Tasks</Link>
          </li>
          <li className="app-li">
            <button onClick={onLogoutClick}>Sign Out</button>
          </li>
        </ul>
      </nav>
      {/* Render the 'Logos' component. */}
      <Logos />
      <div>
        {/* Display the heading and paragraphs. */}
        <h2>{text.heading}</h2>
        <p>{text.intro}</p>
        <p>{text.loremIpsum}</p>
        {/* Render the 'CreateTask' component to add new tasks. */}
        <CreateTask />
        {/* Conditional rendering based on the number of tasks. */}
        {tasks.length === 0 ? (
          <>
            <p>No tasks yet, go ahead and get moving!!...</p>
          </>
        ) : (
          // Map through 'tasks' and render task items.
          tasks.map((task) => (
            <div key={task._id} className="card-wrapper">
              <div
                className={`card-container ${
                  task.done ? "green-border" : "red-border"
                }`}
                onClick={() => handleEdit(task._id)}
              >
                <p>{task.task}</p>
                <p>{task.done ? "Task is Completed" : "Not Completed"}</p>
                <button onClick={() => deleteTaskById(task._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

// SUMMARY

// This code defines the Tasks component, which handles the display of tasks, their creation, editing, and deletion. It imports necessary components, hooks, and stores, and it uses React Router to navigate between routes. The component also fetches tasks from the server using the fetchTasks function and updates the display based on the user's authentication status. Additionally, it renders text content and conditionally displays tasks or a message when there are no tasks.

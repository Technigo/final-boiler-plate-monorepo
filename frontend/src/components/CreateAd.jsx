// ADAPT THIS FILE FOR CREATING ADVERTS

// Import necessary dependencies and the 'advertStore' from the store.
import { useState } from "react";
import { adStore } from "../stores/adStore";

// Define the 'CreateTask' functional component.
export const CreateAd = () => {
  // Initialize state variable 'task' using 'useState' to store the task input.
  const [task, setTask] = useState("");
  // Access the 'addTaskToServer' and 'deleteAllTasks' functions from the 'advertStore'.
  const { addTaskToServer, deleteAllTasks } = adStore();

  // Function to update the 'task' state with the value entered in the input field.
  const taskInput = (e) => {
    setTask(e.target.value);
  };

  // Function to add a new task both locally and to the server.
  const addTaskLocal = async () => {
    if (task.trim() !== "") {
      // Check if the 'task' input is not empty or only whitespace.
      await addTaskToServer(task); // Add the task to the server.
      setTask(""); // Clear the input field after the task is added.
    }
  };

  // Render the component content.
  return (
    <>
      <div className="cta-block">
        {/* Create an input field for entering the task description. */}
        <input
          className="task-input"
          type="text"
          placeholder="enter task"
          onChange={taskInput}
          value={task}
        />
        {/* Create a button to trigger the 'addTaskLocal' function for adding the task. */}
        <button onClick={addTaskLocal}>Add Task</button>
        {/* Create a button to trigger the 'deleteAllTasks' function to delete all tasks from the server. */}
        <button onClick={deleteAllTasks}>Delete All My Tasks</button>
      </div>
    </>
  );
};

// SUMMARY
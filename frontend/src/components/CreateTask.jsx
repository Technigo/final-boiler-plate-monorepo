// Import necessary dependencies and the 'taskStore' from the store.
import { useState } from "react";
import { taskStore } from "../stores/taskStore";

// Define the 'CreateTask' functional component.
export const CreateTask = () => {
  // Initialize state variable 'task' using 'useState' to store the task input.
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");

  // Access the 'addTaskToServer' and 'deleteAllTasks' functions from the 'taskStore'.
  const { addTaskToServer, deleteAllTasks } = taskStore();

  // Function to update the 'task' state with the value entered in the input field.
  const taskTitle = (e) => {
    setTask(e.target.value); // Update the 'task' state with the value entered in the input field.
  };
  const taskCategory = (e) => {
    setCategory(e.target.value); // Update the 'task' state with the value entered in the input field.
  };
  const taskArea = (e) => {
    setArea(e.target.value); // Update the 'task' state with the value entered in the input field.
  };
  const taskDescription = (e) => {
    setDescription(e.target.value); // Update the 'task' state with the value entered in the input field.
  };

  // Function to add a new task both locally and to the server.
  const addTaskLocal = async () => {
    if (
      task.trim() !== "" &&
      category !== "" &&
      area !== "" &&
      description !== ""
    ) {
      // Check if all fields are not empty or only whitespace.
      const newTask = {
        task: task,
        category: category, // Include the selected category value
        area: area, // Include the selected area value
        description: description,
      }; // Create an object with task details
      await addTaskToServer(newTask); // Add the task to the server.
      setTask(""); // Clear the input field after the task is added.
      setCategory("");
      setArea("");
      setDescription("");
    } else {
      alert("Please fill in all fields"); // Alert the user if any of the fields are empty.
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
          placeholder="Enter task title"
          onChange={taskTitle}
          value={task}
        />
        <select
          className="task-select"
          type="select"
          onChange={taskCategory}
          value={category}
        >
          <option disabled default value="">
            Choose a category
          </option>
          <option value="Garden">Garden</option>
          <option value="Pets">Pets</option>
          <option value="Shopping">Shopping</option>
          <option value="Repairs">Repairs</option>
          <option value="Other">Other</option>
        </select>
        <select
          className="task-select"
          type="select"
          onChange={taskArea}
          value={area}
        >
          <option disabled default value="">
            Choose an area
          </option>
          <option value="Varberg City Center">Varberg City Center</option>
          <option value="Himle">Himle</option>
          <option value="Kungsäter">Kungsäter</option>
          <option value="Rolfstorp">Rolfstorp</option>
          <option value="Tvååker">Tvååker</option>
          <option value="Veddige">Veddige</option>
        </select>
        <input
          className="task-input"
          type="text"
          placeholder="Describe what you need help with"
          onChange={taskDescription}
          value={description}
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

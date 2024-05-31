// Import the necessary module for state management
import { create } from "zustand";
// Import the userStore to access user-related data
import { userStore } from "./userStore";

// Get the backend API URL from the environment variable
const apiEnv = import.meta.env.VITE_BACKEND_API;
console.log(apiEnv);

// Create and export a Zustand store for managing tasks
export const taskStore = create((set) => ({
  // Initialize the tasks state with an empty array
  tasks: [],
  // Initialize the userId state by accessing it from the userStore
  userId: userStore.userId,

  // Define an action to add a task to the state
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),

  // Define an action to set the tasks state to a new array of tasks
  setTasks: (tasks) => set({ tasks }),

  // New action to delete all tasks
  deleteAllTasks: async () => {
    try {
      // Send a DELETE request to the backend API to delete all tasks
      const response = await fetch(`${apiEnv}/deleteAll`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      // Check if the request was successful
      if (response.ok) {
        // Clear the tasks in the state
        set({ tasks: [] });
      } else {
        console.error("Failed to delete tasks");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // New action to fetch tasks
  fetchTasks: async () => {
    try {
      // Send a GET request to the backend API to fetch tasks
      const response = await fetch(`${apiEnv}/get`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      // Check if the request was successful
      if (response.ok) {
        // Parse the response data and set it as the tasks state
        const data = await response.json();
        set({ tasks: data });
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // New action to add a task to the server and then to the store
  addTaskToServer: async (task) => {
    try {
      // Send a POST request to the backend API to add a new task
      const response = await fetch(`${apiEnv}/add`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: task }),
      });
      // Parse the response data
      const data = await response.json();
      // Check if the request was successful
      if (response.ok) {
        // Add the new task to the tasks state
        set((state) => ({ tasks: [...state.tasks, data] }));
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // New action to update the boolean isDone value in the store
  handleEdit: async (id) => {
    try {
      // Send a PUT request to the backend API to update a task by its ID
      const response = await fetch(`${apiEnv}/update/${id}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      });
      // Parse the updated task data
      const updatedTask = await response.json();
      // Check if the request was successful
      if (response.ok) {
        // Update the task in the tasks state
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === id ? { ...task, ...updatedTask } : task
          ),
        }));
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // New action to delete a specific task by its ID
  deleteTaskById: async (id) => {
    try {
      // Send a DELETE request to the backend API to delete a task by its ID
      const response = await fetch(`${apiEnv}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });

      // Check if the request was successful
      if (response.ok) {
        // Remove the task from the tasks state
        set((state) => ({
          tasks: state.tasks.filter((task) => task._id !== id),
        }));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },
}));

import { create } from "zustand";
import { userStore } from "./userStore";

// Get the backend API URL from the environment variable
const apiEnv = import.meta.env.VITE_BACKEND_API;
console.log(apiEnv);

// Create and export a Zustand store for managing tasks
export const taskStore = create((set) => ({
  // Initialize the tasks state with an empty array
  tasks: [],
  userTasks: [],
  volunteeredTasks: [],
  // Initialize the userId state by accessing it from the userStore
  userId: userStore.userId,

  // Add the new task to the tasks state
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),

  // Set the tasks state to a new array of tasks
  setTasks: (tasks) => set({ tasks }),

  // New action to fetch all tasks
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
        // Parse the response data and convert it to a JS array
        const data = await response.json();

        set({ tasks: data });
        set({ originalTasks: data }); // Set originalTasks to fetched data
      } else {
      }
    } catch (error) {}
  },

  // Fetch tasks created by the user
  fetchUserTasks: async () => {
    try {
      // Send a GET request to fetch tasks created by the user
      const response = await fetch(`${apiEnv}/userTask`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      // Check if the request was successful
      if (response.ok) {
        // Parse the response data and convert it to a JS array
        const data = await response.json();
        set({ userTasks: data });
      } else {
        alert("Failed to fetch Needs. Please reload the page.");
      }
    } catch (error) {}
  },

  // Fetch tasks the user volunteered for
  fetchVolunteeredTasks: async () => {
    try {
      // Send a GET request to the backend API to fetch tasks
      const response = await fetch(`${apiEnv}/getVolunteeredTasks`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      // Check if the request was successful
      if (response.ok) {
        // Parse the response data and convert it to a JS array
        const data = await response.json();
        // Update the volunteeredTasks state
        set({ volunteeredTasks: data });
      } else {
        alert(
          "Something went wrong when trying to fetch Needs. Please reload the page."
        );
      }
    } catch (error) {}
  },

  // Add the new task to the server/store
  addTaskToServer: async (task) => {
    try {
      // Send a POST request to the backend API to add a new task
      const response = await fetch(`${apiEnv}/add`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          // Convert JS object to JSON string
          task: task.task,
          category: task.category,
          area: task.area,
          description: task.description,
        }),
      });

      // Parse the response data
      const data = await response.json();
      // Check if the request was successful
      if (response.ok) {
        // Add the new task to the tasks state
        set((state) => ({ tasks: [data, ...state.tasks] }));
      } else {
        alert("Failed to add Need. Please try again.");
      }
    } catch (error) {}
  },

  // Filter tasks by category and area
  filterTasksByCategoryAndArea: async (category, area) => {
    try {
      // Get tasks from the state
      const { originalTasks } = taskStore.getState(); // Get original tasks

      // Filter tasks based on category and area
      const filteredTasks = originalTasks.filter(
        (task) =>
          (category === "" || task.category === category) &&
          (area === "" || task.area === area)
      );
      // Set the tasks state to the filtered tasks
      set({ tasks: filteredTasks });
    } catch (error) {
      alert("Error filtering Needs. Please try again.");
      return []; // Return an empty array if there's an error
    }
  },

  // Volunteer for a task
  addMyselfToTask: async (taskId) => {
    try {
      // Send a PUT request to the backend API to add a user to a task
      const response = await fetch(`${apiEnv}/addVolunteer/${taskId}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      });

      // Check if the request was successful
      if (response.ok) {
        alert(
          "Thank you for volunteering! Your contact information will be shared with the creator of the post and you will be contacted if they choose you."
        );
      } else {
        alert("You have already volunteered for this Need!");
      }
    } catch (error) {
      alert("Error adding yourself as volunteer. Please try again.");
    }
  },

  deleteTaskById: async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this Need?"
      );

      if (!confirmed) {
        return; // If user cancels, exit the function
      }

      // Remove the task from the tasks state immediately
      set((state) => ({
        tasks: state.tasks.filter(
          (task) => task._id.toString() !== id.toString()
        ),
      }));

      set((state) => ({
        userTasks: state.userTasks.filter(
          (task) => task._id.toString() !== id.toString()
        ),
      }));

      // Send a DELETE request to the backend API to delete a task by its ID
      const response = await fetch(`${apiEnv}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });

      // Check if the request was successful
      if (!response.ok) {
        alert("Failed to delete task. Please try again.");
      }
    } catch (error) {}
  },
}));

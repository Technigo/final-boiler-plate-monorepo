import { create } from "zustand";
import { userStore } from "./userStore";

// Get the backend API URL from the environment variable
const apiEnv = import.meta.env.VITE_BACKEND_API;
console.log(apiEnv);

// Create and export a Zustand store for managing tasks
export const taskStore = create((set) => ({
  // Initialize the tasks state with an empty array
  tasks: [], // Array of tasks
  userTasks: [], // Array of tasks created by the user
  volunteeredTasks: [], // Array of tasks volunteered by the user

  // Initialize the userId state by accessing it from the userStore
  userId: userStore.userId,

  // Add the new task to the tasks state
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),

  // Set the tasks state to a new array of tasks
  setTasks: (tasks) => set({ tasks }),

  // New action to fetch all tasks
  fetchTasks: async () => {
    try {
      console.log("Before fetching tasks...");
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
        console.log("Fetched tasks:", data);

        set({ tasks: data });
      } else {
        console.error(
          "Failed to fetch tasks. Response:",
          response.status,
          errorResponse
        );
      }
    } catch (error) {
      console.error("Error during fetchTasks:", error);
    }
  },

  // Fetch tasks created by the user
  fetchUserTasks: async () => {
    try {
      console.log("Before fetching user tasks...");
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
        console.error("Failed to fetch tasks. Response:", response);
      }
    } catch (error) {
      console.error("Error during fetchTasks:", error);
    }
  },

  // Fetch tasks the user volunteered for
  fetchVolunteeredTasks: async () => {
    try {
      console.log("Before fetching volunteered tasks...");
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
        console.error("Failed to fetch tasks. Response:", response);
      }
    } catch (error) {
      console.error("Error during fetchTasks:", error);
    }
  },

  // // Add a/the new task to the server/store
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
      console.log("Authorization Header:", localStorage.getItem("accessToken"));
      // Parse the response data
      const data = await response.json();
      // Check if the request was successful
      if (response.ok) {
        // Add the new task to the tasks state
        set((state) => ({ tasks: [data, ...state.tasks] }));
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // Filter tasks by category and area
  filterTasksByCategoryAndArea: async (category, area) => {
    try {
      // Get tasks from the state
      const allTasks = await taskStore.getState().tasks;

      // Filter tasks based on category and area
      const filteredTasks = allTasks.filter(
        (task) =>
          (category === "" || task.category === category) &&
          (area === "" || task.area === area)
      );

      // Set the filtered tasks in the state
      set({ tasks: filteredTasks });
    } catch (error) {
      console.error("Error filtering tasks:", error);
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
      console.log("Authorization Header:", localStorage.getItem("accessToken"));

      // Parse the response data
      const data = await response.json();
      // Check if the request was successful
      if (response.ok) {
      } else {
        console.error("Failed to add myself to task");
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
  // deleteTaskById: async (id) => {
  //   try {
  //     // Send a DELETE request to the backend API to delete a task by its ID
  //     const response = await fetch(`${apiEnv}/delete/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: localStorage.getItem("accessToken"),
  //       },
  //     });

  //     // Check if the request was successful
  //     if (response.ok) {
  //       // Remove the task from the tasks state
  //       set((state) => ({
  //         tasks: state.tasks.filter((task) => task._id !== id),
  //       }));
  //     } else {
  //       console.error("Failed to delete task");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // },

  deleteTaskById: async (id) => {
    try {
      console.log("Deleting task:", id);
      // Remove the task from the tasks state immediately
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));

      // Send a DELETE request to the backend API to delete a task by its ID
      const response = await fetch(`${apiEnv}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      console.log("Delete request completed:", response);
      // Check if the request was successful
      if (!response.ok) {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },

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
}));

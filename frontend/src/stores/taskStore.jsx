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
        // Log the error status and response
        console.error("Failed to fetch tasks. Response:", response.status);

        // Parse and log the error response
        const errorResponse = await response.json();
        console.error("Error response:", errorResponse);
      }
    } catch (error) {
      console.error("Error during fetchTasks:", error);
    }
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
        console.error("Failed to fetch tasks. Response:", response);
      }
    } catch (error) {
      console.error("Error during fetchTasks:", error);
    }
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
        console.error("Failed to fetch tasks. Response:", response);
      }
    } catch (error) {
      console.error("Error during fetchTasks:", error);
    }
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
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error(error);
    }
  },

  // Filter tasks by category and area
  filterTasksByCategoryAndArea: async (category, area) => {
    try {
      console.log("Filtering tasks...");
      // Get tasks from the state
      const { originalTasks } = taskStore.getState(); // Get original tasks
      // const allTasks = await taskStore.getState().tasks;

      // Filter tasks based on category and area
      const filteredTasks = originalTasks.filter(
        (task) =>
          (category === "" || task.category === category) &&
          (area === "" || task.area === area)
      );
      console.log("Filtered tasks:", filteredTasks);
      // Set the filtered tasks in the state
      set({ tasks: filteredTasks });
      //return filteredTasks; // Return the filtered tasks
    } catch (error) {
      console.error("Error filtering tasks:", error);
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
          "Thank you for volunteering! Your contact information will be shared with the creater of the post and you will be contacted if they choose you."
        );
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top of page
      } else {
        alert("You have already volunteered for this Need!");
        //console.error("User already added as volunteer");
      }
    } catch (error) {
      alert("Error adding yourself as volunteer. Please try again.");
      console.error("Error adding user as volunteer:", error);
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
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },
}));
